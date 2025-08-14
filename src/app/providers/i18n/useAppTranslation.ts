import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
    },
    [i18n]
  );
  return { t, changeLanguage, currentLang: i18n.language };
};
