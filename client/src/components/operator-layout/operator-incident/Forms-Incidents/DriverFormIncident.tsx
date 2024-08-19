import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconVisit from '@iconify-icons/ph/identification-badge'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import * as Istyles from '../operator-incidents.css'
import { useTheme } from '../../../../styles/contextTheme'
import { IncidentStore } from '../../../../zustand/incidentStore'
import { getDriversInside } from '../../../../fetch/Drivers/getDriversInside'
import { driverStore } from '../../../../zustand/DriverStore'
import type { IDriver } from '../../../../interfaces'

export function DriverFormIncident() {
  const { addDriverIncident } = IncidentStore()
  const { drivers, setDrivers } = driverStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [name, setName] = useDebouncedState('', 500)
  const { theme } = useTheme()
  const [filteredDataName, setFilteredDataName] = useState<Array<IDriver>>([])
  const [companyFilter, setCompanyFilter] = useDebouncedState('', 500)

  const form = useForm({
    initialValues: {
      driverId: '',
    },
  })

  const handleName = (value: string) => {
    setName(value)
  }

  useEffect(() => {
    const fetchingData = async() => {
      const data = await getDriversInside()
      setDrivers(data.data)
    }
    fetchingData()
  }, [setDrivers])

  useEffect(() => {
    const filtered = drivers.filter((driver) => {
      const fullName = `${driver.Person?.name} ${driver.Person?.lastname}`
      const companyName = driver.Company?.name

      const nameMatch = name.toLocaleLowerCase() === '' || fullName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      const companyMatch = companyFilter.toLocaleLowerCase() === '' || companyName?.toLocaleLowerCase().includes(companyFilter.toLocaleLowerCase())

      return nameMatch && companyMatch
    })

    setFilteredDataName(filtered)
  }, [name, companyFilter, drivers])

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Falta información')
      return null
    } else {
      const driver: IDriver | undefined = drivers.find(driver => driver.id === id)
      if (driver)
        addDriverIncident(driver)
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
          <p><Icon icon={iconVisit} /> <span className="displayNone" /></p>
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
        <Modal.Title className={styles.dialogTitle}>Datos del conductor involucrado </Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.driverId))} >
              <TextInput
                label="Nombre"
                placeholder="Ingrese el nombre del conductor"
                defaultValue={name}
                onChange={event => handleName(event.currentTarget.value)}
              />
              <TextInput
                label="Compañía/Empresa"
                placeholder="Ingrese la compañía a la que pertenece el conductor"
                defaultValue={companyFilter}
                onChange={event => setCompanyFilter(event.currentTarget.value)}
              />
              <Select
                label="Seleccione el conductor"
                placeholder="Seleccione un conductor"
                data={filteredDataName.map(driver => ({
                  label: `Licencia: ${driver.Person?.license} - Compañia: ${driver.Company?.name} - Nombre: ${driver.Person?.name} ${driver.Person?.lastname}`,
                  value: `${driver.id}`,
                }))}
                {...form.getInputProps('driverId')}
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
