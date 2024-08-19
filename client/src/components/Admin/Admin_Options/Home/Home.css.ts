import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/themes.css'

export const container = style({
  flexGrow: '1',
  minHeight: '100%',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  overflowY: 'auto',
})

export const dashContainer = style({
  display: 'flex',
  flexDirection: 'column',
  height: '-webkit-fill-available',
  flexGrow: '1',
})

export const topContainer = style({
  'display': 'flex',
  'flexGrow': '1',
  'justifyContent': 'space-between',
  'padding': '1rem',
  '@media': {
    'screen and (max-width: 730px)': {
      flexDirection: 'column',
    },
  },
})

export const topContainerDash1 = style({
  display: 'flex',
  width: '-webkit-fill-available',
})

export const topContainerDash = style({
  'display': 'flex',
  'width': '-webkit-fill-available',
  '@media': {
    'screen and (max-width: 730px)': {
      marginTop: '10px',
    },
  },
})

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
  width: '-webkit-fill-available',
  padding: '0.7rem',
  marginRight: '10px',
  borderRadius: '10px',
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

////////////////////////////////////

export const downContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: '10',
  width: '100%',
  '@media': {
    'screen and (max-width: 1100px)': {
      flexDirection: 'column-reverse',
    },
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

export const chartConatiner = style({
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  justifyContent: 'center',
  alignItems: 'center',
})

export const titleP = style({
  display: 'flex',
  fontSize: 'larger',
  fontWeight: 'bold',
  justifyContent: 'center',
})

export const verticalChartContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  justifyContent: 'center',
})

export const incidentContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '1rem',
  paddingLeft: '1rem',
  paddingBottom: '1rem',
})
