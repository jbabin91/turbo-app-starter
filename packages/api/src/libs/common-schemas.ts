import { z } from 'zod';

export const cookieSchema = z.string();

export const idSchema = z.string();

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

export const failWithErrorSchema = z.object({
  error: errorSchema,
  success: z.boolean().default(false),
});

export const successWithoutDataSchema = z.object({
  success: z.boolean(),
});

export const successWithDataSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({ data: schema, success: z.boolean() });

export const successWithErrorsSchema = () =>
  z.object({
    errors: z.array(errorSchema),
    success: z.boolean(),
  });

export const idsQuerySchema = z.object({
  ids: z.union([z.string(), z.array(z.string())]),
});
