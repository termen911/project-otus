import { profileApi, useProfileStore } from '@/entities/profile';
import { validateToken as validateTokenUtil } from '@/shared/lib/auth';
import { safeLocalStorage } from '@/shared/lib/storage';
import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  setToken: (token: string) => void;
  logout: (queryClient: QueryClient) => void;
  clearError: () => void;
  validateToken: () => Promise<boolean>;
  initializeAuth: () => void;
  hasLoadedProfile: boolean;
  loadProfile: () => Promise<void>;
}

export const useSessionStore = create(
  persist<SessionState>(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      error: null,
      hasLoadedProfile: false,
      setToken: (token) => {
        const { isValid, error } = validateTokenUtil(token);
        if (!isValid) {
          set({ token: null, isAuthenticated: false, error });
          return;
        }

        set({ token, isAuthenticated: true, error: null, hasLoadedProfile: false });
        get().loadProfile();
      },

      logout: (queryClient: QueryClient) => {
        useProfileStore.getState().clearProfile();
        queryClient.clear();
        set({
          token: null,
          isAuthenticated: false,
          error: null,
          hasLoadedProfile: false,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      validateToken: async () => {
        const { token } = get();
        const { isValid, error } = validateTokenUtil(token);
        if (!isValid) {
          set({ token: null, isAuthenticated: false, error, hasLoadedProfile: false });
          return false;
        }
        set({ isAuthenticated: true, error: null, hasLoadedProfile: false });
        get().loadProfile();

        return true;
      },

      initializeAuth: async () => {
        await get().validateToken();
      },

      loadProfile: async () => {
        if (get().hasLoadedProfile) return;
        try {
          const response = await profileApi.fetchProfile();
          useProfileStore.getState().setProfile(response.data);
          set({ hasLoadedProfile: true });
        } catch (error) {
          console.warn('Failed to load profile:', error);
        }
      },
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
