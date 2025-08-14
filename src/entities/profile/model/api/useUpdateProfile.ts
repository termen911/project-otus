import { profileApi } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfileStore } from '../profileStore';
import type { UpdateProfileDto } from '../types';
import { queryKeysProfile } from './queryKeysProfile';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileDto) => {
      const response = await profileApi.updateProfile(data);
      return response.data;
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(queryKeysProfile.profile, updatedProfile);
      useProfileStore.getState().setProfile(updatedProfile);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
