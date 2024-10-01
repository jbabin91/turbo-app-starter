import CustomHono from '../../libs/custom-hono';
import exampleRoutesConfig from './routes';

const app = new CustomHono();

// Example endpoints
const exampleRoutes = app.openapi(exampleRoutesConfig.getExample, (c) => {
  return c.json(
    {
      success: true,
      data: {
        message: 'Hello World!',
      },
    },
    200,
  );
});

export default exampleRoutes;
