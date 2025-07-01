// themes.ts
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4F46E5',
    secondary: '#10B981',
    background: '#ffffff',
    surface: '#f9fafb',
    // Don't define `text` here
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6366f1',
    secondary: '#34d399',
    background: '#121212',
    surface: '#1e1e1e',
    // Again, no `text`
  },
};
