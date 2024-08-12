import { userSchema } from '@repo/db';
import { z } from 'zod';

import { errorResponses } from '../../libs/common-responses';
import { cookieSchema, successWithDataSchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { authRateLimiter, isPublicAccess } from '../../middlewares';
import { signUpSchema } from './schema';

class AuthRoutesConfig {
  public signUp = createRouteConfig({
    description: 'Sign up with email and password',
    guard: isPublicAccess,
    method: 'post',
    middleware: [authRateLimiter],
    path: '/sign-up',
    request: {
      body: {
        content: {
          'application/json': {
            schema: signUpSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successWithDataSchema(userSchema),
          },
        },
        description: 'User signed up',
        headers: z.object({
          'Set-Cookie': cookieSchema,
        }),
      },
      ...errorResponses,
    },
    security: [],
    summary: 'Sign up with password',
    tags: ['auth'],
  });
}

export default new AuthRoutesConfig();
