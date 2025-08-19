import { MainLayout } from '@/widgets/main-layout';
import { OperationList } from '@/widgets/operation-list';
import { Flex } from 'antd';

export const OperationsPage = () => {
  return (
    <MainLayout>
      <Flex vertical>
        <OperationList />
      </Flex>
    </MainLayout>
  );
};
