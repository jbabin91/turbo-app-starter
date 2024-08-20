import { type OpenAPIHono } from '@hono/zod-openapi';
import { config } from '@repo/core';
import { apiReference } from '@scalar/hono-api-reference';

import { type Env } from '../types';

const isProduction = config.mode === 'production';

const openAPITags = [
  {
    description: 'Example endpoints',
    name: 'example',
  },
  {
    description:
      'Authentication endpoints. If you do not have a cookie, you need to sign in or sign up first.',
    name: 'auth',
  },
  {
    description: '',
    name: 'me',
  },
];

export const docs = (app: OpenAPIHono<Env>) => {
  const registry = app.openAPIRegistry;

  registry.registerComponent('securitySchemes', 'cookieAuth', {
    description:
      "Authentication cookie. If you don't have it, you need to sign in or sign up first.",
    in: 'cookie',
    name: 'tas-session-v1',
    type: 'apiKey',
  });

  app.doc31('/openapi.json', {
    info: {
      description: 'API documentation',
      title: 'API',
      version: 'v1',
    },
    openapi: '3.1.0',
    security: [{ cookieAuth: [] }],
    servers: isProduction ? [{ url: config.backendUrl }] : undefined,
    tags: openAPITags,
  });

  app.get(
    '/docs',
    apiReference({
      spec: {
        url: 'openapi.json',
      },
    }),
  );
};
