import { OpenAPIHono } from '@hono/zod-openapi';

import { docs } from './libs/docs';
import { middlewares } from './middlewares';
import authRoutes from './modules/auth';
import exampleRoutes from './modules/example';
import { type Env } from './types';

const app = new OpenAPIHono<Env>();

app.route('', middlewares);

docs(app);

const routes = app.route('/auth', authRoutes).route('/example', exampleRoutes);

export type AppTypes = typeof routes;

export default routes;

// Types
export type { ErrorType, EventData } from './types';
