import { Spin } from 'antd';
import React, { Suspense, useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../config/i18n';
import { useAppTranslation } from './useAppTranslation';
import { useLanguageStore } from './useLanguageStore';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const { changeLanguage } = useAppTranslation();
  const { language: storedLanguage } = useLanguageStore();

  useEffect(() => {
    const initialLang =
      storedLanguage ||
      document.documentElement.lang ||
      (i18n.options.fallbackLng as string) ||
      'ru';
    changeLanguage(initialLang);
  }, [changeLanguage, storedLanguage]);

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Spin spinning={true} />}>{children}</Suspense>
    </I18nextProvider>
  );
};
