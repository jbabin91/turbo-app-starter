import { config } from '@repo/core';
import arCommon from '@repo/locales/ar/common.json';
import enCommon from '@repo/locales/en/common.json';
import nlCommon from '@repo/locales/nl/common.json';
import i18n, { type InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { datetime, number } from '@/utils/formatters';

// Set up i18n with hybrid preload and lazy loading strategy
const initOptions: InitOptions = {
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  debug: true,
  defaultNS: 'common',
  fallbackLng: config.defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
  load: 'languageOnly',
  ns: ['common'],
  partialBundledLanguages: true,
  react: {
    useSuspense: false,
  },
  resources: {
    ar: { common: arCommon },
    en: { common: enCommon },
    'en-US': { common: enCommon },
    nl: { common: nlCommon },
  },
  supportedLngs: config.supportedLanguages,
};

// Init i18n instance
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(initOptions);

i18n.services.formatter?.add('number', number);
i18n.services.formatter?.add('datetime', datetime);

export { default } from 'i18next';
