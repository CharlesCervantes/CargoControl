import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconTruck from '@iconify-icons/ph/truck'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import * as Istyles from '../operator-incidents.css'
import { useTheme } from '../../../../styles/contextTheme'
import { IncidentStore } from '../../../../zustand/incidentStore'
import { vehicleStore } from '../../../../zustand/VehicleStore'
import { getVehiclesInside } from '../../../../fetch/Vehicles/getVehiclesInside'
import type { IVehicle } from '../../../../interfaces'

export function VehicleFormIncident() {
  const { addVehiclesIncident } = IncidentStore()
  const { Vehicle, setVehicle } = vehicleStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [trailerTypeFilter, setTrailerTypeFilter] = useDebouncedState<string>('', 500)
  const [number, setNumber] = useDebouncedState('', 500)
  const { theme } = useTheme()
  const [filteredDataName, setFilteredDataName] = useState<Array<IVehicle>>([])

  const form = useForm({
    initialValues: {
      vehicleId: '',
    },
  })

  useEffect(() => {
    const fetchingData = async() => {
      const data = await getVehiclesInside()
      setVehicle(data.data)
    }
    fetchingData()
  }, [setVehicle])

  useEffect(() => {
    const filtered = Vehicle.filter((vehicle) => {
      const trailerNumber = vehicle.unitNumber
      const trailerType = vehicle.VehicleType?.name

      const numberMatch = number.toLocaleLowerCase() === '' || trailerNumber.toLocaleLowerCase().includes(number.toLocaleLowerCase())
      const trailerTypeMatch = trailerTypeFilter.toLocaleLowerCase() === '' || trailerType?.toLocaleLowerCase().includes(trailerTypeFilter.toLocaleLowerCase())

      return numberMatch && trailerTypeMatch
    })

    setFilteredDataName(filtered)
  }, [number, trailerTypeFilter, Vehicle])

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Falta información')
      return null
    } else {
      const vehicle: IVehicle | undefined = Vehicle.find(vehicle => vehicle.id === id)
      if (vehicle)
        addVehiclesIncident(vehicle)
    }
    form.reset()
    close()
  }

  return (
    <>
      <Group>
        <button
          className={`${Istyles.botonesPersonalizados} itemOpMov ${theme}`}
          onClick={open}
        >
          <p><Icon icon={iconTruck} /> <span className="displayNone" /></p>
        </button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
        size="95%"
      >
        <Modal.Title className={styles.dialogTitle}>Datos del vehículo involucrado</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.vehicleId))} >
              <TextInput
                label="Número comercial"
                placeholder="Ingrese el número comercial"
                defaultValue={number !== undefined ? number.toString() : ''}
                onChange={(event) => {
                  const inputValue = event.currentTarget.value
                  const parsedValue = inputValue ? parseInt(inputValue, 10) : undefined
                  setNumber(parsedValue)
                }}
              />

              <TextInput
                label="Tipo de vehículo"
                placeholder="Vehículo,Tráiler,Tractocamión, etc"
                defaultValue={trailerTypeFilter}
                onChange={event => setTrailerTypeFilter(event.currentTarget.value)}
              />
              <Select
                label="Seleccione el vehículo "
                placeholder="Selecione un vehículo"
                data={filteredDataName.map(vehicle => ({
                  label: `Placas: ${vehicle.plate} - Número comercial: ${vehicle.unitNumber} - Tipo: ${vehicle.VehicleType?.name}`,
                  value: `${vehicle.id}`,
                }))}
                {...form.getInputProps('vehicleId')}
              />

              <div className={styles.saveContainer}>
                <button
                  onClick={() => {
                    close()
                    form.reset()
                  }}
                  type="button"
                  className={styles.closeButton}
                >Cerrar
                </button>
                <button type="submit" className={styles.button}>Guardar</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
