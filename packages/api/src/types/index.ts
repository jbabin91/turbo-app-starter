import { type z } from 'zod';

import { type errorSchema } from '../libs/common-schemas';

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type EventData = Readonly<
  Record<string, number | string | boolean | null>
>;

export type ErrorType = z.infer<typeof errorSchema> & {
  eventData?: EventData;
  name?: Error['name'];
};
