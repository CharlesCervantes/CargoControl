import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { Button, Input, Modal, TextInput } from '@mantine/core'
import { createId } from '@paralleldrive/cuid2'
import iconPencil from '@iconify-icons/ph/pencil'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useTheme } from '../../../../styles/contextTheme'
import { useVisitorEnterStore } from '../../../../zustand/visitorEnterStore'
import * as styles from './VehicleVisitorRender.css'
import type { IVehicleVisitor } from '../../../../interfaces'

export function EditVehicleVisitor(props: { vehicle: IVehicleVisitor, onVehicleVisitorUpdate: (vehiclevisitor: IVehicleVisitor) => void }) {
  const { theme } = useTheme()
  const [opened, { open, close }] = useDisclosure(false)
  const { entrance, setVehicleVisitor, editVehicleVisitor } = useVisitorEnterStore()
  const [vehicleVisitorEdit, setVehicleVisitorEdit] = useState<IVehicleVisitor>(entrance.VehicleVisitor)
  const [plates, setPlates] = useState(vehicleVisitorEdit?.plates)
  const [brand, setBrand] = useState(vehicleVisitorEdit?.brand)
  const [model, setModel] = useState(vehicleVisitorEdit?.model)
  const [color, setColor] = useState(vehicleVisitorEdit?.color)
  const { vehicle, onVehicleVisitorUpdate } = props

  function handlePlatesChange(event) {
    const newPlates = event.target.value
    setPlates(newPlates)
    setVehicleVisitorEdit(prevState => ({
      ...prevState,
      plates: newPlates,
    }))
  }

  function handleBrandChange(event) {
    const newBrand = event.target.value
    setPlates(newBrand)
    setVehicleVisitorEdit(prevState => ({
      ...prevState,
      plates: newBrand,
    }))
  }

  function handleModelChange(event) {
    const newModel = event.target.value
    setPlates(newModel)
    setVehicleVisitorEdit(prevState => ({
      ...prevState,
      plates: newModel,
    }))
  }

  function handleColorChange(event) {
    const newColor = event.target.value
    setPlates(newColor)
    setVehicleVisitorEdit(prevState => ({
      ...prevState,
      plates: newColor,
    }))
  }

  useEffect(() => {
    const vehicleVisitorToUpdate = entrance.VehicleVisitor
    console.log('1.28: Datos del vehículo del visitante:', plates, brand, model, color)
    setVehicleVisitorEdit(vehicleVisitorToUpdate)
    console.log('visitorToUpdate:', vehicleVisitorToUpdate)
    console.log('visitorEdit recibido:', vehicleVisitorEdit)
  }, [plates, brand, model, color, entrance.VehicleVisitor, vehicleVisitorEdit, props.vehicle.id])

  const form = useForm({
    initialValues: {
      plates: vehicleVisitorEdit?.plates,
      brand: vehicleVisitorEdit?.brand,
      model: vehicleVisitorEdit?.model,
      color: vehicleVisitorEdit?.color,
    },
  })

  function handleSave(data) {
    console.log('1.28: Vehicle Visitor data:', data)
    const newVehicle: IVehicleVisitor = {
      id: props.vehicle.id,
      brand,
      color,
      isInside: true,
      model,
      organizationId: '',
      plates: plates.toUpperCase(),
    }
    setVehicleVisitor(newVehicle)
    editVehicleVisitor(newVehicle)
    props.onVehicleVisitorUpdate(newVehicle)
    // if (newVehicle.plates !== '' && newVehicle.plates !== undefined) {
    //   setVehicleVisitor(newVehicle)
    //   editVehicleVisitor(newVehicle)
    //   props.onVehicleVisitorUpdate(newVehicle)
    // }
    console.log('1.28: newVehicle: ', newVehicle)
    close()
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    console.log('1.28: props.vehicle.id: ', props.vehicle.id)
  }, [props.vehicle.id])

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div>
          <Modal.Title className={styles.dialogTitle}>
            Editar Información
          </Modal.Title>
          <Modal.Body>
            <div className="formResp">
              <form
                onSubmit={form.onSubmit((values) => {
                  handleSave(values)
                })
              }
                autoComplete="off"
              >
                <Input.Wrapper label="Placas">
                  <Input value={plates} onChange={handlePlatesChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Marca">
                  <Input value={brand} onChange={handleBrandChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Modelo">
                  <Input value={model} onChange={handleModelChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Color">
                  <Input value={color} onChange={handleColorChange} />
                </Input.Wrapper><br />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Button onClick={handleSave}>Guardar</Button>
                  </div>
                  <div>
                    <Button onClick={() => close()} >Cancelar</Button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </div>

      </Modal>

      <Button style={{ all: 'unset' }} onClick={open}><Icon icon={iconPencil} className={styles.existingIcon} /></Button>
    </>
  )
}
