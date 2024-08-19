import { globalStyle } from '@vanilla-extract/css'

/***
    The new CSS reset - version 1.8.3 (last updated 21.1.2023)
    GitHub page: https://github.com/elad2412/the-new-css-reset
***/

/*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
 */
globalStyle('*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *))', {
  all: 'unset',
  display: 'revert',
})

/* Preferred box-sizing value */
globalStyle('*, *::after, *::before', {
  boxSizing: 'border-box',
})

/* Reapply the pointer cursor for anchor tags */
globalStyle('a, button', {
  cursor: 'revert',
})

globalStyle('button', {
  cursor: 'revert',
})

/* Remove list styles (bullets/numbers) */
globalStyle('ol, ul, menu', {
  listStyle: 'none',
})

/* For images to not be able to exceed their container */
globalStyle('img', {
  maxInlineSize: '100%',
  maxBlockSize: '100%',
})

/* Removes spacing between cells in tables */
globalStyle('table', {
  borderCollapse: 'collapse',
})

/* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
globalStyle('input, textarea', {
  WebkitUserSelect: 'auto',
})

/* Revert the 'white-space' property for textarea elements on Safari */
globalStyle('textarea', {
  whiteSpace: 'revert',
})

/* minimum style to allow to style meter element */
globalStyle('meter', {
  WebkitAppearance: 'revert',
  appearance: 'revert',
})

/* preformatted text - use only for this feature */
globalStyle('pre', {
  all: 'revert',
})

/* reset default text opacity of input placeholder */
globalStyle('::placeholder', {
  color: 'unset',
})

/* remove default dot (•) sign */
globalStyle('::marker', {
  content: 'initial',
})

/* fix the feature of 'hidden' attribute.
   display:revert; revert to element instead of attribute */
globalStyle(':where([hidden])', {
  display: 'none',
})

/* revert for bug in Chromium browsers
   - fix for the content editable attribute will work properly.
   - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element */
globalStyle(':where([contenteditable]:not([contenteditable="false"]))', {
  MozUserModify: 'read-write',
  WebkitUserModify: 'read-write',
  overflowWrap: 'break-word',
  // WebkitLineBreak: 'after-white-space', // FIXME: Not available in CSSType
  WebkitUserSelect: 'auto',
})

/* apply back the draggable feature - exist only in Chromium and Safari */
globalStyle(':where([draggable="true"])', {
//   'WebkitUserDrag': 'element'  // FIXME: Not available in CSSType https://github.com/frenic/csstype/issues/171
})

/* Revert Modal native behavior */
globalStyle(':where(dialog:modal)', {
  all: 'revert',
})