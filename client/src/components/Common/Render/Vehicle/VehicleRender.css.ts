import { globalStyle, style } from '@vanilla-extract/css'
import { darkThemeClass, orangeThemeClass, vars } from '../../../../styles/themes.css'

// Render styles

export const existingItem = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  backgroundColor: vars.colors.add,
  color: vars.colors.color,
  borderRadius: '1rem',
  padding: '0.5rem',
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

export const iconContainer = style({
  display: 'flex',
  width: '-webkit-fill-available',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const existingIcon = style({
  padding: '0.5rem ',
  fontSize: '2.2rem',
  marginRight: '0.5rem',
  backgroundColor: vars.colors.items,
  color: vars.colors.color,
  borderRadius: '999999px',
})

export const trashContainer = style({
  display: 'flex',
})

globalStyle(`${orangeThemeClass} .${existingIcon}`, {
  color: vars.colors.black,
})

export const detailsContent = style({
  display: 'flex',
  flexDirection: 'row',
  width: '-webkit-fill-available',
})

export const flexGrow = style({
  flexGrow: '1',
})

export const flex = style({
  display: 'flex',
})

export const typeLetter = style({
  fontWeight: 'bold',
  display: 'inline',
  padding: '2px',
})

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

export const saveContainer = style({
  display: 'flex',
  justifyItems: 'center',
  justifyContent: 'space-between',
  marginTop: '15px',
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

export const iconTrash = style({
  'marginTop': '0.2rem',
  'padding': '0.5rem',
  'fontSize': '2.2rem',
  'backgroundColor': vars.colors.red100,
  'color': vars.colors.red600,
  'borderRadius': '999999px',
  ':hover': {
    boxShadow: '0px 2px 2px black',
  },
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

globalStyle(`${darkThemeClass} .${iconTrash}`, {
  backgroundColor: vars.colors.red300,
  color: vars.colors.red900,
})

export const badge = style({
  backgroundColor: vars.colors.items,
  color: vars.colors.color,
  border: 'none',
  borderRadius: '999999px',
  padding: '4px',
})
