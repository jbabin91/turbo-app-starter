import { type createRoute } from '@hono/zod-openapi';

import { failWithErrorSchema } from './common-schemas';

type Responses = Parameters<typeof createRoute>[0]['responses'];

export const errorResponses = {
  400: {
    content: {
      'application/json': {
        schema: failWithErrorSchema,
      },
    },
    description: 'Bad request: problem processing request.',
  },
  401: {
    content: {
      'application/json': {
        schema: failWithErrorSchema,
      },
    },
    description: 'Unauthorized: authentication required.',
  },
  403: {
    content: {
      'application/json': {
        schema: failWithErrorSchema,
      },
    },
    description: 'Forbidden: insufficient permissions.',
  },
  404: {
    content: {
      'application/json': {
        schema: failWithErrorSchema,
      },
    },
    description: 'Not found: resource does not exist.',
  },
  500: {
    content: {
      'application/json': {
        schema: failWithErrorSchema,
      },
    },
    description: 'Server error: something went wrong.',
  },
} satisfies Responses;
