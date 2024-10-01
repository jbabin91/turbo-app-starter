import { lucia } from '@repo/auth';
import { db, passkeys, users } from '@repo/db';
import { eq } from 'drizzle-orm';

import { removeSessionCookie } from '../../libs/cookies';
import CustomHono from '../../libs/custom-hono';
import { createError, errorResponse } from '../../libs/errors';
import { logEvent } from '../../middlewares';
import { type ErrorType } from '../../types';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import { getPreparedSessions } from './helpers/get-sessions';
import meRoutesConfig from './routes';

const app = new CustomHono();

// Me (self) endpoints
const meRoutes = app
  /**
   * Get current user
   */
  .openapi(meRoutesConfig.getSelf, async (c) => {
    const user = c.get('user');

    // Check if user has a passkey
    const passkey = await db
      .select()
      .from(users)
      .where(eq(passkeys.userEmail, user.email));

    // Update last visit date
    await db
      .update(users)
      .set({ lastVisitAt: new Date() })
      .where(eq(users.id, user.id));

    return c.json(
      {
        success: true,
        data: {
          ...transformDatabaseUser(user),
          oauth: [],
          passkey: passkey.length > 0,
          sessions: await getPreparedSessions(user.id, c),
        },
      },
      200,
    );
  })
  /**
   * Update current user (self)
   */
  .openapi(meRoutesConfig.updateSelf, async (c) => {
    const user = c.get('user');

    if (!user) {
      return errorResponse(c, 404, 'not_found', 'warn', {
        user: 'self',
      });
    }

    const { email, firstName, lastName, language } = c.req.valid('json');

    const [updatedUser] = await db
      .update(users)
      .set({
        email,
        firstName,
        lastName,
        language,
        name: [firstName, lastName].filter(Boolean).join(' '),
        modifiedAt: new Date(),
        modifiedBy: user.id,
      })
      .where(eq(users.id, user.id))
      .returning();

    if (!updatedUser) {
      return errorResponse(c, 404, 'not_found', 'warn');
    }

    const passkey = await db
      .select()
      .from(passkeys)
      .where(eq(passkeys.userEmail, user.email));

    logEvent('User updated', { user: updatedUser.id });

    return c.json(
      {
        success: true,
        data: {
          ...transformDatabaseUser(updatedUser),
          oauth: [],
          passkey: passkey.length > 0,
        },
      },
      200,
    );
  })
  /**
   * Terminate a session
   */
  .openapi(meRoutesConfig.deleteSession, async (c) => {
    const { ids } = c.req.valid('query');

    const sessionIds = Array.isArray(ids) ? ids : [ids];

    const cookieHeader = c.req.raw.headers.get('Cookie');
    const currentSessionId = lucia.readSessionCookie(cookieHeader ?? '');

    const errors: ErrorType[] = [];

    await Promise.all(
      sessionIds.map(async (id) => {
        try {
          if (id === currentSessionId) {
            removeSessionCookie(c);
          }
          await lucia.invalidateSession(id);
        } catch {
          errors.push(
            createError(c, 404, 'not_found', 'warn', { session: id }),
          );
        }
      }),
    );

    return c.json({ success: true, errors }, 200);
  })
  /**
   * Delete current user (self)
   */
  .openapi(meRoutesConfig.deleteSelf, async (c) => {
    const user = c.get('user');

    // Check if user exists
    if (!user) {
      return errorResponse(c, 404, 'not_found', 'warn', { user: 'self' });
    }

    // Delete user
    await db.delete(users).where(eq(users.id, user.id));

    // Invalidate sessions
    await lucia.invalidateUserSessions(user.id);
    removeSessionCookie(c);

    logEvent('User deleted', { user: user.id });

    return c.json({ success: true }, 200);
  });

export default meRoutes;
