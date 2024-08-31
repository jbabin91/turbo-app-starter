import { config } from '@repo/core';
import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';
import { LegacyScrypt } from 'lucia';

import { removeSessionCookie, setSessionCookie } from '../../libs/cookies';
import { errorResponse } from '../../libs/errors';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import authRoutesConfig from './routes';
import { lucia } from '@repo/auth';
import { logEvent } from '../../middlewares';
import CustomHono from '../../libs/custom-hono';

const app = new CustomHono();

// Auth endpoints
const authRoutes = app
  .openapi(authRoutesConfig.signUp, async (c) => {
    const data = c.req.valid('json');

    // Hash Password
    const hashedPassword = await new LegacyScrypt().hash(data.password);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email.toLowerCase()),
    });

    if (existingUser) {
      return errorResponse(c, 409, 'email_exists', 'warn');
    }

    // Create User
    const [user] = await db
      .insert(users)
      .values({
        email: data.email.toLowerCase(),
        firstName: data.firstName,
        hashedPassword,
        language: config.defaultLanguage,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
      })
      .returning();

    if (user) await setSessionCookie(c, user.id, 'password');

    return c.json(
      {
        success: true,
        data: transformDatabaseUser(user!),
      },
      200,
    );
  })
  /**
   * Sign in with email and password
   */
  .openapi(authRoutesConfig.signIn, async (c) => {
    const { email, password } = c.req.valid('json');

    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    // If the user is not found
    if (!user) {
      return errorResponse(c, 404, 'not_found', 'warn');
    }

    // Verify password
    const validPassword = await new LegacyScrypt().verify(
      user.hashedPassword,
      password,
    );

    // If the password is invalid
    if (!validPassword) {
      return errorResponse(c, 400, 'invalid_password', 'warn');
    }

    await setSessionCookie(c, user.id, 'password');

    return c.json(
      {
        success: true,
        data: transformDatabaseUser(user),
      },
      200,
    );
  })
  /**
   * Sign out user
   */
  .openapi(authRoutesConfig.signOut, async (c) => {
    const cookieHeader = c.req.raw.headers.get('Cookie');
    const sessionId = lucia.readSessionCookie(cookieHeader ?? '');

    if (!sessionId) {
      removeSessionCookie(c);
      return errorResponse(c, 401, 'unauthorized', 'warn');
    }

    const { session } = await lucia.validateSession(sessionId);

    if (session) {
      await lucia.invalidateSession(session.id);
    }

    removeSessionCookie(c);
    logEvent('User signed out', { user: session?.userId ?? 'na' });

    return c.json({ success: true }, 200);
  });

export default authRoutes;
