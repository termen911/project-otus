import { LoginForm } from '@/features/auth/auth-by-email';
import { MainLayout } from '@/widgets/main-layout';
import { Card, Flex } from 'antd';

export const SignInPage = () => {
  return (
    <MainLayout>
      <Flex justify="center" align="center" style={{ height: '50vh' }}>
        <Card style={{ width: '30vw' }}>
          <LoginForm />
        </Card>
      </Flex>
    </MainLayout>
  );
};
