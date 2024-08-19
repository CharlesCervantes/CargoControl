// ModalWithTheme.tsx
import { blueThemeClass, darkThemeClass, lightThemeClass } from './themes.css'

function convertTheme(vanillaTheme: any) {
  const colors = {
    principal: vanillaTheme.colors.principal,
    body: vanillaTheme.colors.body,
    background: vanillaTheme.colors.background,
    add: vanillaTheme.colors.add,
    sidebar: vanillaTheme.colors.sidebar,
    color: vanillaTheme.colors.color,
  }

  return {
    colorScheme: 'light',
    colors,
  }
}

export const lightTheme = convertTheme(lightThemeClass)
export const darkTheme = convertTheme(darkThemeClass)
export const blueTheme = convertTheme(blueThemeClass)
