import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { Button, Typography } from 'antd';

export const LangToogle = () => {
  const { changeLanguage, currentLang } = useAppTranslation();

  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    changeLanguage(newLang);
  };

  return (
    <Button type="text" onClick={toggleLang}>
      <Typography.Text style={{ fontSize: 16 }}>
        {currentLang === 'en' ? '🇷🇺' : 'en'}
      </Typography.Text>
    </Button>
  );
};
