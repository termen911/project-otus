import { useSessionStore } from '@/entities/session';
import { authApi } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { setToken } = useSessionStore();

  return useMutation({
    mutationFn: authApi.signin,
    onSuccess: ({ data }) => {
      setToken(data.token);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
