import { OpenAPIHono } from '@hono/zod-openapi';
import { type Schema } from 'hono';

import { type Env } from '../types';

export default class CustomHono<
  E extends Env = Env,
  S extends Schema = {},
  BasePath extends string = '/',
> extends OpenAPIHono<E, S, BasePath> {}
