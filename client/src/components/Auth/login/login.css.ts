import { globalKeyframes, style } from '@vanilla-extract/css'
import { vars } from '../../../styles/themes.css'

export const all = style({
  boxSizing: 'border-box',
})

export const body = style({
  'background': '#f6f5f7',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'flexDirection': 'column',
  'fontFamily': 'Montserrat , sans-serif',
  'height': '100vh',
  '@media': {
    'screen and (max-width: 850px)': {
      backgroundColor: '#2294b1',
    },
  },
})

export const bodyDemo = style({
  'background': '#f6f5f7',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'flexDirection': 'column',
  'fontFamily': 'Montserrat , sans-serif',
  'height': '100vh',
  '@media': {
    'screen and (max-width: 850px)': {
      backgroundColor: '#7d7ec4bb',
    },
  },
})

export const a = style({
  color: '#333',
  fontSize: '14px',
  textDecoration: 'none',
  margin: '15px 0',
})

export const h1 = style({
  'fontWeight': 'bold',
  'fontSize': '180%',
  'margin': '0',
  '@media': {
    'screen and (max-width: 850px)': {
      fontSize: '140%',
    },
  },
})

export const h2 = style({
  textAlign: 'center',
})

export const p = style({
  'fontSize': '80%',
  'lineHeight': '20px',
  'letterSpacing': '0.5px',
  'margin': '20px 0 30px',
  '@media': {
    'screen and (max-width: 700px)': {
      fontSize: '50%',
      margin: '10px 0 30px',
    },
  },
})

export const span = style({
  fontSize: '12px',
})

export const marginButton = style({
  margin: '10px',
})

export const errorMessage = style({
  margin: '0',
  marginTop: '0.3rem',
  top: '4rem',
  fontSize: '0.7rem',
  fontFamily: 'Lato , sans-serif',
  color: 'red',
})

export const button = style({
  'borderRadius': '20px',
  'border': '1px solid #2294b1',
  'backgroundColor': '#229fbe',
  'color': '#FFFFFF',
  'fontSize': '80%',
  'fontWeight': 'bold',
  'padding': '12px 45px',
  'letterSpacing': '1px',
  'textTransform': 'uppercase',
  'transition': 'transform 80ms ease-in',
  ':active': {
    transform: 'scale(0.95)',
  },
  ':focus': {
    outline: 'none',
  },
  '@media': {
    'screen and (max-width: 700px)': {
      padding: '10px 30px',
      fontSize: '60%',
    },
  },
})

export const buttonDemo = style({
  'borderRadius': '20px',
  'border': '1px solid #7d7ec4',
  'backgroundColor': '#7d7ec4',
  'color': '#FFFFFF',
  'fontSize': '80%',
  'fontWeight': 'bold',
  'padding': '12px 45px',
  'letterSpacing': '1px',
  'textTransform': 'uppercase',
  'transition': 'transform 80ms ease-in',
  ':active': {
    transform: 'scale(0.95)',
  },
  ':focus': {
    outline: 'none',
  },
  '@media': {
    'screen and (max-width: 700px)': {
      padding: '10px 30px',
      fontSize: '60%',
    },
  },
})

export const button2 = style({
  'borderRadius': '20px',
  'border': '1px solid #FFFFFF',
  'backgroundColor': 'transparent',
  'color': '#FFFFFF',
  'fontSize': '80%',
  'fontWeight': 'bold',
  'padding': '12px 45px',
  'letterSpacing': '1px',
  'textTransform': 'uppercase',
  'transition': 'transform 80ms ease-in',
  ':active': {
    transform: 'scale(0.95)',
  },
  ':focus': {
    outline: 'none',
  },
  '@media': {
    'screen and (max-width: 700px)': {
      padding: '10px 30px',
      fontSize: '60%',
    },
  },
})

export const signInContainer = style({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const button3Container = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '10px',
})

export const button3P = style({
  'fontSize': '60%',
  '@media': {
    'screen and (min-width: 850px)': {
      display: 'none',
    },
  },
})

export const button3 = style({
  'borderRadius': '20px',
  'border': '1px solid #2294b1',
  'backgroundColor': '#229fbe',
  'color': '#FFFFFF',
  'fontSize': '40%',
  'fontWeight': 'bold',
  'padding': '8px 20px',
  'letterSpacing': '1px',
  'textTransform': 'uppercase',
  'transition': 'transform 80ms ease-in',
  ':active': {
    transform: 'scale(0.95)',
  },
  ':focus': {
    outline: 'none',
  },
  '@media': {
    'screen and (min-width: 850px)': {
      display: 'none',
    },
  },
})

export const button3Demo = style({
  'borderRadius': '20px',
  'border': '1px solid #7d7ec4',
  'backgroundColor': '#7d7ec4',
  'color': '#FFFFFF',
  'fontSize': '40%',
  'fontWeight': 'bold',
  'padding': '8px 20px',
  'letterSpacing': '1px',
  'textTransform': 'uppercase',
  'transition': 'transform 80ms ease-in',
  ':active': {
    transform: 'scale(0.95)',
  },
  ':focus': {
    outline: 'none',
  },
  '@media': {
    'screen and (min-width: 700px)': {
      display: 'none',
    },
  },
})

export const form = style({
  'backgroundColor': '#FFFFFF',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'flexDirection': 'column',
  'padding': '0 75px',
  'height': '100%',
  'textAlign': 'center',
  '@media': {
    'screen and (max-width: 700px)': {
      padding: '0 50px',
    },
  },
})

export const image = style({
  width: '8%',
  position: 'absolute',
  margin: '10px',
})

export const input2 = style({
  'backgroundColor': '#eee',
  'padding': '12px 15px',
  'margin': '8px 0',
  'width': '100%',
  'borderRadius': '8px',
  'textAlign': 'left',
  '@media': {
    'screen and (max-width: 700px)': {
      padding: '8px 10px',
    },
  },
})

export const container = style({
  'backgroundColor': '#fff',
  'borderRadius': '10px',
  'boxShadow': '0 14px 28px rgba(0,0,0,0.25) , 0 10px 10px rgba(0,0,0,0.22)',
  'position': 'relative',
  'overflow': 'hidden',
  'width': '768px',
  'maxWidth': '100%',
  'minHeight': '480px',
  '@media': {
    'screen and (max-width: 700px)': {
      borderRadius: '0',
    },
  },
})

export const formContainer = style({
  position: 'absolute',
  top: '0',
  height: '100%',
  transition: 'all 0.6s ease-in-out',
})

globalKeyframes('show', {
  '0%,49.99%': {
    opacity: '0',
    zIndex: '1',
  },
  '50%,100%': {
    opacity: '1',
    zIndex: '5',
  },
})

export const overlayPanel = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 40px',
  textAlign: 'center',
  top: '0',
  height: '100%',
  width: '50%',
  transform: 'translateX(0)',
  transition: 'transform 0.6s ease-in-out',
})

export const footer = style({
  position: 'absolute',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
})
