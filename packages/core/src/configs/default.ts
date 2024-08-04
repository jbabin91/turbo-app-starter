export const config = {
  mode: 'development',
  name: 'Turbo App Starter',
  slug: 'turbo-app-starter',

  debug: false,
  maintenance: false,

  backendUrl: 'http://localhost:3000',
  frontendUrl: 'http://localhost:5173',
};

export default config;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Config = DeepPartial<typeof config>;
