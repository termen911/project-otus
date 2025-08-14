import { AppHeader } from '@/widgets/header';
import { Layout } from 'antd';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <AppHeader />
      </Layout.Header>

      <Layout.Content style={{ padding: '16px' }}>{children}</Layout.Content>
    </Layout>
  );
};
