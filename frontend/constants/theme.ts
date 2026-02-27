// Theme constants for ProfoliX Resume App
// Dark theme with vibrant gradient accents

export const Colors = {
  // Base
  background: '#0A0A1A',
  surface: '#12122A',
  surfaceLight: '#1A1A3E',
  card: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(255, 255, 255, 0.1)',

  // Text
  text: '#FFFFFF',
  textSecondary: '#A0A0C0',
  textMuted: '#6B6B8D',

  // Accents
  primary: '#7C4DFF',
  primaryLight: '#B388FF',
  secondary: '#00E5FF',
  secondaryLight: '#84FFFF',
  accent: '#FF4081',
  accentLight: '#FF80AB',

  // Status
  success: '#00E676',
  warning: '#FFAB40',
  error: '#FF5252',

  // Glass
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  glassHighlight: 'rgba(255, 255, 255, 0.12)',
};

export const Gradients = {
  primary: ['#7C4DFF', '#448AFF'],
  secondary: ['#00E5FF', '#00B0FF'],
  accent: ['#FF4081', '#FF6E40'],
  hero: ['#0A0A1A', '#1A1A3E', '#12122A'],
  card: ['rgba(124, 77, 255, 0.12)', 'rgba(0, 229, 255, 0.08)'],
  cardAlt: ['rgba(255, 64, 129, 0.12)', 'rgba(124, 77, 255, 0.08)'],
  skillBar: ['#7C4DFF', '#00E5FF'],
  timeline: ['#7C4DFF', '#FF4081'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

export const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,
  display: 44,
};

export const Shadows = {
  small: {
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  glow: {
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
};
