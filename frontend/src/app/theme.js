/**
 * MUI Theme Configuration
 * -----------------------
 * Enterprise-grade theme for AI-First CRM.
 * Uses Inter font, professional color palette,
 * and consistent spacing/radius.
 */

import { createTheme } from '@mui/material/styles';

// Design tokens
const tokens = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  borderLight: '#F1F5F9',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',
  radius: 12,
  shadowSoft: '0px 1px 3px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.04)',
  shadowMedium: '0px 4px 6px -1px rgba(0, 0, 0, 0.07), 0px 2px 4px -2px rgba(0, 0, 0, 0.05)',
  shadowLarge: '0px 10px 15px -3px rgba(0, 0, 0, 0.08), 0px 4px 6px -4px rgba(0, 0, 0, 0.04)',
};

/**
 * Creates the MUI theme with light/dark mode support.
 * @param {'light'|'dark'} mode - Theme mode
 * @returns {import('@mui/material').Theme} Configured MUI theme
 */
export const createAppTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.primary,
        light: tokens.primaryLight,
        dark: tokens.primaryDark,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#7C3AED',
        light: '#8B5CF6',
        dark: '#6D28D9',
      },
      background: {
        default: mode === 'light' ? tokens.background : '#0F172A',
        paper: mode === 'light' ? tokens.surface : '#1E293B',
      },
      text: {
        primary: mode === 'light' ? tokens.textPrimary : '#F1F5F9',
        secondary: mode === 'light' ? tokens.textSecondary : '#94A3B8',
      },
      divider: mode === 'light' ? tokens.border : '#334155',
      success: { main: tokens.success },
      warning: { main: tokens.warning },
      error: { main: tokens.error },
      info: { main: tokens.info },
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
      h3: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
      h4: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.4 },
      h5: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
      h6: { fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.5 },
      subtitle1: { fontWeight: 500, fontSize: '0.9375rem', lineHeight: 1.5 },
      subtitle2: { fontWeight: 500, fontSize: '0.8125rem', lineHeight: 1.5 },
      body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
      body2: { fontSize: '0.8125rem', lineHeight: 1.6 },
      button: { fontWeight: 600, fontSize: '0.875rem', textTransform: 'none', letterSpacing: '0.01em' },
      caption: { fontSize: '0.75rem', lineHeight: 1.5, color: tokens.textTertiary },
      overline: { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
    },
    shape: {
      borderRadius: tokens.radius,
    },
    shadows: [
      'none',
      tokens.shadowSoft,
      tokens.shadowSoft,
      tokens.shadowMedium,
      tokens.shadowMedium,
      tokens.shadowMedium,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
      tokens.shadowLarge,
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: tokens.border,
              borderRadius: '3px',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius,
            padding: '10px 24px',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            '&:hover': { transform: 'translateY(-1px)', boxShadow: tokens.shadowMedium },
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'small', fullWidth: true },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: tokens.radius,
              transition: 'all 0.2s ease',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: tokens.primaryLight,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
              },
            },
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius,
            border: `1px solid ${mode === 'light' ? tokens.border : '#334155'}`,
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: '0.75rem',
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${mode === 'light' ? tokens.border : '#334155'}`,
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius,
          },
        },
      },
      MuiSelect: {
        defaultProps: { size: 'small' },
        styleOverrides: {
          root: { borderRadius: tokens.radius },
        },
      },
    },
  });

export default createAppTheme;
