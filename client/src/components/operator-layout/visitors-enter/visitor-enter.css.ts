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

export const actions = style({
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingLeft: '1rem',
  borderRadius: '2rem',
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

export const loader = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
