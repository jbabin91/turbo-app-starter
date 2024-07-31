import { Hono } from 'hono';

import exampleRoutes from './modules/example';

const app = new Hono();

const routes = app.route('/example', exampleRoutes);

export type AppTypes = typeof routes;

export default routes;
