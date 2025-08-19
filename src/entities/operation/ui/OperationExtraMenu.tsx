import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, type MenuProps } from 'antd';
import { useEffect, useState } from 'react';

interface OperationExtraMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const OperationExtraMenu = ({ onEdit, onDelete }: OperationExtraMenuProps) => {
  const { t } = useAppTranslation('entities.operation');
  const [menu, setMenu] = useState<MenuProps['items']>([]);

  useEffect(() => {
    const newMenu: MenuProps['items'] = [];
    if (onEdit) {
      newMenu.push({
        key: 'edit',
        icon: <EditOutlined />,
        label: t('extraMenu.edit'),
        onClick: onEdit,
      });
    }
    if (onDelete) {
      newMenu.push({
        key: 'delete',
        icon: <DeleteOutlined />,
        label: t('extraMenu.delete'),
        danger: true,
        onClick: onDelete,
      });
    }
    setMenu(newMenu);
  }, [onEdit, onDelete, t]);

  return (
    <Dropdown menu={{ items: menu }} trigger={['click']}>
      <Button size="small" type="text">
        ...
      </Button>
    </Dropdown>
  );
};
