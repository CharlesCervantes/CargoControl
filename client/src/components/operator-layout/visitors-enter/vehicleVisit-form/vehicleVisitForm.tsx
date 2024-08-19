import { Group, Modal } from '@mantine/core'
import { Icon } from '@iconify/react'
import iconCar from '@iconify-icons/ph/car-profile'
import { useEffect, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'
import { useForm } from '../../../../tools/useForm'
import Fieldset from '../../Fieldset'
import { useTheme } from '../../../../styles/contextTheme'
import * as styles from '../../modalEnter.css'
import '../../responsive.css'
import { useVisitorEnterStore } from '../../../../zustand/visitorEnterStore'
import type { IVehicleVisitor } from '../../../../interfaces'

export function VehicleVisitor() {
  const { setVehicleVisitor } = useVisitorEnterStore()
  const initialValues = {
    id: '',
    plates: '',
    brand: '',
    model: '',
    color: '',
  }
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const { onChange, onSubmit, values, onReset } = useForm(handleSave, initialValues)

  function handleSave() {
    const newVehicle: IVehicleVisitor = {
      id: createId(),
      brand: values.brand,
      color: values.color,
      isInside: true,
      model: values.model,
      organizationId: '',
      plates: values.plates.toUpperCase(),
    }
    if (newVehicle.plates !== '' && newVehicle.plates !== undefined) {
      setVehicleVisitor(newVehicle)
      onReset()
      setOpen(false)
    }
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov ${theme}`}
          onClick={() => setOpen(true)}
        >
          <p><Icon icon={iconCar} /> <span className="displayNone">Vehículo</span></p>
        </button>
      </Group>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
        size="95%"
      >
        <Modal.Title className={styles.dialogTitle}>Vehículo</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={onSubmit} autoComplete="off">

              <Fieldset
                label="Placas"
                name="plates"
                onChange={onChange}
              />

              <Fieldset
                label="Marca"
                name="brand"
                onChange={onChange}
              />

              <Fieldset
                label="Modelo"
                name="model"
                onChange={onChange}
              />

              <Fieldset
                label="Color"
                name="color"
                onChange={onChange}
              />
            </form>
          </div>
        </Modal.Body>
        <div className={styles.saveContainer}>
          <button onClick={() => setOpen(false)} className={styles.closeButton}>Cerrar</button>
          <button onClick={handleSave} className={styles.button}>Guardar</button>
        </div>
      </Modal>
    </>
  )
}
