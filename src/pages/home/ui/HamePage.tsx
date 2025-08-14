import { Card, Flex, Typography } from 'antd';
import { MainLayout } from '@/widgets/main-layout';

export const HomePage = () => {
  return (
    <MainLayout>
      <Card title="Home" variant="borderless" style={{ width: '100%' }}>
        <Flex vertical style={{ width: '100%' }}>
          <Typography.Text>Home</Typography.Text>
        </Flex>
      </Card>
    </MainLayout>
  );
};
