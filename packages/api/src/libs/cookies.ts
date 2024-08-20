import { lucia } from '@repo/auth';
import { config } from '@repo/core';
import { db, users, type UserModel } from '@repo/db';
import { type Context } from 'hono';
import { setCookie as baseSetCookie } from 'hono/cookie';

import { logEvent } from '../middlewares';
import { eq } from 'drizzle-orm';

const isProduction = config.mode === 'production';

export function setCookie(c: Context, name: string, value: string) {
  return baseSetCookie(c, name, value, {
    secure: isProduction, // set `Secure` flag in HTTPS
    path: '/',
    domain: isProduction ? config.domain : undefined,
    httpOnly: true,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 60 * 10, // 10 minutes
  });
}

export async function setSessionCookie(
  c: Context,
  userId: UserModel['id'],
  strategy: string,
) {
  const session = await lucia.createSession(userId, {
    type: 'regular',
    adminUserId: null,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);

  const lastSignInAt = new Date();
  await db.update(users).set({ lastSignInAt }).where(eq(users.id, userId));

  logEvent('User signed in', { strategy, user: userId });

  c.header('Set-Cookie', sessionCookie.serialize());
}

export async function setImpersonationSessionCookie(
  c: Context,
  userId: UserModel['id'],
  adminUserId: UserModel['id'],
) {
  const session = await lucia.createSession(userId, {
    type: 'impersonation',
    adminUserId,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);

  logEvent('Admin impersonation signed in', {
    user: userId,
    strategy: 'impersonation',
  });

  c.header('Set-Cookie', sessionCookie.serialize());
}

export function removeSessionCookie(c: Context) {
  const sessionCookie = lucia.createBlankSessionCookie();
  c.header('Set-Cookie', sessionCookie.serialize());
}
