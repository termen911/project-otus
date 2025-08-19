import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, type MenuProps } from 'antd';
import { useEffect, useState } from 'react';

interface OperationExtraMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const OperationExtraMenu = ({ onEdit, onDelete }: OperationExtraMenuProps) => {
  const [menu, setMenu] = useState<MenuProps['items']>([]);

  useEffect(() => {
    const newMenu: MenuProps['items'] = [];
    if (onEdit) {
      newMenu.push({
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Редактировать',
        onClick: onEdit,
      });
    }
    if (onDelete) {
      newMenu.push({
        key: 'delete',
        icon: <DeleteOutlined />,
        label: 'Удалить',
        danger: true,
        onClick: onDelete,
      });
    }
    setMenu(newMenu);
  }, [onEdit, onDelete]);

  return (
    <Dropdown menu={{ items: menu }} trigger={['click']}>
      <Button size="small" type="text">
        ...
      </Button>
    </Dropdown>
  );
};
