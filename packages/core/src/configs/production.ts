import { type Config } from './default';

export default {
  mode: 'production',

  maintenance: false,

  backendUrl: 'http://app.jacebabin.com/api',
  frontendUrl: 'http://app.jacebabin.com',
} satisfies Config;
