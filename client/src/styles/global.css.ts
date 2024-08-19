import { globalStyle } from '@vanilla-extract/css'
import { vars } from './themes.css'

// https://www.youtube.com/shorts/2lyDv0wOQuQ
// https://www.lekoarts.de/javascript/writing-performant-css-with-vanilla-extract

globalStyle('html, body', {
  height: '100%',
  backgroundColor: vars.colors.background,
})

globalStyle('body', {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('button', {
  cursor: 'pointer',
})

// globalStyle('#root', {
//   isolation: 'isolate',
// })