import routes from '@repo/api';
import { config } from '@repo/core';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

const PORT = process.env.PORT ?? 3000;

const app = new Hono();

app.use(
  cors({
    credentials: true,
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

app.use(
  csrf({
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/', routes);

export default {
  fetch: app.fetch,
  port: PORT,
};
