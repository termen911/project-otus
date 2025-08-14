import { RegisterForm } from '@/features/auth-by-email';
import { MainLayout } from '@/widgets/main-layout';
import { Card, Flex } from 'antd';

export const SignupPage = () => {
  return (
    <MainLayout>
      <Flex justify="center" align="center" style={{ height: '50vh' }}>
        <Card style={{ width: '30vw' }}>
          <RegisterForm />
        </Card>
      </Flex>
    </MainLayout>
  );
};
