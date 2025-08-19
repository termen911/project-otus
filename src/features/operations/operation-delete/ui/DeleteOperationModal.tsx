import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
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
  const { t } = useAppTranslation('features.operations.operation-delete');
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
      title={t('title')}
      okText={t('confirm')}
      okType="danger"
      cancelText={t('cancel')}
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
        {t('message')}
      </Typography.Text>
    </Modal>
  );
};
