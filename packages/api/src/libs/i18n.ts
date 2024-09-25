import { config } from '@repo/core';
import arBackend from '@repo/locales/ar/backend.json';
import arCommon from '@repo/locales/ar/common.json';
import enBackend from '@repo/locales/en/backend.json';
import enCommon from '@repo/locales/en/common.json';
import nlBackend from '@repo/locales/nl/backend.json';
import nlCommon from '@repo/locales/nl/common.json';
import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

// Set up i18n
const initOptions: InitOptions = {
  debug: config.debug,
  defaultNS: 'backend',
  fallbackLng: config.defaultLanguage,
  load: 'languageOnly',
  ns: ['backend'],
  resources: {
    ar: { backend: arBackend, common: arCommon },
    en: { backend: enBackend, common: enCommon },
    'en-US': { backend: enBackend, common: enCommon },
    nl: { backend: nlBackend, common: nlCommon },
  },
  supportedLngs: config.supportedLanguages,
} satisfies InitOptions;

// Init i18n instance
i18n.use(initReactI18next).init(initOptions);

export { default as i18n } from 'i18next';
