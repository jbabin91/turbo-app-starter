import { userSchema } from '@repo/db';
import { z } from 'zod';

export const signUpInfo = z.object({
  oauth: z.array(z.enum(['github', 'google', 'microsoft'])),
  passkey: z.boolean(),
});

export const meUserSchema = userSchema.extend({
  sessions: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['MOBILE', 'DESKTOP']),
      current: z.boolean(),
      expiresAt: z.string(),
      impersonation: z.boolean(),
    }),
  ),
  ...signUpInfo.shape,
});
