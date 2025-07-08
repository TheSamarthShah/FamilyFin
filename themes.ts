import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Colors } from './colors';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...Colors.light,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...Colors.dark,
  },
};
