import { Button, CheckIcon, ColorSwatch, Divider, Group, Modal, Select } from '@mantine/core'
import { useEffect, useState } from 'react'
import settings from '@iconify-icons/ph/gear-six'
import { Icon } from '@iconify/react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../components/operator-layout/modalEnter.css'
import { networkStore } from '../zustand/networkStore'
import { getAllLocations } from '../fetch/Locations/getLocations'
import { locationStore } from '../zustand/locationsStore'
import { ThemeProvider, useTheme } from './contextTheme'

export function ThemeSwitcher() {
  const { changeTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState('light')
  const { theme } = useTheme()
  const { network, addNetwork } = networkStore()
  const { locations, setLocations, deviceLocation, setDeviceLocation } = locationStore()

  const form = useForm({
    initialValues: {
      locationId: deviceLocation.id,
    },
  })

  const handleThemeChange = (themeName: string) => {
    changeTheme(themeName)
    setActiveTheme(themeName)
  }
  const handleLocationChange = (locationId: string) => {
    const location = locations.find(location => location.id === locationId)
    if (location) {
      setDeviceLocation(location)
      toast.success('Ubicacion Configurada Correctamente')
      console.log('1.18MyLocation:', locations)
    } else {
      toast.error('No se pudo cambiar la ubicación del dispositivo')
      return null
    }

    console.log(deviceLocation)
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    if (network === '::1')
      addNetwork('localhost')
  }, [addNetwork, network])

  useEffect(() => {
    const data = async() => {
      const request = await getAllLocations()
      setLocations(request.data)
    }
    data()
  }, [])

  return (
    <ThemeProvider>
      <Group>
        <button onClick={() => setOpen(true)}>
          <Icon icon={settings} />
        </button>
      </Group>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        className="modalResp"
      >
        <Modal.Title className={styles.dialogTitle}>Configuración del Dispositivo</Modal.Title>
        <div>
          <div>
            <h1>Configuraciones: </h1>
            <form onSubmit={form.onSubmit(values => handleLocationChange(values.locationId || ''))}>
              <Select
                // data={[]}
                label="Selecciona la ubicación del dispositivo"
                placeholder="Seleccione uno"
                data={locations.map(loc => ({ value: loc.id, label: loc.name }))}
                {...form.getInputProps('locationId')}
              /><br />

              <Button type="submit" variant="outline" color="blue" size="xs" >Configurar</Button>
            </form>
          </div>
          <Divider my="sm" variant="dashed" />

          <div>
            <div className={styles.fieldset}>
              <ColorSwatch
                component="button"
                color="#3A8FF0"
                onClick={() => handleThemeChange('light')}
              >
                {activeTheme === 'light' && <CheckIcon width="1em" />}
              </ColorSwatch>
              <span className={styles.labelTheme}>Default</span>
            </div>

            <div className={styles.fieldset}>
              <ColorSwatch
                component="button"
                color="purple"
                onClick={() => handleThemeChange('dark')}
              >
                {activeTheme === 'dark' && <CheckIcon width="1em" />}
              </ColorSwatch>
              <span className={styles.labelTheme}>Morado obscuro</span>
            </div>

            <div className={styles.fieldset}>
              <ColorSwatch
                component="button"
                color="blue"
                onClick={() => handleThemeChange('blue')}
              >
                {activeTheme === 'blue' && <CheckIcon width="1em" />}
              </ColorSwatch>
              <span className={styles.labelTheme}>Azul</span>
            </div>

            <div className={styles.fieldset}>
              <ColorSwatch
                component="button"
                color="orange"
                onClick={() => handleThemeChange('orange')}
              >
                {activeTheme === 'orange' && <CheckIcon width="1em" />}
              </ColorSwatch>
              <span className={styles.labelTheme}>Naranja</span>
            </div>

            <div className={styles.fieldset}>
              <ColorSwatch
                component="button"
                color="turquoise"
                onClick={() => handleThemeChange('turquoise')}
              >
                {activeTheme === 'turquoise' && <CheckIcon width="1em" />}
              </ColorSwatch>
              <span className={styles.labelTheme}>Turquesa</span>
            </div>
          </div>
        </div>
        <div className={styles.saveContainerTheme}>
          <button className={styles.closeButton} onClick={() => setOpen(false)}>Cerrar</button>
          <button className={styles.closeButton} onClick={() => setOpen(false)}>Guardar configuración</button>
        </div>
      </Modal>
    </ThemeProvider>
  )
}
