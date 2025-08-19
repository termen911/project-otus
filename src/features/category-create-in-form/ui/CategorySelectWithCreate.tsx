import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space, type InputRef, type SelectProps } from 'antd';
import { useRef } from 'react';
import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';

interface CategorySelectWithCreateProps extends Omit<SelectProps, 'options'> {
  options: { label: string; value: string }[];
  isCreating?: boolean;
  onCreate: (name: string) => void;
}

export const CategorySelectWithCreate: React.FC<CategorySelectWithCreateProps> = ({
  options,
  isCreating,
  onCreate,
  ...selectProps
}) => {
  const { t } = useAppTranslation('features.category-create-in-form');
  const inputRef = useRef<InputRef>(null);

  const handleCreate = (name: string) => {
    if (name.trim()) {
      onCreate(name);
    }
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    handleCreate(value);
  };

  const onDropdownVisibleChange = (visible: boolean) => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <Select
      {...selectProps}
      onOpenChange={onDropdownVisibleChange}
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      loading={selectProps.loading || isCreating}
      disabled={selectProps.disabled || isCreating}
      popupRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 8px' }}>
            <Input
              placeholder={t('placeholder')}
              ref={inputRef}
              onPressEnter={handlePressEnter}
              disabled={isCreating}
            />
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => {
                const value = inputRef.current?.input?.value;
                if (value) handleCreate(value);
              }}
              loading={isCreating}
              disabled={isCreating}
            >
              {t('addButton')}
            </Button>
          </Space>
        </>
      )}
    />
  );
};
