import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import type { Operation } from '@/entities/operation';
import {
  CategorySelectWithCreate,
  useCategorySelectData,
} from '@/features/category-create-in-form';
import { Button, DatePicker, Divider, Flex, Form, Input, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import type { OperationEditFormValues } from '../model/types';

type OperationFormProps = {
  onSubmit?: (data: OperationEditFormValues) => void;
  onCancel?: () => void;
  operation?: Pick<Operation, 'id' | 'name' | 'desc' | 'amount' | 'type' | 'category' | 'date'>;
};

export const OperationForm: React.FC<OperationFormProps> = ({ onSubmit, onCancel, operation }) => {
  const [form] = Form.useForm<OperationEditFormValues>();
  const { t } = useAppTranslation('features.operations.operation-form');

  const {
    options: categoriesOptions,
    isLoading: isLoadingCategories,
    isCreating: isCreatingCategory,
    createCategory: createCategoryInForm,
  } = useCategorySelectData();

  const isEditing = !!operation;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      initialValues={{
        ...operation,
        categoryId: operation?.category.id,
        date: operation?.date ? dayjs(operation.date) : undefined,
      }}
    >
      <Form.Item
        name="name"
        label={t('fields.name.label')}
        required
        rules={[{ required: true, message: t('fields.name.errors.required') }]}
      >
        <Input placeholder={t('fields.name.placeholder')} />
      </Form.Item>

      <Form.Item name="desc" label={t('fields.description.label')}>
        <Input.TextArea placeholder={t('fields.description.placeholder')} />
      </Form.Item>

      <Form.Item
        name="amount"
        label={t('fields.amount.label')}
        required
        rules={[{ required: true, message: t('fields.amount.errors.required') }]}
      >
        <Input type="number" step="0.01" placeholder={t('fields.amount.placeholder')} />
      </Form.Item>

      <Form.Item
        name="date"
        label={t('fields.date.label')}
        required
        rules={[{ required: true, message: t('fields.date.errors.required') }]}
      >
        <DatePicker showTime style={{ width: '100%' }} placeholder={t('fields.date.placeholder')} />
      </Form.Item>

      <Form.Item
        name="type"
        label={t('fields.type.label')}
        required
        rules={[{ required: true, message: t('fields.type.errors.required') }]}
      >
        <Select
          placeholder={t('fields.type.placeholder')}
          options={[
            { label: t('fields.type.options.profit'), value: 'Profit' },
            { label: t('fields.type.options.cost'), value: 'Cost' },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label={t('fields.category.label')}
        required
        rules={[{ required: true, message: t('fields.category.errors.required') }]}
      >
        {isLoadingCategories ? (
          <Skeleton.Input active />
        ) : (
          <CategorySelectWithCreate
            options={categoriesOptions}
            isCreating={isCreatingCategory}
            onCreate={(name) => {
              createCategoryInForm(name, (id) => {
                form.setFieldsValue({ categoryId: id });
              });
            }}
            placeholder={t('fields.category.placeholder')}
            value={form.getFieldValue('categoryId')}
            onChange={(value) => form.setFieldsValue({ categoryId: value })}
          />
        )}
      </Form.Item>

      <Divider />

      <Flex justify="end" gap={8}>
        <Button onClick={onCancel} disabled={isCreatingCategory}>
          {t('buttons.cancel')}
        </Button>
        <Button type="primary" htmlType="submit" loading={isCreatingCategory}>
          {isEditing ? t('buttons.save') : t('buttons.create')}
        </Button>
      </Flex>
    </Form>
  );
};
