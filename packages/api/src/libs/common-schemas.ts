import { z } from 'zod';

export const errorSchema = z.object({
  logId: z.string().optional(),
  message: z.string(),
  method: z.string().optional(),
  path: z.string().optional(),
  severity: z.string(),
  status: z.number(),
  timestamp: z.string().optional(),
  type: z.string(),
  usr: z.string().optional(),
});
