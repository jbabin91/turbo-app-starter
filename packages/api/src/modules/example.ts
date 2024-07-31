import { Hono } from 'hono';

const app = new Hono();

const exampleRoutes = app.get('/', (c) => {
  return c.json({ message: 'Hello World!' });
});

export default exampleRoutes;
