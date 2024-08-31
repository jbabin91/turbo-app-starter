import { errorResponses } from '../../libs/common-responses';
import { successWithDataSchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isPublicAccess } from '../../middlewares';
import { exampleSchema } from './schema';

class ExampleRoutesConfig {
  public getExample = createRouteConfig({
    method: 'get',
    path: '/',
    guard: isPublicAccess,
    tags: ['example'],
    summary: 'Example Request',
    description: 'Returns an example message',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successWithDataSchema(exampleSchema),
          },
        },
        description: 'Successfully retrive an example message',
      },
      ...errorResponses,
    },
  });
}

export default new ExampleRoutesConfig();
