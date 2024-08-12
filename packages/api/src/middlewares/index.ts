import { OpenAPIHono } from '@hono/zod-openapi';
import { config } from '@repo/core';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

import { type Env } from '../types';
import { logEvent, logger } from './logger';

const middlewares = new OpenAPIHono<Env>();

// Secure headers
middlewares.use(secureHeaders());

// CORS
middlewares.use(
  cors({
    allowHeaders: [],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

// CSRF
middlewares.use(
  csrf({
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

// Logger
middlewares.use(logger(logEvent as unknown as Parameters<typeof logger>[0]));

// Health check
middlewares.get('/healthcheck', (c) => {
  return c.text('OK');
});

export { middlewares };

// Guard Middleware
export { isAuthenticated, isPublicAccess, isSystemAdmin } from './guard';

// Logger Middleware
export { logEvent, logger } from './logger';

// Rate Limiter Middleware
export { authRateLimiter, limiter, signInRateLimiter } from './rate-limiter';
