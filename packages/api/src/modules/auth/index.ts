import { OpenAPIHono } from '@hono/zod-openapi';
import { config } from '@repo/core';
import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';
import { LegacyScrypt } from 'lucia';

import { setSessionCookie } from '../../libs/cookies';
import { errorResponse } from '../../libs/errors';
import { type Env } from '../../types';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import authRoutesConfig from './routes';

const app = new OpenAPIHono<Env>();

// Auth endpoints
const authRoutes = app.openapi(authRoutesConfig.signUp, async (c) => {
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
      data: transformDatabaseUser(user!),
      success: true,
    },
    200,
  );
});

export default authRoutes;
