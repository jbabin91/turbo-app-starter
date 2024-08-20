import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { config } from '@repo/core';
import { db, sessions, type UserModel, users } from '@repo/db';
import { Lucia, type SessionCookieOptions, TimeSpan } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
const isProduction = config.mode === 'production';

const sessionCookieOptions = {
  name: 'turbo-app-starter-session',
  expires: true,
  attributes: {
    sameSite: isProduction ? 'strict' : 'lax',
    secure: isProduction,
  },
} satisfies SessionCookieOptions;

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(4, 'w'), // Set session expiration to 4 weeks
  sessionCookie: sessionCookieOptions,
  getUserAttributes({ hashedPassword, ...databaseUserAttributes }) {
    return databaseUserAttributes;
  },
  getSessionAttributes(databaseSessionAttributes) {
    return {
      type: databaseSessionAttributes.type,
      adminUserId: databaseSessionAttributes.adminUserId,
    };
  },
});

declare module 'lucia' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserModel;
    DatabaseSessionAttributes: {
      type: 'regular' | 'impersonation';
      adminUserId: string | null;
    };
  }
}
