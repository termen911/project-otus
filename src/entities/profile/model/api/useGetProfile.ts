import { profileApi } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { queryKeysProfile } from './queryKeysProfile';

export const useGetProfile = () => {
  return useQuery({
    queryKey: queryKeysProfile.profile,
    queryFn: async () => {
      const response = await profileApi.fetchProfile();
      return response.data;
    },
  });
};
