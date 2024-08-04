import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server: {
    BACKEND_URL: z.string().url().default('http://localhost:3000'),
    FRONTEND_URL: z.string().url().default('http://localhost:5173'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.string().default('3000'),
  },
});
