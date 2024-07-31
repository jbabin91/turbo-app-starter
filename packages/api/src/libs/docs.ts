import { type OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';

const openAPITags = [
  {
    description: 'Example endpoints',
    name: 'example',
  },
];

export const docs = (app: OpenAPIHono) => {
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
    servers: undefined,
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
