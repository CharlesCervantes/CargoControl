import { globalStyle, style } from '@vanilla-extract/css'
import { darkThemeClass, orangeThemeClass, vars } from '../../../styles/themes.css'

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

export const item = style({
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'flex-start',
  'backgroundColor': 'white',
  'width': '-webkit-fill-available',
  'padding': '0.7rem',
  'marginRight': '10px',
  'borderRadius': '10px',
  ':hover': {
    cursor: 'pointer',
  },
})

export const itemText = style({
  display: 'flex',
  flexDirection: 'column',
  height: '70%',
  justifyContent: 'space-evenly',
})

export const icon = style({
  fontSize: '2.5rem',
  padding: '0.3rem',
  borderRadius: '999999px',
  backgroundColor: vars.colors.principal,
  color: vars.colors.mainColor,
  '@media': {
    'screen and (max-width: 500px)': {
      fontSize: '2.0rem',
      padding: '0.3rem',
    },
  },
})

export const pItem = style({
  fontSize: 'x-large',
  color: 'black',
  fontWeight: 'bold',
  '@media': {
    'screen and (max-width: 500px)': {
      fontSize: 'small',
    },
  },
})
