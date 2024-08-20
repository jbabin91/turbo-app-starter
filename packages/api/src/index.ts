import { docs } from './libs/docs';
import { middlewares } from './middlewares';
import authRoutes from './modules/auth';
import exampleRoutes from './modules/example';
import CustomHono from './libs/custom-hono';
import meRoutes from './modules/me';

const app = new CustomHono();

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
