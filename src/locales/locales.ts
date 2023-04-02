import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { translationsEN } from './en';
import { translationsES } from './es';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: true,
    },
    lng: navigator?.language,
    ns: [],
    react: {
      transKeepBasicHtmlNodesFor: [],
      useSuspense: false,
    },
    resources: {
      en: translationsEN,
      es: translationsES,
    },
  });

export { i18n };
