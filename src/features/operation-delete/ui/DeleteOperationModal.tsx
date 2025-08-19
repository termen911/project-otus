import { useDeleteOperation } from '@/entities/operation';
import { handleApiError } from '@/shared/lib/errors/handleApiError';
import { Modal, Typography } from 'antd';

interface DeleteOperationModalProps {
  operationId: string;
  open: boolean;
  onCancel: () => void;
}

export const DeleteOperationModal = ({
  operationId,
  open,
  onCancel,
}: DeleteOperationModalProps) => {
  const { mutate: deleteOperation, isPending } = useDeleteOperation();

  const handleOk = () => {
    deleteOperation(operationId, {
      onSuccess: () => {
        onCancel();
      },
      onError: (error) => {
        console.error(error);
        handleApiError(error);
      },
    });
  };

  return (
    <Modal
      open={open}
      title="Удалить операцию"
      okText="Удалить"
      okType="danger"
      cancelText="Отмена"
      confirmLoading={isPending}
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{
        danger: true,
      }}
      destroyOnHidden={true}
      centered={true}
    >
      <Typography.Text>
        Вы уверены, что хотите удалить эту операцию? Это действие нельзя отменить.
      </Typography.Text>
    </Modal>
  );
};
