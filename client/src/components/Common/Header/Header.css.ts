import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/themes.css'

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

export const email = style({
  borderRadius: '999999px',
  backgroundColor: '#c2c2c27e',
  padding: '5px',
})
