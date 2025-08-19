import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { OperationForm, type OperationEditFormValues } from '@/features/operation-form';
import { Modal } from 'antd';
import { useCreateOperation } from '@/entities/operation';
import { handleApiError } from '@/shared/lib/errors/handleApiError';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OperationCreateModal = ({ isOpen, onClose }: Props) => {
  const { t } = useAppTranslation();

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
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={t('pages.operations.form.title')}
      footer={null}
      destroyOnHidden
    >
      <OperationForm onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
};
