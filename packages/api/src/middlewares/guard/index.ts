import { type MiddlewareHandler } from 'hono';

export const isPublicAccess: MiddlewareHandler = async (_, next) => {
  return await next();
};
