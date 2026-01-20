const BASE_CONSTANTS = {
  font_weight: {
    small: '400',
    medium: '500',
    large: '700',
  },
  border_radius: {
    xx_small: '0.3em',
    x_small: '0.5em',
    small: '0.7em',
    medium: '0.9em',
    large: '1em',
    x_large: '1.2em',
    xx_large: '1.4em',
    xxx_large: '1.7em',
    percentage_medium: '50%',
    percentage_full: '100%',
  },
  paddings: {
    xx_small: '0.3em',
    x_small: '0.5em',
    small: '0.7em',
    medium: '0.9em',
    large: '1em',
    x_large: '1.2em',
    xx_large: '1.4em',
    xxx_large: '1.7em',
  },
  font_sizes: {
    xxx_small: '0.6em',
    xx_small: '0.7em',
    x_small: '0.8em',
    small: '1em',
    medium: '1.1em',
    large: '1.3em',
    x_large: '1.4em',
    xx_large: '1.6em',
    xxx_large: '1.8em',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
} as const;

const DARK_COLORS = {
  // Verde institucional (dark)
  primary: '#1E7F4F',
  primaryDark: '#14532D',
  primaryLight: '#34D399',
  primaryAlpha: 'rgba(30, 127, 79, 0.12)',

  // Backgrounds (slate/neutral, no “verde fosforescente”)
  bgPrimary: '#0B1220', // layout
  bgSecondary: '#0F172A', // containers
  bgTertiary: '#111C2E', // elevated/cards
  bgHover: '#14223A',
  bgActive: '#1A2B47',
  bgInput: '#0F1A2D',

  // Text
  fontPrimary: '#E5E7EB',
  fontSecondary: '#A1A1AA',
  fontTertiary: '#71717A',
  fontDisabled: '#52525B',
  fontLink: '#34D399',
  fontLinkHover: '#6EE7B7',

  // Status
  success: '#22C55E',
  successBg: 'rgba(34, 197, 94, 0.12)',
  info: '#06B6D4',
  infoBg: 'rgba(6, 182, 212, 0.12)',
  warning: '#F59E0B',
  warningBg: 'rgba(245, 158, 11, 0.12)',
  error: '#EF4444',
  errorBg: 'rgba(239, 68, 68, 0.12)',

  // Borders & dividers
  border: '#1F2A44',
  borderLight: '#17233A',
  borderHover: '#2B3A5E',
  divider: '#17233A',

  black: '#000000',
  white: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const;

const LIGHT_COLORS = {
  // Verde institucional (light)
  primary: '#14532D',
  primaryDark: '#0B3D2E',
  primaryLight: '#D1FAE5',
  primaryAlpha: 'rgba(20, 83, 45, 0.10)',

  // Backgrounds
  bgPrimary: '#F8FAF9', // layout
  bgSecondary: '#FFFFFF', // containers
  bgTertiary: '#F1F5F9', // elevated/cards
  bgHover: '#EEF2F7',
  bgActive: '#E5E7EB',
  bgInput: '#FFFFFF',

  // Text
  fontPrimary: '#0F172A',
  fontSecondary: '#334155',
  fontTertiary: '#64748B',
  fontDisabled: '#94A3B8',
  fontLink: '#14532D',
  fontLinkHover: '#166534',

  // Status
  success: '#16A34A',
  successBg: 'rgba(22, 163, 74, 0.10)',
  info: '#0891B2',
  infoBg: 'rgba(8, 145, 178, 0.10)',
  warning: '#D97706',
  warningBg: 'rgba(217, 119, 6, 0.10)',
  error: '#DC2626',
  errorBg: 'rgba(220, 38, 38, 0.10)',

  // Borders & dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderHover: '#CBD5E1',
  divider: '#E2E8F0',

  black: '#000000',
  white: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const getTheme = (mode: 'dark' | 'light' = 'dark') => {
  const colors = mode === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  return {
    mode,
    colors,
    ...BASE_CONSTANTS,
  } as const;
};

export const theme = getTheme('dark');

export type Theme = ReturnType<typeof getTheme>;
export type ThemeMode = 'dark' | 'light';
export type ThemeColors = typeof DARK_COLORS;

export const getAntDesignTheme = (mode: ThemeMode = 'dark') => {
  const colors = mode === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  return {
    token: {
      colorPrimary: colors.primary,
      colorPrimaryHover: colors.primaryLight,
      colorPrimaryActive: colors.primaryDark,

      colorSuccess: colors.success,
      colorWarning: colors.warning,
      colorError: colors.error,
      colorInfo: colors.info,

      colorBgContainer: colors.bgSecondary,
      colorBgElevated: colors.bgTertiary,
      colorBgLayout: colors.bgPrimary,
      colorBgSpotlight: colors.bgHover,

      colorText: colors.fontPrimary,
      colorTextSecondary: colors.fontSecondary,
      colorTextTertiary: colors.fontTertiary,
      colorTextDisabled: colors.fontDisabled,

      colorBorder: colors.border,
      colorBorderSecondary: colors.borderLight,

      controlItemBgHover: colors.bgHover,
      controlItemBgActive: colors.bgActive,

      borderRadius: 8,
      fontSize: 14,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

      boxShadow:
        mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.45)' : '0 2px 8px rgba(0, 0, 0, 0.15)',
      boxShadowSecondary:
        mode === 'dark' ? '0 6px 16px rgba(0, 0, 0, 0.32)' : '0 6px 16px rgba(0, 0, 0, 0.08)',
    },
    algorithm: mode === 'dark' ? undefined : undefined,
  };
};
