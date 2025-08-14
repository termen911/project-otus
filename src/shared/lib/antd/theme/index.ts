import type { ThemeMode } from '@/shared/types';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const getThemeConfig = (mode: ThemeMode) => (mode === 'light' ? lightTheme : darkTheme);
