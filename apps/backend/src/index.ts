import routes from '@repo/api';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

import { env } from './configs';

const PORT = env.PORT;

const app = new Hono();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  }),
);

app.use(
  csrf({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/', routes);

console.log(`OpenAPI Specs are running on http://localhost:${PORT}/docs`);

console.log(env.NODE_ENV);

export default {
  fetch: app.fetch,
  port: PORT,
};
