import React, { useContext, useMemo } from 'react'
import { blueThemeClass, darkThemeClass, lightThemeClass, orangeThemeClass, turquesaThemeClass } from './themes.css'

interface ContextThemeType {
  theme: typeof lightThemeClass | typeof darkThemeClass
  changeTheme: (themeName: string) => void
}

const ThemeContext = React.createContext<ContextThemeType>({
  theme: lightThemeClass,
  changeTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<typeof lightThemeClass>(lightThemeClass)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeTheme = (themeName: string) => {
    switch (themeName) {
      case 'light':
        setTheme(lightThemeClass)
        break
      case 'dark':
        setTheme(darkThemeClass)
        break
      case 'blue':
        setTheme(blueThemeClass)
        break
      case 'orange':
        setTheme(orangeThemeClass)
        break
      case 'turquoise':
        setTheme(turquesaThemeClass)
        break
    }
  }

  const contextValue = useMemo(() => {
    return {
      theme,
      changeTheme,
    }
  }, [theme, changeTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
