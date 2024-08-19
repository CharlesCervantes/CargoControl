import { globalStyle, style } from '@vanilla-extract/css'
import { blueThemeClass, darkThemeClass, lightThemeClass, vars } from '../../../styles/themes.css'

export const toggleIcon = style({
  padding: '1rem',
  fontSize: '4rem',
  transition: 'transform 0.1s',
  selectors: {
    '&:active': {
      transform: 'scale(1.1)',
    },
  },
})

export const container = style({
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
})

export const email = style({
  borderRadius: '999999px',
  backgroundColor: '#c2c2c27e',
  padding: '5px',
})

export const content = style({
  display: 'flex',
  flexGrow: '2',
  gap: '1rem',
  padding: '1rem',
  overflowY: 'auto',
  overflowX: 'hidden',
})

export const existing = style({
  flexGrow: '5',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  overflowY: 'auto',
  overflowX: 'hidden',
})

export const loader = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const add = style({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  borderRadius: '1rem',
  backgroundColor: vars.colors.add,
})

export const actions = style({
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingLeft: '1rem',
  borderRadius: '2rem',
})
