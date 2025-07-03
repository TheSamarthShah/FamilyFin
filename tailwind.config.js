/** @type {import('tailwindcss').Config} */
import { Colors } from './colors';
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Toggle dark mode via class (e.g. <View className="dark">)

  theme: {
    extend: {
     colors: Object.keys(Colors.light).reduce((acc, key) => {
        acc[key] = {
          DEFAULT: Colors.light[key],
          dark: Colors.dark[key],
        };
        return acc;
      }, {}),

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Manrope', 'ui-sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },

      spacing: {
        card: '1.25rem',
        section: '2rem',
        tight: '0.75rem',
        loose: '2.5rem',
      },

      borderRadius: {
        xl: '1rem',
        card: '0.75rem',
      },

      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },

  plugins: [],
};
