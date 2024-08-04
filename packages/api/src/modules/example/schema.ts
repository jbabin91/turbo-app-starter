import { z } from 'zod';

export const exampleSchema = z.object({
  message: z.string(),
});
