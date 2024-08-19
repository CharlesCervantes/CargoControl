import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '../../../../../styles/themes.css'

export const container = style({
  color: vars.colors.color,
  backgroundColor: 'white',
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  overflow: 'auto',
})

export const h1 = style({
  fontSize: '40px',
  fontWeight: '500',
})

export const tableContainer = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '2rem',
  backgroundColor: 'var(--white)',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'var(--border)',
  borderRadius: '0.5rem',
  padding: '1rem',
  textAlign: 'center',
})

export const td = style({
  backgroundColor: vars.colors.gray100,
  padding: '0.5rem',
})

export const th = style({
  paddingRight: '1rem',
  paddingBottom: '0.5rem',
})

export const searchText = style({
  'borderStyle': 'solid',
  'borderColor': vars.colors.principal,
  'borderRadius': '0.4rem',
  'borderWidth': '1px',
  'padding': '0.3rem',
  'fontWeight': '100',
  '::placeholder': {
    color: vars.colors.gray400,
    fontWeight: '200',
    textAlign: 'left',
  },
})

export const btnavegationMainContainer = style({
  paddingTop: '0.3rem',
  backgroundColor: 'white',
  paddingLeft: '1rem',
})

export const btnavegationContainer = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
})
export const btnavegationContainer1 = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
})
export const btnavegationContainer2 = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
})

export const currentPage = style({
  display: 'flex',
})

export const buttonNavegation = style({
  'backgroundColor': vars.colors.items,
  'marginRight': '0.4rem',
  'borderStyle': 'solid',
  'borderWidth': '1px',
  'borderColor': vars.colors.principal,
  'borderRadius': '5px',
  'padding': '0.2rem',
  ':active': {
    backgroundColor: vars.colors.principal,
  },
  ':hover': {
    cursor: 'pointer',
  },
})

export const pageSelector = style({
  display: 'flex',
  alignItems: 'center',
})

export const input = style({
  'display': 'flex',
  'borderStyle': 'solid',
  'borderWidth': '1px',
  'borderRadius': '5px',
  'height': '1.6rem',
  'width': '1.1rem',
  ':focus': {
    borderColor: vars.colors.principal,
  },
})

export const select = style({
  marginLeft: '1rem',
  borderColor: vars.colors.principal,
  fontFamily: '-apple-system , BlinkMacSystemFont , Segoe UI , Roboto , Helvetica , Arial , sans-serif , Apple Color Emoji , Segoe UI Emoji',
  fontSize: '1rem',
  borderStyle: 'solid',
  borderRadius: '0.4rem',
  borderWidth: '1px',
  padding: '0.3rem',
})

export const principalRow = style({
  backgroundColor: vars.colors.principal,
})

export const whiteRow = style({
  backgroundColor: 'white',
})
