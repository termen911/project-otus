import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from './useLanguageStore';

type Language = 'ru' | 'en';

export const useAppTranslation = () => {
  const { t, i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();

  const changeLanguage = useCallback(
    (lng: string) => {
      const lang = ['ru', 'en'].includes(lng) ? (lng as Language) : 'ru';

      i18n.changeLanguage(lang);
      setLanguage(lang);
      document.documentElement.lang = lang;
    },
    [i18n, setLanguage]
  );
  return { t, changeLanguage, currentLang: i18n.language };
};
