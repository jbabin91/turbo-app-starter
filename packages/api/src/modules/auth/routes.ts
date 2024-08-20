import { userSchema } from '@repo/db';
import { z } from 'zod';

import { errorResponses } from '../../libs/common-responses';
import {
  cookieSchema,
  successWithDataSchema,
  successWithoutDataSchema,
} from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { authRateLimiter, isPublicAccess } from '../../middlewares';
import { signInSchema, signUpSchema } from './schema';

class AuthRoutesConfig {
  public signUp = createRouteConfig({
    method: 'post',
    path: '/sign-up',
    guard: isPublicAccess,
    tags: ['auth'],
    summary: 'Sign up with password',
    description: 'Sign up with email and password',
    middleware: [authRateLimiter],
    security: [],
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
        description: 'User signed up',
        headers: z.object({
          'Set-Cookie': cookieSchema,
        }),
        content: {
          'application/json': {
            schema: successWithoutDataSchema,
          },
        },
      },
      ...errorResponses,
    },
  });

  public signIn = createRouteConfig({
    method: 'post',
    path: '/sign-in',
    guard: isPublicAccess,
    middleware: [authRateLimiter],
    tags: ['auth'],
    summary: 'Sign in with email and password',
    description: 'Sign in with email and password',
    security: [],
    request: {
      body: {
        content: {
          'application/json': {
            schema: signInSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'User signed in',
        headers: z.object({
          'Set-Cookie': cookieSchema,
        }),
        content: {
          'application/json': {
            schema: successWithDataSchema(userSchema),
          },
        },
      },
      ...errorResponses,
    },
  });

  public signOut = createRouteConfig({
    method: 'post',
    path: '/sign-out',
    guard: isPublicAccess,
    middleware: [authRateLimiter],
    tags: ['auth'],
    summary: 'Sign out',
    description: 'Sign out yourself and clear session.',
    security: [],
    responses: {
      200: {
        description: 'User signed out',
        content: {
          'application/json': {
            schema: successWithoutDataSchema,
          },
        },
      },
      ...errorResponses,
    },
  });
}

export default new AuthRoutesConfig();
