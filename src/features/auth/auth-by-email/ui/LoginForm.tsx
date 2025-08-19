import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { handleApiError } from '@/shared/lib/errors/handleApiError';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { App, Button, Divider, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { useLogin } from '../api/useLogin';
import type { LoginDto, LoginFormValues } from '../model/types';
import { useQueryClient } from '@tanstack/react-query';

const { Item: FormItem } = Form;
const { Link } = Typography;

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const { t } = useAppTranslation('features.auth.auth-by-email');
  const { message } = App.useApp();
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onFinish = (values: LoginFormValues) => {
    const dto: LoginDto = {
      email: values.email,
      password: values.password,
    };

    login(dto, {
      onSuccess: () => {
        message.success(t('login.success'));
        queryClient.clear();
        navigate('/profile');
      },
      onError: (error) => {
        const fieldErrors = handleApiError(error);
        if (fieldErrors.length > 0) {
          form.setFields(
            fieldErrors.map((err) => ({
              name: err.fieldName! as keyof LoginFormValues,
              errors: [err.message],
            }))
          );
        }
      },
    });
  };

  return (
    <Form
      form={form}
      name="login"
      layout="vertical"
      onFinish={onFinish}
      disabled={isPending}
      autoComplete="off"
      style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t('login.title')}</h2>

      <FormItem
        name="email"
        label={t('login.email.label')}
        rules={[
          { required: true, message: t('login.email.required') },
          { type: 'email', message: t('login.email.invalid') },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder={t('login.email.placeholder')}
          autoFocus
        />
      </FormItem>

      <FormItem
        name="password"
        label={t('login.password.label')}
        rules={[
          { required: true, message: t('login.password.required') },
          { min: 6, message: t('login.password.minLength') },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t('login.password.placeholder')}
        />
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          {isPending ? t('login.submitLoading') : t('login.submit')}
        </Button>
      </FormItem>

      <Divider style={{ margin: '24px 0' }} />

      <div style={{ textAlign: 'center', fontSize: '0.95rem' }}>
        {t('login.signupDescription')}{' '}
        <Link onClick={() => navigate('/auth/signup')}>{t('login.links.signup')}</Link>
      </div>
    </Form>
  );
};
