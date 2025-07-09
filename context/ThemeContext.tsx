import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  isThemeLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isThemeLoaded: false,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const updateTheme = (colorScheme: ColorSchemeName) => {
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
      setIsThemeLoaded(true);
    };

    const systemTheme = Appearance.getColorScheme();
    updateTheme(systemTheme);

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};
