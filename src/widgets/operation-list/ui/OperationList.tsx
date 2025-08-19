import { Flex } from 'antd';
import { OperationInfiniteList } from '@/features/operations/operation-list';
import { OperationCreateButton } from '@/features/operations/operation-create';

export const OperationList = () => {
  return (
    <Flex vertical gap={16}>
      <Flex justify="flex-end">
        <OperationCreateButton />
      </Flex>
      <OperationInfiniteList />
    </Flex>
  );
};
