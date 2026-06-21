/**
 * Component Factory — Design Tokens (TypeScript mirror)
 *
 * This file exists alongside globals.css so components that need
 * token values at render time (e.g. inline styles) can import them
 * from a single typed source. CSS modules reference the .css file
 * directly; JS code references this module.
 */

export const colors = {
  bg: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    tertiary: '#2a2a2a',
    surface: '#1a1a1a',
    elevated: '#2a2a2a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0a0a0',
    tertiary: '#666666',
  },
  brand: {
    primary: '#d4af37',
    light: '#e5c158',
  },
  interactive: {
    default: '#3b82f6',
    hover: '#2563eb',
    active: '#60a5fa',
  },
  status: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  border: {
    default: '#333333',
    light: 'rgba(255, 255, 255, 0.1)',
    medium: '#222222',
  },
} as const;

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '2rem',
  lg: '4rem',
  xl: '6rem',
  '2xl': '8rem',
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
} as const;
