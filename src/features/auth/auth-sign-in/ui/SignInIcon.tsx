import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

export const SignInIcon = () => {
  const navigate = useNavigate();
  const { t } = useAppTranslation('features.auth.auth-sign-in');

  return (
    <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate('/auth/signin')}>
      {t('signin')}
    </Button>
  );
};
