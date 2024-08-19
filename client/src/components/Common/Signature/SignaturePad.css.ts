import { globalKeyframes, style } from '@vanilla-extract/css'
import { vars } from '../../../styles/themes.css'

const blackA = {
  blackA1: '#000000',
  blackA2: '#000000',
  blackA3: '#000000',
  blackA4: '#000000',
  blackA5: '#000000',
  blackA6: '#000000',
  blackA7: '#000000',
  blackA8: '#000000',
  blackA9: '#000000',
  blackA10: '#000000',
  blackA11: '#000000',
  blackA12: '#000000',
}

const violet = {
  violet1: '#fdfcfe',
  violet2: '#fbfaff',
  violet3: '#f5f2ff',
  violet4: '#ede9fe',
  violet5: '#e4defc',
  violet6: '#d7cff9',
  violet7: '#c4b8f3',
  violet8: '#aa99ec',
  violet9: '#6e56cf',
  violet10: '#644fc1',
  violet11: '#5746af',
  violet12: '#20134b',
}

globalKeyframes('overlayShow', {
  from: {
    opacity: '0',
  },
  to: {
    opacity: '1',
  },
})

globalKeyframes('contentShow', {
  from: {
    opacity: '0',
    transform: 'translate(-50%,-48%) scale(0.96)',
  },
  to: {
    opacity: '1',
    transform: 'translate(-50%,-50%) scale(1)',
  },
})

export const dialogTitle = style({
  textAlign: 'center',
  fontFamily: 'Lato , sans-serif',
  marginBottom: '20px',
  fontWeight: '500',
  color: vars.colors.color,
  fontSize: '1.5em',
  paddingBottom: '10px',
  backgroundColor: vars.colors.principal,
  border: 'none',
  borderRadius: '999999px',
  padding: '10px',
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
  'color': 'var(--violet11)',
  'position': 'absolute',
  'top': '10px',
  'right': '10px',
  ':focus': {
    boxShadow: '0 0 0 2px var(--violet7)',
  },
  ':hover': {
    backgroundColor: 'var(--violet4)',
  },
})

export const input = style({
  'width': '100%',
  'flex': '1',
  'display': 'inline-flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'borderRadius': '4px',
  'padding': '0 10px',
  'fontSize': '15px',
  'lineHeight': '1',
  'color': 'var(--violet11)',
  'boxShadow': '0 0 0 1px var(--violet7)',
  'height': '35px',
  ':focus': {
    boxShadow: '0 0 0 2px var(--violet8)',
  },
})

export const iconChecklist = style({
  'marginTop': '0.2rem',
  'padding': '0.5rem',
  'fontSize': '2.2rem',
  'backgroundColor': vars.colors.green100,
  'color': vars.colors.green900,
  'borderRadius': '999999px',
  ':hover': {
    boxShadow: '0px 2px 2px black',
  },
})

export const label = style({
  fontFamily: 'Lato , sans-serif',
  fontSize: '1.2em',
  color: 'var(--violet11)',
  width: '90px',
  textAlign: 'right',
})

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 15px',
  fontSize: '15px',
  lineHeight: '1',
  fontWeight: '500',
  height: '35px',
})

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
})

export const CheckboxRoot = style({
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  selectors: {
    '&:hover': { backgroundColor: violet.violet3 },
    '&:focus': { boxShadow: '0 0 0 1px green' },
  },
})

export const CheckboxIndicator = style({
  color: violet.violet11,
})

export const answers = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const photoButton = style({
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '0.25rem',
  paddingTop: '10px',
  paddingLeft: '5px',
  paddingRight: '5px',
  fontSize: '35px',
  color: 'var(--regMorado)',
  marginLeft: '1rem',
})

export const question = style({
  fontSize: '1.2rem',
  flex: '1',
  marginRight: '1rem',
})

export const questionContainer = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '1rem',
})

export const questionNumber = style({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginRight: '1rem',
})

export const signatureDiv = style({
  padding: '0.5rem',
})

export const signature = style({
  border: ' 2px dashed',
  borderColor: vars.colors.principal,
})

export const saveContainerSignature = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})

export const saveContainer = style({
  display: 'flex',
  width: '100%',
  justifyItems: 'center',
  justifyContent: 'space-between',
  marginTop: '15px',
})

export const saveButton = style({
  'backgroundColor': vars.colors.principal,
  'color': vars.colors.color,
  'width': '40%',
  'border': '1px solid var(--regMoradoClaro)',
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

export const answerButton = style({
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '0.25rem',
  padding: '0.5rem 1rem',
  marginRight: '0.5rem',
})

export const active = style({
  backgroundColor: vars.colors.principal,
  border: '1px solid #ddd',
  borderRadius: '0.25rem',
  padding: '0.5rem 1rem',
  marginRight: '0.5rem',
})

export const deleteIcon = style({
  color: vars.colors.red700,
  fontSize: '2.5rem',
  borderRadius: '999999px',
  border: '3px solid',
  borderColor: vars.colors.red700,
  margin: '1rem',
})

export const checkIcon = style({
  color: vars.colors.green700,
  fontSize: '2.5rem',
  borderRadius: '999999px',
  border: '3px solid',
  borderColor: vars.colors.green700,
  margin: '1rem',
})
