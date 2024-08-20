import meRoutesConfig from './routes';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import { getPreparedSessions } from './helpers/get-sessions';
import CustomHono from '../../libs/custom-hono';

const app = new CustomHono();

// Me (self) endpoints
const meRoutes = app
  /**
   * Get current user
   */
  .openapi(meRoutesConfig.getSelf, async (c) => {
    const user = c.get('user');

    return c.json(
      {
        success: true,
        data: {
          ...transformDatabaseUser(user),
          sessions: await getPreparedSessions(user.id, c),
        },
      },
      200,
    );
  });

export default meRoutes;
