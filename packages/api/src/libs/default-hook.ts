import { Hook } from '@hono/zod-openapi';
import { Env } from '../types';
import { ZodError } from 'zod';
import { logEvent } from '../middlewares';

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
