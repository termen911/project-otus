import { useProfileStore } from '@/entities/profile';
import { useSessionStore } from '@/entities/session';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useSessionStore();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    useProfileStore.getState().clearProfile();
    queryClient.clear();
    logout();
    navigate('/auth/signin', { replace: true });
  };

  return handleLogout;
};
