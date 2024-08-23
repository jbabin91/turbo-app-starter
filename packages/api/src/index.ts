import { docs } from './libs/docs';
import middlewares from './middlewares';
import authRoutes from './modules/auth';
import exampleRoutes from './modules/example';
import CustomHono from './libs/custom-hono';
import meRoutes from './modules/me';
import defaultHook from './libs/default-hook';
import { errorResponse } from './libs/errors';

const app = new CustomHono({
  defaultHook,
});

// Not found handler
app.notFound((c) => {
  console.log('Not found:', c.req.path);
  return errorResponse(c, 404, 'route_not_found', 'warn', { path: c.req.path });
});

// Error handler
app.onError((err, c) => {
  return errorResponse(c, 500, 'server_error', 'error', {}, err);
});

app.route('', middlewares);

docs(app);

const routes = app
  .route('/auth', authRoutes)
  .route('/example', exampleRoutes)
  .route('/me', meRoutes);

export type AppTypes = typeof routes;

export default routes;

// Types
export type { ErrorType, EventData } from './types';
