import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { useRegister } from '../api/useRegister';
import type { RegisterDto } from '../model/types';
import { handleApiError } from '@/shared/lib/errors/handleApiError';

const { Item: FormItem } = Form;
const { Link } = Typography;

const COMMAND_ID = '1234567890';

export const RegisterForm = () => {
  const [form] = Form.useForm<RegisterDto>();
  const { t } = useAppTranslation('features.auth.auth-by-email');
  const { mutate: register, isPending } = useRegister();
  const navigate = useNavigate();

  const onFinish = (values: RegisterDto) => {
    register(values, {
      onSuccess: () => {
        message.success(t('register.success'));
        navigate('/profile');
      },
      onError: (error) => {
        const fieldErrors = handleApiError(error);
        if (fieldErrors.length > 0) {
          form.setFields(
            fieldErrors.map((err) => ({
              name: err.fieldName! as keyof RegisterDto,
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
      name="register"
      layout="vertical"
      onFinish={onFinish}
      disabled={isPending}
      autoComplete="off"
      style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}
      initialValues={{
        commandId: COMMAND_ID,
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t('register.title')}</h2>
      <FormItem name="commandId" label={t('register.label')} hidden>
        <Input disabled />
      </FormItem>
      <FormItem
        name="email"
        label={t('register.email.label')}
        rules={[
          { required: true, message: t('register.email.required') },
          { type: 'email', message: t('register.email.invalid') },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder={t('register.email.placeholder')}
          autoFocus
        />
      </FormItem>

      <FormItem
        name="password"
        label={t('register.password.label')}
        rules={[
          { required: true, message: t('register.password.required') },
          { min: 6, message: t('register.password.minLength') },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t('register.password.placeholder')}
        />
      </FormItem>

      <FormItem
        name="confirmPassword"
        label={t('register.confirmPassword.label')}
        dependencies={['password']}
        rules={[
          { required: true, message: t('register.confirmPassword.required') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('register.confirmPassword.mismatch')));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t('register.confirmPassword.placeholder')}
        />
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          {isPending ? t('register.submitLoading') : t('register.submit')}
        </Button>
      </FormItem>

      <Divider style={{ margin: '24px 0' }} />

      <div style={{ textAlign: 'center', fontSize: '0.95rem' }}>
        {t('register.signinDescription')}{' '}
        <Link onClick={() => navigate('/auth/signin')}>{t('register.links.signin')}</Link>
      </div>
    </Form>
  );
};
