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
  color: vars.colors.color,
})

export const loaderDiv = style({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
})

export const botonesPersonalizados = style({
  'fontSize': '1.2em',
  'width': '50px',
  'backgroundColor': vars.colors.principal,
  'color': 'white',
  'margin': '5px',
  'padding': '5px',
  'height': '2.5rem',
  'borderRadius': '10px',
  'textAlign': 'center',
  ':hover': {
    border: 'solid 2px #8080c2',
    cursor: 'pointer',
  },
})

export const buttonMantine = style({
  backgroundColor: vars.colors.principal,
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
})

export const divisorContainer = style({
  display: 'flex',
  overflowY: 'scroll',
  justifyContent: 'center',
})

export const containerLeft = style({
  width: '80%',
})

export const ubicacionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const divsInputs = style({
  marginBottom: '10px',
  display: 'block',
})

export const header = style({
  fontSize: '1.2em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const p = style({
  fontSize: '1.1em',
})

export const date = style({
  display: 'inline',
  backgroundColor: vars.colors.principal,
  borderRadius: '999999px',
  padding: '5px',
})

export const input = style({
  'width': '100%',
  'alignItems': 'center',
  'justifyContent': 'center',
  'borderRadius': '4px',
  'fontSize': '1.2rem',
  'lineHeight': '1',
  'border': '2px solid',
  'borderColor': vars.colors.principal,
  'height': '35px',
  ':hover': {
    boxShadow: '1px 1px 1px #666565',
    cursor: 'pointer',
  },
})

export const label = style({
  fontFamily: 'Lato , sans-serif',
  fontSize: '1.2em',
})

export const contentForm = style({
  // margin: '20px',
})

export const inputForm = style({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  fontSize: '1.2rem',
  lineHeight: '1',
  border: '2px solid #c3c3c3',
  height: '35px',
})

export const textArea = style({
  width: '100%',
  overflowX: 'hidden',
  alignItems: 'center',
  outline: 'none',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 10px',
  fontSize: '1.2rem',
  lineHeight: '1',
  border: '2px solid #c3c3c3',
  wordWrap: 'break-word',
})

export const dateContainer = style({
  padding: '20px',
  fontSize: '1rem',
})

export const buttonContainer2 = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '25px',
})

export const buttonDiv = style({
  width: '45%',
})

export const styleGray = style({
  'width': '100%',
  'backgroundColor': vars.colors.gray400,
  'color': vars.colors.white,
  'border': '1px solid',
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

export const button = style({
  'width': '100%',
  'backgroundColor': vars.colors.principal,
  'color': vars.colors.white,
  'border': '1px solid',
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

export const buttonDisabled = style({
  'width': '100%',
  'backgroundColor': 'gray',
  'color': 'white',
  'border': '1px solid',
  'borderColor': vars.colors.principal,
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
  'width': '100%',
  'border': '2px solid',
  'borderColor': vars.colors.principal,
  'color': vars.colors.color,
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

export const containerRight = style({
  display: 'flex',
  // flexGrow: '2',
  width: '60%',
  gap: '1rem',
  padding: '1rem',
  overflowY: 'auto',
  overflow: 'hidden',
})

export const existing = style({
  flexGrow: '5',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  overflowY: 'auto',
})

export const existingItem = style({
  // maxWidth: '600px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: vars.colors.add,
  borderRadius: '1rem',
  padding: '0.5rem',
  gap: '0.5rem',
  border: 'solid 1px',
  borderColor: vars.colors.principal,
  boxShadow: '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)',
})

export const reportDiv = style({
  wordWrap: 'break-word',
  wordBreak: 'break-word',
})

export const flexGrow = style({
  flexGrow: '1',
})

export const flexx = style({
  display: 'flex',
})

export const flexx2 = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})

export const flexx3 = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '2px solid',
  borderColor: vars.colors.principal,
  borderRadius: '10px',
  marginTop: '5px',
  marginBottom: '5px',
})

export const iconReport = style({
  marginRight: '1rem',
  padding: '0.5rem',
  fontSize: '3rem',
  color: 'black',
  backgroundColor: vars.colors.items,
  borderRadius: '100%',
})

export const typeLetter = style({
  fontWeight: 'bold',
  display: 'inline',
  padding: '2px',
})

export const iconTrash = style({
  'padding': '0.5rem',
  'fontSize': '2.5rem',
  'backgroundColor': vars.colors.red100,
  'color': vars.colors.red600,
  'borderRadius': '999999px',
  ':hover': {
    boxShadow: '0px 2px 2px black',
  },
})

export const iconTrash2 = style({
  'padding': '0.2rem',
  'fontSize': '1.8rem',
  'backgroundColor': vars.colors.red100,
  'color': vars.colors.red600,
  'borderRadius': '999999px',
  ':hover': {
    boxShadow: '0px 2px 2px black',
  },
})

export const borderBottom = style({
  borderBottom: '2px solid var(--regMoradoClaro)',
})

export const badge = style({
  display: 'flex',
  backgroundColor: vars.colors.items,
  color: vars.colors.color,
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '999999px',
  padding: '4px',
  flexWrap: 'wrap',
  alignContent: 'space-around',
})

export const saveContainer = style({
  display: 'flex',
  flex: '1',
  justifyContent: 'flex-end',
  position: 'fixed',
  bottom: '0',
  right: '0',
})

export const save = style({
  'display': 'block',
  'padding': '15px',
  'marginBottom': '35px',
  'marginRight': '45px',
  'border': '3px solid',
  'borderColor': vars.colors.principal,
  'color': vars.colors.principal,
  'textAlign': 'center',
  'fontSize': '2rem',
  'borderRadius': '6px',
  'transition': 'all 300ms ease',
  ':hover': {
    boxShadow: '1px 1px 7px black',
    cursor: 'pointer',
  },
})

export const elementosContainer = style({
  display: 'flex',
})

export const elementosContainerCamera = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '10px',
})

export const displayNo = style({
  display: 'none',
})
