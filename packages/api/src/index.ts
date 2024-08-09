import { OpenAPIHono } from '@hono/zod-openapi';

import { docs } from './libs/docs';
import exampleRoutes from './modules/example';

const app = new OpenAPIHono();

docs(app);

const routes = app.route('/example', exampleRoutes);

export type AppTypes = typeof routes;

export default routes;

// Types
export type { ErrorType, EventData } from './types';
