export const Colors = {
  light: {
    primary: '#2563EB',
    accent: '#16A34A',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    muted: '#4B5563',
    warning: '#CA8A04',
    danger: '#DC2626',
    income: '#059669',
    expense: '#B91C1C',
    neutral: '#E5E7EB',

    // Required by React Native Paper
    onPrimary: '#FFFFFF',
    onSurface: '#000000',
    onBackground: '#000000',
    surfaceVariant: '#F3F4F6',
    level2: '#E5E7EB',  // <== Fixes the crash
  },
  dark: {
    primary: '#3B82F6',
    accent: '#22C55E',
    background: '#0F172A',
    surface: '#1E293B',
    muted: '#94A3B8',
    warning: '#FACC15',
    danger: '#F87171',
    income: '#34D399',
    expense: '#F87171',
    neutral: '#334155',

    // Required by React Native Paper
    onPrimary: '#000000',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
    surfaceVariant: '#1E293B',
    level2: '#1E293B',  // <== Fixes the crash
  },
};
