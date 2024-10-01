import { type Hook } from '@hono/zod-openapi';
import { ZodError } from 'zod';

import { logEvent } from '../middlewares';
import { type Env } from '../types';

const defaultHook: Hook<unknown, Env, '', unknown> = (result, c) => {
  if (!result.success && result.error instanceof ZodError) {
    logEvent(
      'Validation error',
      {
        error: result.error.issues[0]?.message ?? 'Unknown error',
        path: result.error.issues[0]?.path[0] ?? 'Unknown path',
      },
      'info',
    );

    return c.json(
      {
        success: false,
        error: result.error.issues[0]?.message,
      },
      400,
    );
  }
  return;
};

export default defaultHook;
