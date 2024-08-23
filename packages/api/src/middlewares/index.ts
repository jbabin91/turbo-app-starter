import { config } from '@repo/core';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

import { logEvent, logger } from './logger';
import CustomHono from '../libs/custom-hono';

const app = new CustomHono();

// Secure headers
app.use(secureHeaders());

// Logger
app.use('*', logger(logEvent as unknown as Parameters<typeof logger>[0]));

// Health check
app.get('/healthcheck', (c) => {
  return c.text('OK');
});

// CORS
app.use(
  cors({
    allowHeaders: [],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

// CSRF
app.use(csrf({ origin: [config.frontendUrl, config.backendUrl] }));

export default app;

// Guard Middleware
export { isAuthenticated, isPublicAccess, isSystemAdmin } from './guard';

// Logger Middleware
export { logEvent, logger } from './logger';

// Rate Limiter Middleware
export { authRateLimiter, limiter, signInRateLimiter } from './rate-limiter';
