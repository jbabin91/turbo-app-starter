import { lucia } from '@repo/auth';
import { type Context } from 'hono';

export async function getPreparedSessions(userId: string, c: Context) {
  const sessions = await lucia.getUserSessions(userId);
  const currentSessionId = lucia.readSessionCookie(
    c.req.raw.headers.get('Cookie') ?? '',
  );
  const preparedSession = sessions.map((session) => ({
    ...session,
    type: 'DESKTOP' as const,
    current: session.id === currentSessionId,
    impersonation: session.type === 'impersonation',
  }));

  return preparedSession;
}
