import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { type ChangePasswordDto, useChangePassword } from '@/entities/profile';
import { handleApiError } from '@/shared/lib/errors/handleApiError';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

export const ChangePasswordForm = () => {
  const [form] = Form.useForm<ChangePasswordDto>();
  const { t } = useAppTranslation();
  const { mutate: changePassword, isPending } = useChangePassword();

  const onFinish = (values: ChangePasswordDto) => {
    changePassword(values, {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t('pages.profile.changePassword.success'));
          form.resetFields();
        } else {
          message.error(t('pages.profile.changePassword.error'));
        }
      },
      onError: (error) => {
        const fieldErrors = handleApiError(error);
        if (fieldErrors.length > 0) {
          form.setFields(
            fieldErrors.map((err) => ({
              name: err.fieldName! as keyof ChangePasswordDto,
              errors: [err.message],
            }))
          );
        }
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '30px 0 0' }}>
      <h3>{t('pages.profile.changePassword.title')}</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          label={t('pages.profile.changePassword.currentPassword.label')}
          rules={[
            { required: true, message: t('pages.profile.changePassword.currentPassword.required') },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('pages.profile.changePassword.currentPassword.placeholder')}
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={t('pages.profile.changePassword.newPassword.label')}
          rules={[
            { required: true, message: t('pages.profile.changePassword.newPassword.required') },
            { min: 6, message: t('pages.profile.changePassword.newPassword.minLength') },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('pages.profile.changePassword.newPassword.placeholder')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {t('pages.profile.changePassword.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
