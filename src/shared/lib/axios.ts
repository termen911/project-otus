import { useSessionStore } from '@/entities/session';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://19429ba06ff2.vps.myjino.ru/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useSessionStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logout = useSessionStore.getState().logout;
      if (logout) {
        logout();
        window.location.href = '/auth/signin';
      }
    }

    return Promise.reject(error);
  }
);
