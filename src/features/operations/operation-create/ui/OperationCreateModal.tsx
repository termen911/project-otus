import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { useCreateOperation } from '@/entities/operation';
import { OperationForm, type OperationEditFormValues } from '@/features/operations/operation-form';
import { handleApiError } from '@/shared/lib/errors/handleApiError';
import { Modal } from 'antd';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OperationCreateModal = ({ isOpen, onClose }: Props) => {
  const { t } = useAppTranslation('features.operations.operation-create');

  const { mutate: createOperation } = useCreateOperation();

  const handleSubmit = (values: OperationEditFormValues) => {
    createOperation(values, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        handleApiError(error);
      },
    });
  };

  return (
    <Modal open={isOpen} onCancel={onClose} title={t('modal.title')} footer={null} destroyOnHidden>
      <OperationForm onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
};
