import { getThemeConfig } from '@/shared/lib/antd/theme';
import { ConfigProvider } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextType, ThemeMode } from './types/theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  }, [theme]);

  const applyTheme = (mode: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', mode);
  };

  const themeValue = useMemo<ThemeContextType>(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <ConfigProvider theme={getThemeConfig(theme)}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
