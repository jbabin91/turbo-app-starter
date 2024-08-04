import { OpenAPIHono } from '@hono/zod-openapi';

import exampleRoutesConfig from './routes';

const app = new OpenAPIHono();

// Example endpoints
const exampleRoutes = app.openapi(exampleRoutesConfig.getExample, (c) => {
  return c.json(
    {
      data: {
        message: 'Hello World!',
      },
      success: true,
    },
    200,
  );
});

export default exampleRoutes;
