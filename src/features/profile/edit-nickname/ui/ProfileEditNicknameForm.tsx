import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { type UpdateProfileDto, useProfileStore, useUpdateProfile } from '@/entities/profile';
import { handleApiError } from '@/shared/lib/errors/handleApiError';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';

export const ProfileEditNicknameForm = () => {
  const [form] = Form.useForm<UpdateProfileDto>();
  const { t } = useAppTranslation('features.profile.edit-nickname');
  const profile = useProfileStore((state) => state.profile);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({ name: profile.name });
    }
  }, [profile, form]);

  const onFinish = (values: UpdateProfileDto) => {
    updateProfile(
      { name: values.name },
      {
        onSuccess: () => {
          message.success(t('success'));
        },
        onError: (error) => {
          const fieldErrors = handleApiError(error);
          if (fieldErrors.length > 0) {
            form.setFields(
              fieldErrors.map((err) => ({
                name: err.fieldName! as keyof UpdateProfileDto,
                errors: [err.message],
              }))
            );
          }
        },
      }
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h3>{t('title')}</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label={t('name.label')}
          rules={[
            { required: true, message: t('name.required') },
            { min: 2, message: t('name.minLength') },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t('name.placeholder')} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
