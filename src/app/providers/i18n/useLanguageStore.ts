import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeLocalStorage } from '@/shared/lib/storage';

type Language = 'ru' | 'en';

interface LanguageState {
  language: Language | null;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: null,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
