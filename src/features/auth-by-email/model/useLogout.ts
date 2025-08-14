import { useSessionStore } from '@/entities/session';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useSessionStore();

  return () => {
    logout();
    navigate('/auth/signin', { replace: true });
  };
};
