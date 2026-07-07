'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const THEMES = ['light', 'dark', 'blue', 'green', 'purple', 'orange'];
const THEME_KEY = 'labelflow-theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children, defaultTheme = 'light' }) {
  const [theme, setThemeState] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    if (stored && THEMES.includes(stored)) {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
    if (theme === 'dark') root.classList.add('dark');
    else if (theme !== 'light') root.classList.add(`theme-${theme}`);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  const setTheme = (t) => {
    if (THEMES.includes(t)) setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export const THEME_META = {
  light: { name: 'Light', color: '#ffffff', ring: '#3b82f6' },
  dark: { name: 'Dark', color: '#0f172a', ring: '#60a5fa' },
  blue: { name: 'Blue', color: '#eff6ff', ring: '#2563eb' },
  green: { name: 'Green', color: '#f0fdf4', ring: '#16a34a' },
  purple: { name: 'Purple', color: '#faf5ff', ring: '#9333ea' },
  orange: { name: 'Orange', color: '#fff7ed', ring: '#ea580c' },
};
