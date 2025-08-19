import { Card, Divider, Flex, Typography } from 'antd';
import React from 'react';
import { type Operation } from '../model';
import { OperationExtraMenu } from './OperationExtraMenu';

const { Text } = Typography;

type OperationCardProps = {
  operation: Operation;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const OperationCard: React.FC<OperationCardProps> = ({ operation, onEdit, onDelete }) => {
  return (
    <Card
      hoverable
      style={{ marginBottom: 16, height: '100%' }}
      title={operation.name}
      extra={<OperationExtraMenu onEdit={onEdit} onDelete={onDelete} />}
    >
      <Flex vertical gap={8}>
        <Flex>
          <Typography.Text type="secondary">{operation.category.name}</Typography.Text>
        </Flex>
        <Flex>
          <Text strong>{operation.amount} ₽</Text>
          <Divider type="vertical" />
          <Text type={operation.type === 'Cost' ? 'danger' : 'success'}>
            {operation.type === 'Cost' ? 'Расход' : 'Доход'}
          </Text>
        </Flex>
        <p>{operation.desc}</p>
        <Text type="secondary">Дата: {new Date(operation.createdAt).toLocaleDateString()}</Text>
      </Flex>
    </Card>
  );
};
