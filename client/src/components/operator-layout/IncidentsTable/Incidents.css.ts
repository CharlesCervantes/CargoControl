import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/themes.css'

export const container = style({
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  overflow: 'auto',
})

export const header = style({
  fontSize: '1.2em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const enterConatiner = style({
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
  backgroundColor: vars.colors.background,
  minHeight: '100%',
  width: '100%',
  fontSize: '13px',
  justifyContent: 'center',
  textAlign: 'center',
})

export const tableContainer = style({
  backgroundColor: vars.colors.add,
  border: '1px solid gray',
  borderRadius: '0.5rem',
  padding: '1rem',
  overflow: 'auto',
})

export const td = style({
  backgroundColor: vars.colors.add,
  color: vars.colors.color,
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
