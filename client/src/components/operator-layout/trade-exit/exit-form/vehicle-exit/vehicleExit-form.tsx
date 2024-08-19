/* eslint-disable @typescript-eslint/no-unused-vars */

import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconVisit from '@iconify-icons/ph/identification-badge'
import iconTruck from '@iconify-icons/ph/truck'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../../modalExit.css'
import { useTheme } from '../../../../../styles/contextTheme'
import { getVehiclesInside } from '../../../../../fetch/Vehicles/getVehiclesInside'
import { vehicleStore } from '../../../../../zustand/VehicleStore'
import { ExitUnitStore } from '../../../../../zustand/ExitUnitStore'
import type { IVehicle } from '../../../../../interfaces'

export function VehicleExitForm() {
  const { setIdVehicle, setIdDriver, setVehicle, setDriver } = ExitUnitStore()
  const { Vehicles, setVehicles, resetVehicles } = vehicleStore()
  const [opened, { open, close }] = useDisclosure(false)
  const { theme } = useTheme()
  const [unitNumber, setUnitNumber] = useDebouncedState('', 500)
  const [filteredData, setFilteredData] = useState<Array<IVehicle>>([])
  const [platesNumber, setPlatesNUmber] = useDebouncedState('', 500)
  const [companyFilter, setCompanyFilter] = useDebouncedState('', 500)
  const filtered: Array<IVehicle> = []

  const form = useForm({
    initialValues: {
      vehicleId: '',
    },
  })

  const handleName = (value: string) => {
    setUnitNumber(value)
  }

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Seleccione un visitante')
      return null
    } else {
      const vehicle: IVehicle | undefined = Vehicles.find(vehicle => vehicle.id === id)
      if (vehicle) {
        console.log(vehicle)
        setVehicle(vehicle)
        setIdVehicle(vehicle.id || '')
        if (vehicle.EntranceUnits && vehicle.EntranceUnits.length > 0) {
          const driver = vehicle.EntranceUnits[0].Driver
          console.log(vehicle)
          if (driver) {
            setVehicle(vehicle)
            setIdVehicle(driver.id || '')
          }
        }
      } else { toast.error('No existe el conductor') }
    }
    form.reset()
    close()
  }

  // useEffect(() => {
  //   const fetchingData = async() => {
  //     const data = await getVehiclesInside()
  //     console.log(data.data)
  //     setVehicles(data.data)
  //   }
  //   fetchingData()
  //   console.log(Vehicles)
  // }, [])

  useEffect(() => {
    console.log('Vehicesinexit:', Vehicles)
    const filteredData = Vehicles.filter((vehicle) => {
      const vehicleUnitNumber = `${vehicle.unitNumber}`
      const vehicleCompanyName = vehicle.Company?.name
      const vehiclePlates = vehicle.plate

      const unitNumberMatch = unitNumber.toLowerCase() === '' || vehicleUnitNumber.toLowerCase().includes(unitNumber.toLowerCase())
      const companyMatch = companyFilter.toLowerCase() === '' || vehicleCompanyName?.toLowerCase().includes(companyFilter.toLowerCase())
      const plateMatch = platesNumber.toLowerCase() === '' || vehiclePlates?.toLowerCase().includes(platesNumber.toLocaleLowerCase())

      return unitNumberMatch && companyMatch && plateMatch
    })

    setFilteredData(filteredData)
  }, [unitNumber, companyFilter, platesNumber, Vehicles])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov ${theme}`}
          onClick={open}
        >
          <p><Icon icon={iconTruck} /> <span className="displayNone">Unidad</span></p>
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
        <Modal.Title className={styles.dialogTitle}>Salida de Unidades</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.vehicleId))} >

              <Select
                label="Unidad de carga"
                placeholder="Selecione la unidad que saldrá"
                data={filteredData.map(vehicle => ({
                  label: `Compañía: ${vehicle.Company?.name} - Número de unidad: ${vehicle.unitNumber} - Placas: ${vehicle.plate}`,
                  value: `${vehicle.id}`,
                }))}
                {...form.getInputProps('vehicleId')}
              /><br />

              <Modal.Title className={styles.dialogTitle}>Campos de Búsqueda</Modal.Title>
              <TextInput
                label="Compañía"
                placeholder="Buscar nombre de la compañía/empresa"
                defaultValue={companyFilter}
                onChange={event => setCompanyFilter(event.currentTarget.value)}
              />
              <TextInput
                label="Numero económico / unidad:"
                placeholder="Buscar número de unidad"
                defaultValue={unitNumber}
                onChange={event => handleName(event.currentTarget.value)}
              />
              <TextInput
                label="Número de placa"
                placeholder="Buscar número de placas"
                defaultValue={platesNumber}
                onChange={event => setPlatesNUmber(event.currentTarget.value)}
              />
              {/* <Select
                label="Unidad"
                placeholder="Selecione uno"
                data={filteredData.map(vehicle => ({
                  label: `Compañía: ${vehicle.Company?.name} - Número de unidad: ${vehicle.unitNumber} - Placas: ${vehicle.plate}`,
                  value: `${vehicle.id}`,
                }))}
                {...form.getInputProps('vehicleId')}
              /> */}
              <br />
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
