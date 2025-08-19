import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { useLogout } from '@/features/auth/auth-by-email/model/useLogout';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, type MenuProps } from 'antd';
import { useNavigate } from 'react-router';

export const UserMenu = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { t } = useAppTranslation('features.user-menu');
  const items: MenuProps['items'] = [
    {
      key: '/profile',
      label: <span>{t('profile')}</span>,
      icon: <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      label: <span>{t('logout')}</span>,
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </Dropdown>
  );
};
