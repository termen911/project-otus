import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { OperationCreateModal } from './OperationCreateModal';

export const OperationCreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useAppTranslation();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        {t('pages.operations.buttons.addNewOperation')}
      </Button>
      <OperationCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
