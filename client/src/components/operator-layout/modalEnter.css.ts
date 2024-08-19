import { globalKeyframes, globalStyle, style } from '@vanilla-extract/css'
import { darkThemeClass, vars } from '../../styles/themes.css'

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

export const modal = style({
  backgroundColor: 'white',
})

globalStyle(`${darkThemeClass} .${modal}`, {
  backgroundColor: vars.colors.add,
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

export const fieldsetSelect = style({
  display: 'flex',
  gap: '20px',
  width: '100%',
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

export const textInputContainer = style({ /* prueba boton salida */

  display: 'flex',
  justifyContent: 'space-between',
})

export const textInputRow = style({ /* prueba boton salida */

  width: '45%',
  marginRight: '10px',
  marginBottom: '10px',
})

export const input = style({

  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: '1',
  border: '2px solid #cacaca',
  height: '35px',
})

export const inputOption = style({
  fontFamily: 'Lato , sans-serif',
  fontSize: '1.2em',
  borderBottom: '2px solid #d84444',
  cursor: 'pointer',
})

export const inputSelect = style({
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: '1',
  border: '2px solid #cacaca',
  height: '35px',
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
  width: '90px',
  textAlign: 'right',
})

export const labelTheme = style({
  fontFamily: 'Lato , sans-serif',
  fontSize: '1.2em',
})

export const saveContainer = style({
  display: 'flex',
  justifyItems: 'center',
  justifyContent: 'space-between',
  marginTop: '15px',
})

export const saveContainerChecklist = style({
  display: 'flex',
  width: '400px',
  justifyItems: 'center',
  justifyContent: 'center',
  marginTop: '15px',
})

export const saveContainerTheme = style({
  display: 'flex',
  justifyContent: 'space-around',
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

export const iconEdit = style({
  'padding': '0.5rem',
  'fontSize': '2.2rem',
  'backgroundColor': vars.colors.blue100,
  'color': vars.colors.blue600,
  'borderRadius': '999999px',
  ':hover': {
    boxShadow: '0px 2px 2px black',
  },
})

export const removeButton = style({
  'backgroundColor': '#d00000',
  'padding': '1rem',
  'borderRadius': '0.5rem',
  'fontFamily': 'Lato',
  'color': 'white',
  ':hover': {
    transform: 'translateY(1px)',
    backgroundColor: '#9d0208',
  },
})

export const checklistButtons = style({
  backgroundColor: vars.colors.principal,
  padding: '10px',
  borderRadius: '5px',
  color: 'white',
  boxShadow: '2px 2px gray',
})

export const checkBoxContainer = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  padding: '10px',
})

export const required = style({
  color: '#d84444',
})

export const photoContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  height: 'auto',
  marginTop: '10px',
})

export const imageContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

export const imagePreview = style({
  width: '50%',
  height: 'auto',
  maxWidth: '100%',
  borderRadius: '20px',
})

export const imageButton = style({
  marginTop: '10px',
  width: '50%',
})
