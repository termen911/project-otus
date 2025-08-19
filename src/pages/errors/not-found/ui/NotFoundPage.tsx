import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { MainLayout } from '@/widgets/main-layout';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useAppTranslation('pages.errors.not-found');

  return (
    <MainLayout>
      <Result
        status="404"
        title="404"
        subTitle={t('subTitle')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('extra.backHome')}
          </Button>
        }
      />
    </MainLayout>
  );
};
