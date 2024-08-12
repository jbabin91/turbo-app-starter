import { type UserModel } from '@repo/db';
import {
  type ClientErrorStatusCode,
  type ServerErrorStatusCode,
} from 'hono/utils/http-status';
import { type z } from 'zod';

import {
  type errorSchema,
  type failWithErrorSchema,
} from '../libs/common-schemas';

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type ErrorResponse = z.infer<typeof failWithErrorSchema>;

export type HttpErrorStatus = ClientErrorStatusCode | ServerErrorStatusCode;

export type Severity = 'debug' | 'info' | 'log' | 'warn' | 'error';

export type EventData = Readonly<
  Record<string, number | string | boolean | null>
>;

export type ErrorType = z.infer<typeof errorSchema> & {
  eventData?: EventData;
  name?: Error['name'];
};

export type Env = {
  Variables: {
    user: UserModel;
  };
};
