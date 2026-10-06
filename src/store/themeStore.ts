import { create } from 'zustand';
import type { Theme } from '../types';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Get initial theme from localStorage
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  }
  return 'dark';
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('light', theme === 'light');
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(newTheme);
  },
}));

// Initialize theme on app load
if (typeof window !== 'undefined') {
  const theme = getInitialTheme();
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    document.body.classList.add('light');
  }
}
