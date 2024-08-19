import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/themes.css'

export const addUserContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  fontFamily: '-apple-system , BlinkMacSystemFont , Segoe UI , Roboto , Helvetica , Arial , sans-serif , Apple Color Emoji , Segoe UI Emoji',
  padding: '2rem',
  color: 'black',
})

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

export const wrapper = style({
  minHeight: '100%',
  width: '100%',
  fontSize: '13px',
  justifyContent: 'center',
  textAlign: 'center',
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

export const buttonContainer = style({
  display: 'flex',
  gap: '1rem',
  width: '100%',
  justifyContent: 'center',
  marginTop: '1rem',
  marginBottom: '1rem',
})

export const listContainer = style({
  display: 'flex',
  justifyContent: 'center',
  overflowY: 'auto',
})
