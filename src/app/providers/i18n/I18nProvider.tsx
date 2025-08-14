import { Spin } from 'antd';
import React, { Suspense, useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../config/i18n';
import { useAppTranslation } from './useAppTranslation';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const { changeLanguage } = useAppTranslation();

  useEffect(() => {
    changeLanguage(document.documentElement.lang || 'ru');
  }, [changeLanguage]);

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Spin spinning={true} />}>{children}</Suspense>
    </I18nextProvider>
  );
};
