import type { ThemeMode } from '@/app/providers/theme/types/theme';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const getThemeConfig = (mode: ThemeMode) => (mode === 'light' ? lightTheme : darkTheme);
