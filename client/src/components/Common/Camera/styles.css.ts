import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/themes.css'

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

export const imagesContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const image = style({
  width: '50px',
  height: '50px',
  borderRadius: '10px',
})

export const images = style({
  display: 'flex',
})

// ShowCamera

export const container = style({
  display: 'flex',
  flexDirection: 'column',
})

export const captures = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const divChangeCameraButton = style({
  display: 'flex',
  position: 'fixed',
  width: '95%',
  justifyContent: 'space-between',
})

export const iconRepeat = style({
  backgroundColor: '#0000006b',
  color: vars.colors.white,
  fontSize: '2.7rem',
  borderRadius: '10px',
  margin: '1rem',
})

export const iconTake = style({
  backgroundColor: '#fffffff7',
  color: vars.colors.color,
  fontSize: '2.7rem',
  borderRadius: '10px',
  margin: '1rem',
})

export const divTakeCameraButton = style({
  display: 'flex',
  position: 'fixed',
  width: '95%',
  justifyContent: 'center',
})

export const divCameraButton = style({
  display: 'flex',
  position: 'fixed',
  width: '95%',
  justifyContent: 'space-between',
})

export const containerCarousel = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
})

export const carousel = style({
  maxWidth: '500px',
})

export const deleteIcon = style({
  color: vars.colors.red700,
  fontSize: '2.3rem',
  padding: '0.3rem',
  borderRadius: '999999px',
  border: '2px solid',
  borderColor: vars.colors.red700,
  margin: '1rem',
  right: '8px',
  zIndex: '1',
  position: 'absolute',
})

export const buttonMantine = style({
  backgroundColor: vars.colors.principal,
})

export const containerButton = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingTop: '10px',
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
