import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/themes.css'

export const container = style({
  flexGrow: '1',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  color: vars.colors.color,
})

export const header = style({
  fontSize: '1.2em',
  padding: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const wrapper = style({
  backgroundColor: vars.colors.background,
  minHeight: '100%',
  width: '100%',
  fontSize: '13px',
  justifyContent: 'center',
  textAlign: 'center',
})

export const label = style({
  fontSize: '1.2em',
  width: '90px',
  textAlign: 'right',
})

export const fieldset = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  marginBottom: '15px',
})

export const input = style({
  width: '40%',
  display: 'inlineFlex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: '1',
  boxShadow: '0 0 0 1px',
  height: '35px',
})

export const badge = style({
  backgroundColor: vars.colors.gray300,
  width: '50%',
  margin: '20px',
  textAlign: 'center',
  fontSize: '1.2em',
  border: 'none',
  borderRadius: '999999px',
  padding: '4px',
})
