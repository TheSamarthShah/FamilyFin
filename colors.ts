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

const cranePremiumTheme: ThemeModes = {
  light: {
    // Backgrounds (Light Mode) - Added depth with subtle gradients
    bgPrimary: '#F9F4FF',         // Ultra soft lavender-white
    bgSurface: '#FFFFFF',         // Pure white
    bgSurfaceVariant: '#F5EFFD',  // Delicate lavender tint
    bgLevel2: '#E8DAFF',          // Soft periwinkle

    // Texts (Light Mode) - Enhanced contrast
    textPrimary: '#3A0D4E',       // Deep royal purple (better readability)
    textMuted: '#7D6B8A',         // Elegant dusky purple
    textNeutral: '#A8A8C8',       // Cool gray with purple undertone
    textOnPrimary: '#FFFFFF',     // Crisp white
    textOnSurface: '#3A0D4E',     // Royal purple
    textOnBackground: '#3A0D4E',  // Royal purple

    // Accents & Utilities (Light Mode) - Richer tones
    textAccent: '#7B2CBF',        // Vibrant amethyst
    textDanger: '#D32F2F',        // Deep crimson
    warning: '#FF9500',           // Warm amber
    income: '#2E8B57',            // Forest green
    expense: '#C2185B',           // Deep pink
    highlight: '#E0AAFF',         // Soft lavender glow
    success: '#388E3C',           // Emerald green

    // New additions
    shadow: 'rgba(122, 92, 125, 0.15)',  // Subtle purple shadow
    borderLight: '#EDE7F6',       // Ultra light lavender border
  },

  dark: {
    // Backgrounds (Dark Mode) - Deeper jewel tones
    bgPrimary: '#14091A',         // Blackcurrant
    bgSurface: '#24152D',         // Deep eggplant
    bgSurfaceVariant: '#2E1A3A',  // Rich plum
    bgLevel2: '#3D0D4E',          // Royal purple

    // Texts (Dark Mode) - Softer contrasts
    textPrimary: '#F5F0FF',       // Ghost white
    textMuted: '#B8A2C8',         // Vintage lavender
    textNeutral: '#7D7D9E',       // Cool gray with purple tint
    textOnPrimary: '#FFFFFF',     // Pure white
    textOnSurface: '#F5F0FF',     // Ghost white
    textOnBackground: '#F5F0FF',  // Ghost white

    // Accents & Utilities (Dark Mode) - Luminous accents
    textAccent: '#9C4DFF',        // Electric lavender
    textDanger: '#FF5252',        // Neon rose
    warning: '#FFC107',           // Goldenrod
    income: '#69F0AE',            // Mint julep
    expense: '#FF4081',           // Raspberry
    highlight: '#7B2CBF',         // Deep amethyst glow
    success: '#4CAF50',           // Vibrant green

    // New additions
    shadow: 'rgba(30, 11, 26, 0.4)',  // Deep purple shadow
    borderDark: '#3A1A34',        // Rich plum border
  },
};

const tranquilTheme: ThemeModes = {
  light: {
    // Backgrounds - Soft aquatic layers
    bgPrimary: '#f5fafd',         // Morning mist
    bgSurface: '#ffffff',         // Pure white (like foam)
    bgSurfaceVariant: '#e8f4fc',  // Shallow water
    bgLevel2: '#d3e9f7',          // Gentle wave

    // Texts - Natural depth
    textPrimary: '#1a3a5a',       // Deep ocean
    textMuted: '#6d8ba7',         // Distant horizon
    textNeutral: '#a3b8cc',       // Wet stone
    textOnPrimary: '#ffffff',     // White crests
    textOnSurface: '#1a3a5a',     // Clear water
    textOnBackground: '#1a3a5a',  // Legible depth

    // Financial Elements - Earthy accents
    textAccent: '#3a7ca5',        // Calm bay
    textDanger: '#d56a5a',        // Coral warning (soft)
    warning: '#e9b44c',           // Sunbeam
    income: '#4a9178',            // Seaweed green
    expense: '#b46d82',           // Blush rose
    positive: '#5d9b7e',          // Success green (softer)
    encouragement: '#7aa5d2',     // Friendly prompt

    // Soothing Details
    shadow: 'rgba(142, 182, 209, 0.12)',  // Water reflection
    borderLight: '#d0e3f0',       // Rippled surface
  },

  dark: {
    // Backgrounds - Moonlit waters
    bgPrimary: '#0c1a24',         // Midnight sea
    bgSurface: '#142837',         // Deep water
    bgSurfaceVariant: '#1d3648',  // Moon pool
    bgLevel2: '#274b63',          // Abyss blue

    // Texts - Luminous clarity
    textPrimary: '#d4e9ff',       // Moonlight
    textMuted: '#7d9bb8',         // Star reflections
    textNeutral: '#4d6b85',       // Subdued current
    textOnPrimary: '#0c1a24',     // Dark on light
    textOnSurface: '#d4e9ff',     // Surface glow
    textOnBackground: '#d4e9ff',  // Primary text

    // Financial Elements - Gentle glow
    textAccent: '#5ca3d6',        // Bioluminescent
    textDanger: '#e28d82',        // Soft warning
    warning: '#f0c674',           // Warm lantern
    income: '#6dbb9d',            // Healthy kelp
    expense: '#d18d9e',           // Faded coral
    positive: '#7dcea0',          // Growth accent
    encouragement: '#8cbae8',     // Inviting highlight

    // Comforting Details
    shadow: 'rgba(10, 40, 70, 0.3)',  // Deep water shadow
    borderDark: '#2a4a62',        // Gentle divide
  },
};

// === Theme Map ===
export const themes = {
  default: defaultTheme,
  crane: craneTheme,
  crane2: cranePremiumTheme,
  tranq:tranquilTheme
};

// === Active Theme Key (Switch this to change theme globally)
const activeThemeKey: keyof typeof themes = 'tranq'; // or 'default'
const activeTheme = themes[activeThemeKey];

// === Final Export ===
export const Colors = {
  light: activeTheme.light,
  dark: activeTheme.dark,
};
