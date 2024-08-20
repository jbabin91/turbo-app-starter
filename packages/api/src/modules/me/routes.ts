import {
  successWithDataSchema,
  successWithErrorsSchema,
  successWithoutDataSchema,
} from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isAuthenticated } from '../../middlewares';
import { errorResponses } from '../../libs/common-responses';
import { meUserSchema } from './schema';
import { updateUserSchema, userSchema } from '@repo/db';

class MeRoutesConfig {
  public getSelf = createRouteConfig({
    method: 'get',
    path: '/',
    guard: isAuthenticated,
    tags: ['me'],
    summary: 'Get self',
    description:
      'Get the current user (self). It includes a `counts` object and a list of `sessions`.',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successWithDataSchema(meUserSchema),
          },
        },
        description: 'Current User',
      },
      ...errorResponses,
    },
  });

  public updateSelf = createRouteConfig({
    method: 'put',
    path: '/',
    guard: isAuthenticated,
    tags: ['me'],
    summary: 'Update self',
    description: 'Update the current user (self).',
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateUserSchema.omit({
              role: true,
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'User',
        content: {
          'application/json': {
            schema: successWithDataSchema(userSchema),
          },
        },
      },
      ...errorResponses,
    },
  });

  public deleteSelf = createRouteConfig({
    method: 'delete',
    path: '/',
    guard: isAuthenticated,
    tags: ['me'],
    summary: 'Delete self',
    description: 'Delete the current user (self).',
    responses: {
      200: {
        description: 'User deleted',
        content: {
          'application/json': {
            schema: successWithoutDataSchema,
          },
        },
      },
      ...errorResponses,
    },
  });

  public deleteSession = createRouteConfig({
    method: 'delete',
    path: '/sessions',
    guard: isAuthenticated,
    tags: ['me'],
    summary: 'Terminate sessions',
    description:
      'Terminate all sessions of the current user, except for the current session.',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: successWithErrorsSchema(),
          },
        },
      },
      ...errorResponses,
    },
  });
}

export default new MeRoutesConfig();
