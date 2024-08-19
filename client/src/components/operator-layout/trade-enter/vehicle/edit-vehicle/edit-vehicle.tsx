import { Group, Modal } from '@mantine/core'
import { Icon } from '@iconify/react'
import iconEdit from '@iconify-icons/ph/pencil'
import { useEffect, useState } from 'react'
import { useForm } from '../../../../../tools/useForm'
import * as styles from '../../../modalEnter.css'
import { getVehicleTypes } from '../../../../../fetch/VehicleTypes/getVehicleTypes'
import type { IVehicle, IVehicleTypes } from '../../../../../interfaces'

export function EditVehicle(props: { object: IVehicle, onEdit: (data: IVehicle) => void }) {
  const initState: IVehicle = {
    id: props.object.id,
    plate: props.object.plate,
    VehicleType: {
      id: props.object.VehicleType.id,
      name: props.object.VehicleType.name,
      Question: props.object.VehicleType.Question,
    },
    company: props.object.company,
    vin: props.object.vin,
    unitNumber: props.object.unitNumber,
    vehicleTypeId: props.object.vehicleTypeId,
  }

  const { onChange, onSubmit, values } = useForm(handleSave, initState)
  const [data, setData] = useState<Array<IVehicleTypes>>([])
  const [selectedValue, setSelectedValue] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getVehicleTypes().then((data) => {
      setData(data)
    }).catch(error => console.error(error))
  }, [])

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = data.find((option: IVehicleTypes) => option.id === event.target.value)
    setSelectedValue(event.target.value)
    const eventObject = {
      target: {
        name: 'VehicleType',
        value: selectedOption || {},
      } as EventTarget & HTMLInputElement,
    }
    onChange(eventObject as React.ChangeEvent<HTMLInputElement>)
  }

  function handleSave() {
    props.onEdit(values)
    setOpen(false)
  }

  return (
    <>
      <Group>
        <button onClick={() => setOpen(true)}>
          <Icon className={styles.iconEdit} icon={iconEdit} />
        </button>
      </Group>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
      >
        <Modal.Title className={styles.dialogTitle}>Editar Unidad</Modal.Title>
        <Modal.Body>
          <div className="formResp">
            <form autoComplete="off" onSubmit={onSubmit}>
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="plate">
                  Placas
                </label>
                <input
                  onChange={onChange}
                  value={values.plate}
                  className={styles.input}
                  id="plate"
                  name="plate"
                  required
                />
              </fieldset>

              <fieldset className={styles.fieldsetSelect}>
                <label className={styles.label} htmlFor="VehicleType">Tipo de unidad</label>
                <select className={styles.inputSelect} value={selectedValue} onChange={handleSelectChange}>
                  <option className={styles.inputOption} value="">Select an option</option>
                  {data.map((option: IVehicleTypes) => (
                    <option className={styles.inputOption} key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="unitNumber">
                  Número de unidad
                </label>
                <input
                  onChange={onChange}
                  value={values.unitNumber}
                  className={styles.input}
                  id="unitNumber"
                  name="unitNumber"
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="vin">
                  VIN
                </label>
                <input
                  onChange={onChange}
                  value={values.vin}
                  className={styles.input}
                  id="vin"
                  name="vin"
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="company">
                  Empresa
                </label>
                <input
                  onChange={onChange}
                  value={values.company}
                  className={styles.input}
                  id="company"
                  name="company"
                />
              </fieldset>
            </form>
          </div>
        </Modal.Body>
        <div className={styles.saveContainer}>
          <button onClick={() => setOpen(false)} className={styles.closeButton} >Cerrar</button>
          <button onClick={handleSave} className={styles.button}>Guardar</button>
        </div>
      </Modal>
    </>
  )
}
