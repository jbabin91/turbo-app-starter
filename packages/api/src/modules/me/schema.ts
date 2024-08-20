import { z } from 'zod';
import { userSchema } from '@repo/db';

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
});
