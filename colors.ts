// theme/colors.ts

type ThemeColors = {
  [key: string]: string;
};

type ThemeModes = {
  light: ThemeColors;
  dark: ThemeColors;
};

// === Default Theme (Base) ===
const defaultTheme: ThemeModes = {
  light: {
    // Backgrounds
    bgPrimary: '#F9FAFB',
    bgSurface: '#FFFFFF',
    bgSurfaceVariant: '#F3F4F6',
    bgLevel2: '#E5E7EB',

    // Texts
    textPrimary: '#000000',
    textMuted: '#4B5563',
    textNeutral: '#E5E7EB',
    textOnPrimary: '#FFFFFF',
    textOnSurface: '#000000',
    textOnBackground: '#000000',

    // Utilities
    textAccent: '#2563EB',
    textDanger: '#DC2626',
    warning: '#CA8A04',
    income: '#059669',
    expense: '#B91C1C',
  },

  dark: {
    bgPrimary: '#0F172A',
    bgSurface: '#1E293B',
    bgSurfaceVariant: '#1E293B',
    bgLevel2: '#1E293B',

    textPrimary: '#FFFFFF',
    textMuted: '#94A3B8',
    textNeutral: '#334155',
    textOnPrimary: '#000000',
    textOnSurface: '#FFFFFF',
    textOnBackground: '#FFFFFF',

    textAccent: '#3B82F6',
    textDanger: '#F87171',
    warning: '#FACC15',
    income: '#34D399',
    expense: '#F87171',
  },
};

// === Crane Theme ===
const craneTheme: ThemeModes = {
  light: {
    // Backgrounds (Light Mode)
    bgPrimary: '#F8F5FA',         // Soft lavender-white
    bgSurface: '#FFFFFF',         // Pure white
    bgSurfaceVariant: '#F3EDF7',  // Lighter lavender tint
    bgLevel2: '#E8E0EF',          // Subtle lavender-gray

    // Texts (Light Mode)
    textPrimary: '#4E0D3A',       // Deep purple (primary text)
    textMuted: '#7A5C7D',         // Muted purple-gray
    textNeutral: '#B8B8B8',       // Neutral gray
    textOnPrimary: '#FFFFFF',     // White text on primary
    textOnSurface: '#4E0D3A',     // Deep purple on surfaces
    textOnBackground: '#4E0D3A',  // Deep purple on bg

    // Utilities (Light Mode)
    textAccent: '#8A2BE2',        // Vibrant purple (better contrast)
    textDanger: '#E74C3C',        // Bright red
    warning: '#FFA500',           // Orange
    income: '#27AE60',            // Green
    expense: '#E74C3C',           // Red
  },

  dark: {
    // Backgrounds (Dark Mode)
    bgPrimary: '#1E0B1A',         // Dark purple-black
    bgSurface: '#2D1128',         // Darker purple
    bgSurfaceVariant: '#3A1A34',  // Slightly lighter
    bgLevel2: '#4E0D3A',          // Crane brand purple

    // Texts (Dark Mode)
    textPrimary: '#FFFFFF',       // White
    textMuted: '#C4A4C8',         // Light lavender
    textNeutral: '#6D6D6D',       // Darker gray
    textOnPrimary: '#FFFFFF',     // White on primary
    textOnSurface: '#FFFFFF',     // White on surfaces
    textOnBackground: '#FFFFFF',  // White on bg

    // Utilities (Dark Mode)
    textAccent: '#BA55D3',        // Soft purple (softer than light mode)
    textDanger: '#FF6B6B',        // Light red
    warning: '#FFD700',           // Gold
    income: '#6EE7B7',            // Mint green
    expense: '#FF6B6B',           // Light red
  },
};

// === Theme Map ===
export const themes = {
  default: defaultTheme,
  crane: craneTheme,
};

// === Active Theme Key (Switch this to change theme globally)
const activeThemeKey: keyof typeof themes = 'crane'; // or 'default'
const activeTheme = themes[activeThemeKey];

// === Final Export ===
export const Colors = {
  light: activeTheme.light,
  dark: activeTheme.dark,
};
