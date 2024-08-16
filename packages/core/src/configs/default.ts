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
  supportedLanguages: ['en', 'ar', 'nl'] as const,
  languages: {
    en: 'English',
    ar: 'Arabic (العربية)',
    nl: 'Nederlands',
  },

  rolesByType: {
    systemRoles: ['USER', 'ADMIN'] as const,
    entityRoles: ['MEMBER', 'ADMIN'] as const,
    allRoles: ['USER', 'MEMBER', 'ADMIN'] as const,
  },
};

export default config;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Config = DeepPartial<typeof config>;
