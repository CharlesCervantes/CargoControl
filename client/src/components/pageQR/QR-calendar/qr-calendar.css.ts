import { globalStyle, style } from '@vanilla-extract/css'
import { blueThemeClass, darkThemeClass, lightThemeClass, vars } from '../../../styles/themes.css'

export const container = style({
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
})
