import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from '../types';
import { Schema } from 'hono';

export default class CustomHono<
  E extends Env = Env,
  S extends Schema = {},
  BasePath extends string = '/',
> extends OpenAPIHono<E, S, BasePath> {}
