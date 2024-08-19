import { createTheme, createThemeContract } from '@vanilla-extract/css'

const SYSTEM_FONT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const colors = {
  black: '#000',
  white: '#fff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d',
  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#15803d',
  green800: '#166534',
  green900: '#14532d',
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',
  orange100: '#ffa031',
  orange200: '#ff9524',
  orange300: '#ff8a16',
  orange400: '#ff8000',
  orange500: '#f27600',
  orange600: '#e66b00',
  orange700: '#d96100',
  turquesa100: '#81e5dc',
  turquesa200: '#75d9d0',
  turquesa300: '#69cdc5',
  turquesa400: '#5dc1b9',
  turquesa500: '#51b5ae',
  turquesa600: '#44aaa2',
  turquesa700: '#369e97',
  regMorado: '#8386F0',
  regMoradoClaro: '#8387f02e',
  regMoradoDark: '#4a4f8b',
  regMoradoClaroDark: '#8387f00e',
  principalBlue: '#3A8FF0',
}

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1200px',
}

export const vars = createThemeContract({
  colors: {
    principal: '',
    body: '',
    background: '',
    add: '',
    sidebar: '',
    color: '',
    mainColor: '',
    items: '',
    ...colors,
  },
  font: {
    body: '',
  },
  fontSize: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
  },
  space: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
  },
  boxShadow: {
    sm: '',
    md: '',
    lg: '',
  },
  radii: {
    sm: '',
    md: '',
    full: '',
  },
})

const commonVars = {
  font: {
    body: SYSTEM_FONT_STACK,
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
  },
  fontSize: {
    xs: '0.8rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  radii: {
    sm: '0.2rem',
    md: '0.4rem',
    full: '100%',
  },
}

export const lightThemeClass = createTheme(vars, {
  colors: {
    principal: colors.principalBlue,
    body: colors.gray700,
    background: colors.gray100,
    add: colors.white,
    sidebar: colors.white,
    color: colors.black,
    mainColor: colors.white,
    items: colors.regMoradoClaro,
    ...colors,
  },
  ...commonVars,
})

export const darkThemeClass = createTheme(vars, {
  colors: {
    principal: colors.regMoradoDark,
    body: colors.gray300,
    background: colors.gray800,
    add: colors.gray700,
    sidebar: colors.gray300,
    color: colors.white,
    mainColor: colors.black,
    items: colors.regMoradoClaroDark,
    ...colors,
  },
  ...commonVars,
})

export const blueThemeClass = createTheme(vars, {
  colors: {
    principal: colors.blue500,
    body: colors.gray300,
    background: colors.gray100,
    add: colors.white,
    sidebar: colors.white,
    color: colors.black,
    mainColor: colors.white,
    items: colors.blue100,
    ...colors,
  },
  ...commonVars,
})

export const orangeThemeClass = createTheme(vars, {
  colors: {
    principal: colors.orange400,
    body: colors.gray300,
    background: colors.gray200,
    add: colors.white,
    sidebar: colors.orange100,
    color: colors.black,
    mainColor: colors.white,
    items: colors.orange100,
    ...colors,
  },
  ...commonVars,
})

export const turquesaThemeClass = createTheme(vars, {
  colors: {
    principal: colors.turquesa400,
    body: colors.gray300,
    background: colors.gray200,
    add: colors.white,
    sidebar: colors.turquesa100,
    color: colors.black,
    mainColor: colors.white,
    items: colors.turquesa100,
    ...colors,
  },
  ...commonVars,
})
