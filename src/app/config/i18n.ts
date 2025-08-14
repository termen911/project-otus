import en from '@/shared/locales/en';
import ru from '@/shared/locales/ru';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Используем стандартную nested структуру i18next
export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
} as const;

export const i18nConfig = {
  lng: 'ru',
  fallbackLng: 'ru',
  supportedLngs: ['en', 'ru'],

  // Используем стандартную структуру с translation namespace
  ns: ['translation'],
  defaultNS: 'translation',
  resources,

  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
  },

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
};

// Инициализируем i18n
i18n
  .use(initReactI18next)
  .init(i18nConfig)
  .catch((error) => {
    console.error('i18n initialization failed:', error);
  });

export default i18n;
