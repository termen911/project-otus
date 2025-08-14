import { useSessionStore } from '@/entities/session';
import { authApi } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import type { RegisterDto } from '../model/types';

export const useRegister = () => {
  const { setToken } = useSessionStore();

  return useMutation({
    mutationFn: async (data: RegisterDto) => {
      const response = await authApi.signup(data);
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
