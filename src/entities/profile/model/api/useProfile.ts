import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useProfileStore } from '../profileStore';
import type { ChangePasswordDto, UpdateProfileDto } from '../types';
import { queryKeysProfile } from './queryKeys';
import { profileApi } from './profileApi';

export const useGetProfile = () => {
  return useQuery({
    queryKey: queryKeysProfile.profile,
    queryFn: async () => {
      const response = await profileApi.fetchProfile();
      return response.data;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordDto) => {
      const response = await profileApi.changePassword(data);
      return response.data;
    },
  });
};

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
