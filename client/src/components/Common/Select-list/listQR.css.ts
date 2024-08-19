/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalKeyframes, style } from '@vanilla-extract/css'

export const inputOption = style({
  fontFamily: 'Lato , sans-serif',
  fontSize: '1.2em',
  borderBottom: '2px solid #d84444',
  cursor: 'pointer',
})

export const inputSelect = style({
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '3px',
  marginBottom: '10px',
  width: '100%',
  boxSizing: 'border-box',
  fontSize: '13px',
  color: '#2C3E50',
})

export const required = style({
  color: '#d84444',
})
