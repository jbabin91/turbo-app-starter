import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { config } from '@repo/core';
import { db, sessions, type UserModel, users } from '@repo/db';
import { Lucia, type SessionCookieOptions, TimeSpan } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
const isProduction = config.mode === 'production';

const sessionCookieOptions = {
  attributes: {
    sameSite: isProduction ? 'strict' : 'lax',
    secure: isProduction,
  },
  expires: true,
  name: 'turbo-app-starter-session',
} satisfies SessionCookieOptions;

export const lucia = new Lucia(adapter, {
  getSessionAttributes(databaseSessionAttributes) {
    return {
      adminUserId: databaseSessionAttributes.adminUserId,
      type: databaseSessionAttributes.type,
    };
  },

  getUserAttributes({
    hashedPassword: _hashedPassword,
    ...databaseUserAttributes
  }) {
    return databaseUserAttributes;
  },
  // Set session expiration to 4 weeks
  sessionCookie: sessionCookieOptions,
  sessionExpiresIn: new TimeSpan(4, 'w'),
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
