import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/themes.css'

export const save = style({
  'display': 'block',
  'padding': '5px',
  'border': '3px solid',
  'borderColor': vars.colors.principal,
  'textAlign': 'center',
  'fontSize': '2rem',
  'borderRadius': '6px',
  'transition': 'all 300ms ease',
  'overflow': 'hidden',
  'alignItems': 'center',
  ':hover': {
    cursor: 'pointer',
  },
})

export const buttonDiv = style({
  display: 'flex',
  color: vars.colors.principal,
  fontSize: '1.3em',
})

export const color = style({
  color: vars.colors.principal,
})
