type languages = {
  value: 'en' | 'nl';
  label: 'English' | 'Nederlands';
}[];

type rolesByType = {
  systemRoles: ('USER' | 'ADMIN')[];
  entityRoles: ('MEMBER' | 'ADMIN')[];
  allRoles: ('USER' | 'MEMBER' | 'ADMIN')[];
};

export const config = {
  mode: 'development',
  name: 'Turbo App Starter',
  slug: 'turbo-app-starter',

  debug: false,
  maintenance: false,

  domain: 'jacebabin.dev',
  backendUrl: 'http://localhost:3000',
  frontendUrl: 'http://localhost:5173',

  // Languages
  defaultLanguage: 'en' as const,
  supportedLanguages: ['en', 'nl'] as const,
  languages: [
    { value: 'en', label: 'English' },
    { value: 'nl', label: 'Nederlands' },
  ] satisfies languages,

  rolesByType: {
    systemRoles: ['USER', 'ADMIN'] as const,
    entityRoles: ['MEMBER', 'ADMIN'] as const,
    allRoles: ['USER', 'MEMBER', 'ADMIN'] as const,
  } satisfies rolesByType,
};

export default config;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Config = DeepPartial<typeof config>;
