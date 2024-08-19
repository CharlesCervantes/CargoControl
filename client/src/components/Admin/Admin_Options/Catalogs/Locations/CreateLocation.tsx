import { useDisclosure } from '@mantine/hooks'
import { Button, FileInput, Group, Input, Modal } from '@mantine/core'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { addLocationSuccess, existingElement } from '../../../../../components/Notifications/notifications'
import { CreateLocations } from '../../../../../fetch/Locations/postLocations'
import { locationStore } from '../../../../../zustand/locationsStore'
import { useForm } from '../../../../../tools/useForm'
import * as styles from '../../../../operator-layout/modalEnter.css'
import { getLocations } from '../../../../../fetch/Locations/getLocations'
import { paginationStore } from '../../../../../zustand/paginationStore'
import { LocationFieldset } from './LocationsFieldset'

export function CreateLocation() {
  const [opened, { open, close }] = useDisclosure(false)
  const { pageSize, pageIndex, setCount } = paginationStore()
  const { setLocations, locations } = locationStore()
  //   const [companyName, setCompanyName] = useState('')
  //   const [companyLocation, setCompanyName] = useState('')

  const initialValues = {
    name: '',
    capacity: 0,
  }
  const { onChange, onSubmit, values, onReset } = useForm(handleSave, initialValues)

  async function saveCompanyInDB(newLocation) {
    try {
      await CreateLocations(newLocation)
        .then((data) => {
          if (data.ok) {
            toast.success(data.message)
            onReset()
            close()
          } else { toast.error(data.message) }
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Localizaciones')
    }

    try {
      await getLocations(pageSize, pageIndex + 1)
        .then((data) => {
          setLocations(data.data.result)
          setCount(data.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Compañías')
    }
  }

  function handleSave() {
    close()
    const newLocation = {
      name: values.name.toLowerCase(),
      capacity: parseInt(values.capacity, 10), // Convierte el valor a un número entero
    }
    if (newLocation.name !== '') {
      saveCompanyInDB(newLocation)
      onReset()
    }
  }

  function isValidNumber(value: string): boolean {
    return /^\d+$/.test(value) // Verifica si el valor contiene solo dígitos
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="40%"
      >
        <Modal.Title className={styles.dialogTitle}>Agregar Ubicación</Modal.Title>
        <form onSubmit={onSubmit} autoComplete="off">
          <LocationFieldset
            label="Nombre"
            name="name"
            onChange={onChange}
          />
          <LocationFieldset
            label="Capacidad"
            name="capacity"
            onChange={onChange}
          />
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>

          {/* <Button style={{ display: 'flex', width: '90%', justifyContent: 'center' }}>Guardar</Button> */}
          <button className={styles.closeButton} onClick={close} style={{ width: '40%' }}>Cancelar</button>
          <Button
            className={styles.button}
            disabled={
              ((values.capacity === undefined) || (values.name === undefined))
              || (values.name === '')
              || ((values.capacity === '') || (values.capacity === 0))
              || !isValidNumber(values.capacity) // Verifica si el valor no es un número
            }
            style={{ width: '40%' }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Agregar Ubicación</Button>
      </Group>
    </>
  )
}
