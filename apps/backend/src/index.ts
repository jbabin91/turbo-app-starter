import { serve } from '@hono/node-server';
import routes from '@repo/api';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

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

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  },
);
