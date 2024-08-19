import { globalKeyframes, style } from '@vanilla-extract/css'
import { vars } from '../../styles/themes.css'

globalKeyframes('overlayShow', {
  from: {
    opacity: '0',
  },

  to: {
    opacity: '1',
  }

  ,
})

globalKeyframes('contentShow', {
  from: {
    opacity: '0',
    transform: 'translate(-50%,-48%) scale(0.96)',
  },

  to: {
    opacity: '1',
    transform: 'translate(-50%,-50%) scale(1)',
  }

  ,
})

export const dialogDescription = style({
  margin: '10px 0 20px',
  fontSize: '15px',
  lineHeight: '1.5',
})

export const dialogTitle = style({
  textAlign: 'center',
  fontFamily: 'Lato , sans-serif',
  marginBottom: '20px',
  fontWeight: '500',
  fontSize: '1.5em',
  paddingBottom: '10px',
  backgroundColor: vars.colors.principal,
  border: 'none',
  borderRadius: '999999px',
  padding: '10px',
  color: 'white',
})

export const fieldset = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  marginBottom: '15px',
})

export const iconButton = style({

  'fontFamily': 'inherit',
  'borderRadius': '100%',
  'height': '25px',
  'width': '25px',
  'display': 'inline-flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'color': `${vars.colors.gray800}`,
  'position': 'absolute',
  'top': '10px',
  'right': '10px',
  ':focus': {
    boxShadow: '0 0 0 2px`',
  },
})

export const controlAcceso = style({
  fontSize: '1rem',
})

export const itemOperador = style({
  'width': '-webkit-fill-available;',
  'marginBottom': '10px',
  'fontSize': '1.5em',
  'backgroundColor': vars.colors.principal,
  'color': 'white',
  'height': '5rem',
  'borderRadius': '10px',
  'textAlign': 'center',
  'border': 'solid 2px rgba(163,163,163,0)',
  ':hover': {
    border: 'solid 2px #8080c2',
    cursor: 'pointer',
  },
})

export const label = style({
  fontFamily: 'Lato , sans-serif',
  fontSize: '1.2em',
  textAlign: 'right',
  marginRight: '10px',
})

export const labelCurp = style({
  fontFamily: 'Lato , sans-serif',
  fontSize: '1.2em',
  marginRight: '7%',
})

export const divs = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  marginBottom: '15px',
})

export const input = style({
  // marginBottom: '10px',
  width: '90%',
  // flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: '1',
  border: '2px solid #cacaca',
  height: '35px',
})

export const inputSearch = style({
  marginBottom: '10px',
  width: '90%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: '1',
  height: '35px',
  border: '2px solid',
  borderColor: vars.colors.principal,
})

export const saveContainer = style({
  display: 'flex',
  justifyItems: 'center',
  justifyContent: 'space-between',
})

export const button = style({
  'backgroundColor': vars.colors.principal,
  'border': '2px solid',
  'borderColor': vars.colors.principal,
  'color': 'white',
  'width': '40%',
  'borderRadius': '4px',
  'padding': '0 15px',
  'fontSize': '15px',
  'textAlign': 'center',
  'lineHeight': '1',
  'fontWeight': '3em',
  'height': '35px',
  ':hover': {
    boxShadow: '1px 1px 1px #666565',
    cursor: 'pointer',
  },
})

export const closeButton = style({
  'border': '2px solid',
  'borderColor': vars.colors.principal,
  'color': vars.colors.principal,
  'width': '40%',
  'marginRight': '5px',
  'borderRadius': '4px',
  'padding': '0 15px',
  'fontSize': '15px',
  'textAlign': 'center',
  'lineHeight': '1',
  'fontWeight': '3em',
  'height': '35px',
  ':hover': {
    boxShadow: '1px 1px 1px #666565',
    cursor: 'pointer',
  },
})

export const spanT = style({
  fontSize: '1rem',
})
