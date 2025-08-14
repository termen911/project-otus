import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

export const SignInIcon = () => {
  const navigate = useNavigate();

  return (
    <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate('/auth/signin')}>
      Sign In
    </Button>
  );
};
