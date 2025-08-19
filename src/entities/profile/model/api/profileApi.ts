import type {
  ChangePasswordDto,
  ChangePasswordResult,
  Profile,
  UpdateProfileDto,
} from '@/entities/profile/model/types';
import { axiosInstance } from '@/shared/lib/axios';

const PROFILE_ENDPOINT = '/profile';

export const profileApi = {
  fetchProfile: () => axiosInstance.get<Profile>(PROFILE_ENDPOINT),
  updateProfile: (data: UpdateProfileDto) => axiosInstance.patch<Profile>(PROFILE_ENDPOINT, data),
  changePassword: (data: ChangePasswordDto) =>
    axiosInstance.post<ChangePasswordResult>(`${PROFILE_ENDPOINT}/change-password`, data),
};
