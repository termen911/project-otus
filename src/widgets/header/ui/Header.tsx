import { useTheme } from '@/app/providers/theme/useTheme';
import { Logo } from '@/shared/ui/logo';
import { LangToogle } from '@/features/lang-toggle';
import { ThemeToggle } from '@/features/theme-toggle';
import { AuthStatusIndicator } from '@/widgets/header/ui/AuthStatusIndicator';
import { Layout, Space } from 'antd';

const { Header: AntHeader } = Layout;

export const AppHeader = () => {
  const { theme } = useTheme();
  return (
    <AntHeader
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: theme === 'dark' ? '#141414' : '#fff',
      }}
    >
      <Logo />
      <Space align="center" size="middle">
        <LangToogle />
        <ThemeToggle />
        <AuthStatusIndicator />
      </Space>
    </AntHeader>
  );
};
