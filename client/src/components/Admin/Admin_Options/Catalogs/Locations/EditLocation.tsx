import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Input, Modal } from '@mantine/core'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getLocations } from '../../../../../fetch/Locations/getLocations'
import { locationStore } from '../../../../../zustand/locationsStore'
import { deleteLocationSuccess, errorNotification, existingElement, successNotification, updateLocationSuccess } from '../../../../../components/Notifications/notifications'
import { updateLocation as update } from '../../../../../fetch/Locations/updateLocation'
import * as styles from '../../../../operator-layout/modalEnter.css'
import { paginationStore } from '../../../../../zustand/paginationStore'
import type { ILocation } from '../../../../../interfaces'

export function EditLocation(props: { data: ILocation }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { setLocations } = locationStore()
  // Define los estados iniciales para los campos de entrada.
  const { pageSize, pageIndex, setCount } = paginationStore()
  const [locationName, setLocationName] = useState(props.data.name)
  const [locationCapacity, setLocationCapacity] = useState<number>(props.data.capacity ?? 0)

  // Define los manejadores de eventos para los cambios en los campos de entrada.
  const handleLocationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(event.target.value)
  }
  const handleLocationCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setLocationCapacity((prevCapacity) => {
      if (isValidNumber(newValue))
        return Number(newValue)

      return prevCapacity
    })
  }

  // guardamos la informacion en la BD
  async function updateLocations() {
    const data: ILocation = {
      id: props.data.id,
      name: locationName,
      capacity: Number(locationCapacity),
      status: true,
      organizationId: '',
    }

    try {
      await update(data)
        .then((data) => {
          if (data.ok)
            toast.success(data.message)
          else
            toast.error(data.message)
        })
    } catch (error) {
      toast.error('Error Inesperado al Actualizar la Localización')
    }
    try {
      await getLocations(pageSize, pageIndex + 1)
        .then((data) => {
          setLocations(data.data.result)
          setCount(data.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Localizaciones')
    }
  }

  function openModal() {
    setLocationName(props.data.name)
    setLocationCapacity(props.data.capacity ?? 0)
    open()
  }
  function isValidNumber(value: string): boolean {
    return /^\d+$/.test(value) // Verifica si el valor contiene solo dígitos
  }

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Modal.Title className={styles.dialogTitle}>Editar Localización</Modal.Title>
        <Input.Wrapper label="Nombre de la Localización" required size="responsive">
          <Input<any>
            placeholder="Insytech"
            defaultValue={locationName} // Usa el valor del estado
            onChange={handleLocationNameChange} // Agrega un manejador de eventos para los cambios
          />
        </Input.Wrapper>
        <Input.Wrapper label="Capacidad de la Localización" required size="responsive">
          <Input<any>
            placeholder="Parque España"
            defaultValue={locationCapacity} // Usa el valor del estado
            onChange={handleLocationCapacityChange} // Agrega un manejador de eventos para los cambios
          />
        </Input.Wrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Button
            className={styles.button}
            onClick={updateLocations}
            style={{ width: '40%' }}
            disabled={
    (locationName.length === 0)
    || (locationCapacity === undefined)
    || (locationCapacity === '')
    || !isValidNumber(locationCapacity)
    || ((locationName === props.data.name) && (Number(locationCapacity) === props.data.capacity))
  }
          >
            Guardar
          </Button>
          <button className={styles.closeButton} onClick={close} color="red" style={{ width: '40%' }}>Cancelar</button>

        </div>
      </Modal>

      <Group position="center">
        <Button onClick={openModal} color="green">Editar</Button>
      </Group>
    </>
  )
}
