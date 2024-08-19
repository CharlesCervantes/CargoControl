import { globalStyle, style } from '@vanilla-extract/css'
import { darkThemeClass, vars } from '../../../../styles/themes.css'

export const container = style({
  color: vars.colors.color,
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  overflow: 'auto',
})

globalStyle(`${darkThemeClass} .${container}`, {
  color: vars.colors.white,
})

export const header = style({
  fontSize: '1.2em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const addTitle = style({
  fontSize: '1.5rem',
  fontWeight: '500',
})

export const enterContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: vars.colors.principal,
  color: 'white',
  borderRadius: '999999px',
  padding: '7px',
  fontSize: '1em',
})

export const p = style({
  fontSize: '1.1em',
})

export const wrapper = style({
  minHeight: '100%',
  width: '100%',
  fontSize: '13px',
  justifyContent: 'center',
  textAlign: 'center',
})

export const tableContainer = style({
  border: '1px solid gray',
  color: vars.colors.color,
  borderRadius: '0.5rem',
  padding: '1rem',
  overflow: 'auto',
})

export const td = style({
  backgroundColor: vars.colors.add,
  padding: '0.5rem',
  textAlign: 'center',
  borderBottom: '1px solid gray',
})

export const th = style({
  // paddingBottom: '0.5rem',
  padding: '0.5rem',
})

export const searchText = style({
  border: '1px solid var(--regMoradoClaro)',
  padding: '0.3rem',
  borderRadius: '0.4rem',
})

export const select = style({
  border: '1px solid var(--regMoradoClaro)',
  borderRadius: '0.5rem',
  backgroundColor: 'var(--regMorado)',
  padding: '0.5rem',
  color: 'white',
})

export const navegationContainer = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '0.5rem',
})

export const backgroundTable = style({
  backgroundColor: vars.colors.add,
})

globalStyle(`${darkThemeClass} .${backgroundTable}`, {
  backgroundColor: vars.colors.add,
})
