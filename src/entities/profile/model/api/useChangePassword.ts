import { profileApi } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import type { ChangePasswordDto } from '../types';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordDto) => {
      const response = await profileApi.changePassword(data);
      return response.data;
    },
  });
};
