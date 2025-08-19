import type { LoginDto, RegisterDto } from '@/features/auth/auth-by-email/model/types';
import { axiosInstance } from '../lib/axios';

export const authApi = {
  signin: (credentials: LoginDto) => axiosInstance.post<{ token: string }>('/signin', credentials),
  signup: (credentials: RegisterDto) =>
    axiosInstance.post<{ token: string }>('/signup', credentials),
};
