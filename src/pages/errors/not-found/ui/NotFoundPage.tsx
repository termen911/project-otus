import { MainLayout } from '@/widgets/main-layout';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <MainLayout>
      <Result
        status="404"
        title="404"
        subTitle={t('pages.notFound.subTitle')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('pages.notFound.extra.backHome')}
          </Button>
        }
      />
    </MainLayout>
  );
};
