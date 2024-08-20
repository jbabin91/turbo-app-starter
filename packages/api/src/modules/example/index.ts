import exampleRoutesConfig from './routes';
import CustomHono from '../../libs/custom-hono';

const app = new CustomHono();

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
