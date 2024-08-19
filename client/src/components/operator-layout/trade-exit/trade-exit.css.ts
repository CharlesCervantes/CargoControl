import { globalStyle, style } from '@vanilla-extract/css'
import { darkThemeClass, lightThemeClass, vars } from '../../../styles/themes.css'

export const container = style({
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
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
  backgroundColor: 'var(--regMorado)',
  color: 'white',
  borderRadius: '999999px',
  padding: '7px',
  fontSize: '1em',
})

globalStyle(`${lightThemeClass} .${enterConatiner}`, {
  backgroundColor: vars.colors.principal,
})

globalStyle(`${darkThemeClass} .${enterConatiner}`, {
  backgroundColor: vars.colors.principal,
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

export const add = style({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  borderRadius: '1rem',
  backgroundColor: 'white',
})

globalStyle(`${lightThemeClass} .${add}`, {
  backgroundColor: vars.colors.add,
})

globalStyle(`${darkThemeClass} .${add}`, {
  backgroundColor: vars.colors.add,
})

export const existingItem = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: vars.colors.white,
  borderRadius: '1rem',
  padding: '0.5rem',
  gap: '0.5rem',
  border: 'solid 1px transparent',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)',
  selectors: {
    '&:focus': {
      border: `solid 1px ${vars.colors.blue300}`,
    },
    '&:hover': {
      cursor: 'pointer',
      border: `solid 1px ${vars.colors.blue500}`,
    },
  },
})

globalStyle(`${lightThemeClass} .${existingItem}`, {
  backgroundColor: vars.colors.add,
})

globalStyle(`${darkThemeClass} .${existingItem}`, {
  backgroundColor: vars.colors.body,
  color: 'black',
})

export const flexGrow = style({
  flexGrow: '1',
})

export const flex = style({
  display: 'flex',
})

export const existingIcon = style({
  padding: '1rem',
  fontSize: '4rem',
  backgroundColor: 'var(--regMoradoClaro)',
  color: 'var(--regMorado)',
  borderRadius: '999999px',
})

globalStyle(`${darkThemeClass} .${existingIcon}`, {
  color: 'black',
})

export const badge = style({
  backgroundColor: 'var(--regMoradoClaro)',
  border: 'none',
  borderRadius: '999999px',
  padding: '4px',
})

globalStyle(`${darkThemeClass} .${badge}`, {
  color: 'black',
})

export const typeLetter = style({
  fontWeight: 'bold',
  display: 'inline',
  padding: '2px',
})

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
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

globalStyle(`${darkThemeClass} .${iconTrash}`, {
  backgroundColor: vars.colors.red300,
  color: vars.colors.red900,
})

export const actions = style({
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingLeft: '1rem',
  borderRadius: '2rem',
})

export const ejemploDiv = style({
  display: 'flex',
  justifyContent: 'center',
})

export const save = style({
  'display': 'block',
  'padding': '5px',
  'border': '3px solid var(--regMorado)',
  'color': 'var(--regMorado)',
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

globalStyle(`${lightThemeClass} .${save}`, {
  borderColor: vars.colors.principal,
  borderWidth: '3px',
  borderStyle: 'solid',
})

globalStyle(`${darkThemeClass} .${save}`, {
  borderColor: vars.colors.principal,
  borderWidth: '3px',
  borderStyle: 'solid',
})

export const buttonDiv = style({
  display: 'flex',
  color: 'var(--regMorado)',
  fontSize: '1.3em',
})

export const loader = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
