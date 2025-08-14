import logo from '@/shared/assets/logo.svg';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router';

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <Avatar
      src={logo}
      alt="logo"
      size={40} shape="square" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
  );
};
