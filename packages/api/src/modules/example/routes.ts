import { errorResponses } from '../../libs/common-responses';
import { successWithDataSchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isPublicAccess } from '../../middlewares';
import { exampleSchema } from './schema';

class ExampleRoutesConfig {
  public getExample = createRouteConfig({
    description: 'Returns an example message',
    guard: isPublicAccess,
    method: 'get',
    path: '/',
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
    summary: 'Example Request',
    tags: ['example'],
  });
}

export default new ExampleRoutesConfig();
