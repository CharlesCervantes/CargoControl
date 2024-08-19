/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'
import { darkThemeClass, lightThemeClass, vars } from '../../../../../styles/themes.css'

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
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  overflowX: 'auto',
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

export const label = style({
  color: vars.colors.color,
  marginTop: '1rem',
})

globalStyle(`${darkThemeClass} .${label}`, {
  color: vars.colors.white,
})

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '3rem',
  fontWeight: 'bold',
})

export const input = style({
  color: vars.colors.color,
  outlineStyle: 'solid',
  outlineColor: 'black',
  outlineWidth: '1px',
  borderRadius: '5px',
  padding: '0.3rem',
  width: '100%',
})

globalStyle(`${darkThemeClass} .${input}`, {
  outlineColor: vars.colors.white,
})

export const twoColumns = style({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
})

export const name = style({
  display: 'flex',
  flexDirection: 'column',
})

export const phone = style({
  marginTop: '1rem',
  width: '100%',
})

export const password = style({
  marginTop: '1rem',
  width: '100%',
})

export const passwordInput = style({
  position: 'relative',
})

export const icon = style({
  'position': 'absolute',
  'left': '91%',
  'color': vars.colors.color,
  'right': '5%',
  'bottom': '27%',
  ':hover': {
    cursor: 'pointer',
  },
})

export const userNameRole = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  gap: '2rem',
})

export const userName = style({
  width: '50%',
})

export const roleInput = style({
  'marginRight': '0.3rem',
  'padding': '4px',
  'height': '10px',
  'width': '10px',
  'borderRadius': '50%',
  'backgroundColor': vars.colors.gray300,
  ':checked': {
    backgroundColor: vars.colors.principal,
  },
  ':hover': {
    cursor: 'pointer',
  },
})

export const roleLabel = style({
  'color': vars.colors.color,
  'margin': '0',
  'marginRight': '1.2rem',
  ':hover': {
    cursor: 'pointer',
  },
})

globalStyle(`${darkThemeClass} .${roleLabel}`, {
  color: vars.colors.white,
})

export const button = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '2rem',
})

export const buttonn = style({
  'height': '40px',
  'width': '25%',
  'fontFamily': 'Lato , sans-serif',
  'backgroundColor': vars.colors.principal,
  'fontWeight': '700',
  'color': 'white',
  'border': 'none',
  'borderRadius': '5px',
  'textAlign': 'center',
  ':active': {
    transform: 'translateY(1px)',
    backgroundColor: vars.colors.green100,
  },
  ':hover': {
    cursor: 'pointer',
    boxShadow: '1px',
  },
})

export const main = style({
  width: '100%',
  height: '80vh',
  // backgroundColor: 'blueviolet',
})

globalStyle(`${darkThemeClass} .${buttonn}`, {
  backgroundColor: vars.colors.regMoradoDark,
})
