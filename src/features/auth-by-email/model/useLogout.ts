import { useSessionStore } from '@/entities/session';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useSessionStore();
  const queryClient = useQueryClient();

  return () => {
    logout(queryClient);
    navigate('/auth/signin', { replace: true });
  };
};
