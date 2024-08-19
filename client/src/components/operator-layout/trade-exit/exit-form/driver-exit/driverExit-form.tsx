/* eslint-disable @typescript-eslint/no-unused-vars */

import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconVisit from '@iconify-icons/ph/identification-badge'
import User from '@iconify-icons/ph/user'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../../modalExit.css'
import { useTheme } from '../../../../../styles/contextTheme'
import { getDriversInside } from '../../../../../fetch/Drivers/getDriversInside'
import { driverStore } from '../../../../../zustand/DriverStore'
import { ExitUnitStore } from '../../../../../zustand/ExitUnitStore'
import { vehicleStore } from '../../../../../zustand/VehicleStore'
import type { IDriver } from '../../../../../interfaces'

export function DriverExitForm() {
  const { setIdDriver, setIdVehicle, setDriver, setVehicle } = ExitUnitStore()
  const { Vehicles } = vehicleStore()
  const { drivers, setDrivers, resetDrivers } = driverStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [name, setName] = useDebouncedState('', 500)
  const { theme } = useTheme()
  const [filteredData, setFilteredData] = useState<Array<IDriver>>([])
  const [companyFilter, setCompanyFilter] = useDebouncedState('', 500)
  const [licenseFilter, setLicenseFilter] = useDebouncedState('', 500)
  const filtered: Array<IDriver> = []
  // const { setVisitor, setVehicleVisitor } = ExitVisitorStore()

  const form = useForm({
    initialValues: {
      driverId: '',
    },
  })

  const handleName = (value: string) => {
    setName(value)
  }

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Seleccione un conductor')
      return null
    } else {
      const driver: IDriver | undefined = drivers.find(driver => driver.id === id)
      if (driver) {
        setDriver(driver)
        setIdDriver(driver.id || '')
        if (driver.EntranceUnits && driver.EntranceUnits.length > 0) {
          const vehicle = driver.EntranceUnits[0].Vehicle
          if (vehicle) {
            // const vehicleToMap = Vehicles.map((v) => {
            //   if (v.id === vehicle.id) {
            //     setVehicle(v)
            //     setIdVehicle(v.id || '')
            //   }
            // })
            const foundVehicle = Vehicles.find(v => v.id === vehicle.id)
            if (foundVehicle) {
              setVehicle(foundVehicle)
              setIdVehicle(foundVehicle.id || '')
            }
          }
        }
      } else { toast.error('No existe el conductor') }
      console.log('Driver: ', driver)
    }
    form.reset()
    close()
  }

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await getDriversInside()
        console.log(response)
        setDriver(response.data)
      } catch (error) {
        toast.error('Error al obtener los conductores que se encuentran adentro')
      }
    }

    fetchData()
  }, [setDriver])

  useEffect(() => {
    const filteredData = drivers.filter((driver) => {
      const fullName = `${driver.Person?.name} ${driver.Person?.lastname}`
      const companyName = driver.Company?.name
      const license = driver.Person?.license

      const nameMatch = name.toLowerCase() === '' || fullName.toLowerCase().includes(name.toLowerCase())
      const companyMatch = companyFilter.toLowerCase() === '' || companyName?.toLowerCase().includes(companyFilter.toLowerCase())
      const licenseMatch = licenseFilter.toLowerCase() === '' || license?.toLowerCase().includes(licenseFilter.toLocaleLowerCase())

      return nameMatch && companyMatch && licenseMatch
    })

    setFilteredData(filteredData)
  }, [name, companyFilter, licenseFilter, drivers])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov ${theme}`}
          onClick={open}
        >
          <p><Icon icon={User} /><span className="displayNone">Conductor</span></p>
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
        <Modal.Title className={styles.dialogTitle}>Salida de Conductores</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.driverId))} >

              <Select
                label="Conductor"
                placeholder="Seleccione el conductor que saldrá"
                data={filteredData.map(driver => ({
                  label: `Nombre: ${driver.Person?.name} ${driver.Person?.lastname} - Compañía: ${driver.Company?.name} - Licencia: ${driver.Person?.license}`,
                  value: `${driver.id}`,
                }))}
                {...form.getInputProps('driverId')}
              /><br />
              <Modal.Title className={styles.dialogTitle}>Campos de Búsqueda</Modal.Title>

              <TextInput
                label="Nombre:"
                placeholder="Buscar nombre del conductor"
                defaultValue={name}
                onChange={event => handleName(event.currentTarget.value)}
              />
              <TextInput
                label="Compañía/Empresa"
                placeholder="Buscar nombre de la Empresa"
                // description="Nombre de la Compañía/Empresa"
                defaultValue={companyFilter}
                onChange={event => setCompanyFilter(event.currentTarget.value)}
              />
              <TextInput
                label="Licencia"
                placeholder="Buscar número de licencia"
                defaultValue={licenseFilter}
                onChange={event => setLicenseFilter(event.currentTarget.value)}
              />
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
