import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import type { Operation } from '@/entities/operation';
import { useUpdateOperation } from '@/entities/operation';
import { type OperationEditFormValues, OperationForm } from '@/features/operation-form';
import { handleApiError } from '@/shared/lib/errors/handleApiError';
import { Modal } from 'antd';

type Props = {
  open: boolean;
  onCancel: () => void;
  operation: Operation;
};

export const OperationEditModal = ({ open, onCancel, operation }: Props) => {
  const { t } = useAppTranslation();

  const { mutate: updateOperation } = useUpdateOperation();

  const handleSubmit = (values: OperationEditFormValues) => {
    updateOperation(
      {
        id: operation.id,
        data: values,
      },
      {
        onSuccess: () => {
          onCancel();
        },
        onError: (error) => {
          handleApiError(error);
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={t('pages.operations.form.title')}
      footer={null}
      destroyOnHidden
    >
      <OperationForm onSubmit={handleSubmit} onCancel={onCancel} operation={operation} />
    </Modal>
  );
};
