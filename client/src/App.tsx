/* eslint-disable no-console */
import { Suspense, useEffect } from 'react'
import { FirebaseAppProvider } from 'reactfire'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Toaster } from 'react-hot-toast'
import { firebaseConfig } from './firebase'
import { ReactRouter } from './reat-router/'
import { ThemeProvider, useTheme } from './styles/contextTheme'
import { connection } from './env'
import { networkStore } from './zustand/networkStore'
export function App() {
  const { addNetwork } = networkStore()
  const { theme } = useTheme()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  // TODO: meter esta funcion en la carpeta de fetch,
  // estudiar mas el caso de uso de detectar la direccion ip y posibles escenarios de uso para validacion
  useEffect(() => {
    fetch(`${connection}/network/`)
      .then(response => response.json())
      .then((data) => {
        addNetwork(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <ThemeProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Notifications />
          <Toaster
            gutter={24}
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #713200',
                padding: '24px',
                color: '#713200',
              },
            }}
          />
          <Suspense fallback="Conectando con la App...">
            <ReactRouter />
          </Suspense>
        </MantineProvider>
      </FirebaseAppProvider>
    </ThemeProvider>
  )
}
