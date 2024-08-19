// import iconCar from '@iconify-icons/ph/car-profile'
import { Button, Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconCar from '@iconify-icons/ph/car-profile'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import { useTheme } from '../../../../styles/contextTheme'
import { useVehicleVisitorStore } from '../../../../zustand/VehicleVisitorStore'
import { getVehicleVisitorsInside } from '../../../../fetch/VehicleVisitor/getVehicleVisitorsInside'
import { ExitVisitorStore } from '../../../../zustand/ExitVisitorStore'
import type { IVehicleVisitor } from '../../../../interfaces'

export function VehicleVisitorExitForm() {
  const { theme } = useTheme()
  const [opened, { open, close }] = useDisclosure(false)
  const { vehicleVisitors, setVehicleVisitors } = useVehicleVisitorStore()
  const { setVehicleVisitor } = ExitVisitorStore()
  const [filteredData, setFilteredData] = useState<Array<IVehicleVisitor>>([])
  const [name, setName] = useDebouncedState('', 0)
  const [model, setModel] = useDebouncedState('', 0)
  const [brand, setBrand] = useDebouncedState('', 0)
  const [color, setColor] = useDebouncedState('', 0)

  const form = useForm({
    initialValues: {
      vehicleVIsitorId: '',
    },
  })

  const handlePlate = async(inputPlate: string) => {
    setName(inputPlate)
  }

  const handleModel = async(inputModel: string) => {
    setModel(inputModel)
  }

  const handleBrand = async(inputBrand: string) => {
    setBrand(inputBrand)
  }

  const handleColor = async(inputColor: string) => {
    setColor(inputColor)
  }

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Selecciona un vehículo')
      return null
    }

    const vehicle = vehicleVisitors.find(vehicle => vehicle.id === id)
    if (vehicle)
      setVehicleVisitor(vehicle)
    else
      toast.error('El vehículo no existe')

    close()
    form.reset()
  }

  useEffect(() => {
    const fetchingData = async() => {
      const data = await getVehicleVisitorsInside()
      setVehicleVisitors(data.data)
    }
    fetchingData()
  }, [setVehicleVisitors])

  useEffect(() => {
    const filtered = vehicleVisitors.filter((vehicle) => {
      const vehiclePlates = vehicle.plates
      const vehicleBrand = vehicle.brand
      const vehicleModel = vehicle.model
      const vehicleColor = vehicle.color

      const platesMatch = name.toLowerCase() === '' || vehiclePlates?.toLowerCase().includes(name.toLowerCase())
      const brandMatch = brand.toLowerCase() === '' || vehicleBrand?.toLowerCase().includes(brand.toLowerCase())
      const modelMatch = model.toLowerCase() === '' || vehicleModel?.toLowerCase().includes(model.toLowerCase())
      const colorMatch = color.toLowerCase() === '' || vehicleColor?.toLowerCase().includes(color.toLowerCase())

      return platesMatch && brandMatch && modelMatch && colorMatch
    })

    setFilteredData(filtered)
  }, [name, brand, model, color, vehicleVisitors])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov ${theme}`}
          onClick={open}
        >
          <p><Icon icon={iconCar} /> <span className="displayNone">Vehículo</span></p>
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
        <Modal.Title className={styles.dialogTitle}>Buscar Vehículo</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.vehicleVIsitorId))}>
              <Select
                label="Vehículo"
                placeholder="Seleccione el vehículo que saldrá"
                data={filteredData.map(vehicle => ({
                  label: `Placas: ${vehicle.plates} - Marca: ${vehicle.brand} - Modelo: ${vehicle.model} - Color: ${vehicle.color}`,
                  value: `${vehicle.id}`,
                }))}
                {...form.getInputProps('vehicleVIsitorId')}
              /><br />
              <Modal.Title className={styles.dialogTitle}> Campos de búsqueda </Modal.Title>
              <div className={styles.textInputContainer} >
                <div className={styles.textInputRow}>
                  <TextInput
                    label="Placas"
                    placeholder="Buscar placas"
                    defaultValue={name}
                    onChange={event => handlePlate(event.currentTarget.value)}
                  />
                </div>
                <div className={styles.textInputRow}>
                  <TextInput
                    label="Marca"
                    placeholder="Buscar marca"
                    defaultValue={brand}
                    onChange={event => handleBrand(event.currentTarget.value)}
                  />
                </div>
                <div className={styles.textInputRow}>
                  <TextInput
                    label="Modelo"
                    placeholder="Buscar modelo"
                    defaultValue={model}
                    onChange={event => handleModel(event.currentTarget.value)}
                  />
                </div>
                <div className={styles.textInputRow}>
                  <TextInput
                    label="Color"
                    placeholder="Buscar color"
                    defaultValue={color}
                    onChange={event => handleColor(event.currentTarget.value)}
                  />
                </div>
              </div>

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
