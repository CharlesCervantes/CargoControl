import { globalStyle, style } from '@vanilla-extract/css'
import { darkThemeClass, lightThemeClass, vars } from '../../styles/themes.css'

export const pageContainer = style({
  fontFamily: vars.font.body,
  backgroundColor: vars.colors.background,
  color: vars.colors.body,
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: vars.fontSize.md,
})

export const sideBarContainer = style({
  backgroundColor: vars.colors.sidebar,
  fontSize: '1.5em',
  color: vars.colors.black,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  // padding: '1rem',
  justifyContent: 'space-between',
  overflow: 'hidden',
  minWidth: 'fit-content',
})

globalStyle(`${darkThemeClass} .${sideBarContainer}`, {
  color: vars.colors.white,
  backgroundColor: vars.colors.add,
})

export const sidebarCerrado = style({
  width: 'auto',
})

export const registegic = style({
  fontSize: '1em',
})

export const headerLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  marginBottom: '2rem',
})

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray200,
      borderRadius: '5px',
    },
  },
})

export const linkActivo = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: vars.colors.gray200,
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '5px',
})

export const linkSelect = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray200,
      borderRadius: '5px',
    },
  },
})

export const linkB = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  color: vars.colors.principal,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray200,
      borderRadius: '5px',
    },
  },
})

export const linkBEnter = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  color: vars.colors.green400,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray200,
      borderRadius: '5px',
    },
  },
})

export const linkBExit = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  color: vars.colors.red400,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray200,
      borderRadius: '5px',
    },
  },
})

export const linkBB = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  color: vars.colors.color,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray200,
      borderRadius: '5px',
    },
  },
})

export const linkActivoB = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: vars.colors.gray200,
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '5px',
  color: vars.colors.principal,
})

export const linkActivoBExit = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: vars.colors.gray200,
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '5px',
  color: vars.colors.red400,
})

export const linkActivoBEnter = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: vars.colors.gray200,
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '5px',
  color: vars.colors.green400,
})

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0.25rem 0.5rem',
  gap: '0.5rem',
})

export const email = style({
  fontSize: '1.2rem',
})

export const flexGrow = style({
  flexGrow: 1,
})

export const logo = style({
  height: '2rem',
  cursor: 'pointer',
})

export const icon = style({
  width: '1em',
})

export const iconEnter = style({
  width: '1em',
  color: vars.colors.green400,
})

export const iconExit = style({
  width: '1em',
  color: vars.colors.red400,
})

export const iconClose = style({
  width: '1em',
  color: 'var(--regMorado)',
})

export const menuContent = style({
  display: 'none',
  position: 'relative',
  left: '0',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  padding: '10px',
})

export const linkCerrado = style({
  paddingLeft: 0,
  justifyContent: 'center',
})

export const linkSelectCerrado = style({
  // paddingLeft: 0,
  justifyContent: 'left',
})

export const iconCerrado = style({
  marginRight: 0,
})

export const textoCerrado = style({
  display: 'none',
})

export const texto = style({
  display: 'none',
})

export const themeContainer = style({
  display: 'flex',
  justifyContent: 'center',
})

export const switchStyle = style({
  width: '40px',
  height: '25px',
  backgroundColor: '#4b5563',
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: '50px',
  padding: '2.5px',
  cursor: 'pointer',
  marginBottom: '10px',

  selectors: {
    "&[data-isOn='true']": {
      justifyContent: 'flex-end',
      backgroundColor: '#e5e7eb',
    },
  },
})

export const handleStyle = style({
  width: '20px',
  height: '20px',
  backgroundColor: '#1f2937',
  borderRadius: '20px',
})
