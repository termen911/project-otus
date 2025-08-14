import type {
  ChangePasswordDto,
  ChangePasswordResult,
  Profile,
  UpdateProfileDto,
} from '@/entities/profile/model/types';
import { axiosInstance } from '../lib/axios';

export const profileApi = {
  fetchProfile: () => axiosInstance.get<Profile>('/profile'),
  updateProfile: (data: UpdateProfileDto) => axiosInstance.patch<Profile>('/profile', data),
  changePassword: (data: ChangePasswordDto) =>
    axiosInstance.post<ChangePasswordResult>('/profile/change-password', data),
};
