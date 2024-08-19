import { useEffect, useState } from 'react'
import { Group, Modal } from '@mantine/core'
import { Icon } from '@iconify/react'
import iconEdit from '@iconify-icons/ph/pencil'
// import { getTrailerById } from 'src/fetch/getInfoById'
import { getTrailerTypes } from '../../../../../fetch/getTrailersAndVehicleTypes'
import { useForm } from '../../../../../tools/useForm'
// import { p } from '../../trade-enter.css'
import * as styles from '../../../modalEnter.css'
import type { ITrailer, TowTypeEntity } from '../../../../../interfaces'

export function EditTow(props: { object: ITrailer, onEdit: (data: ITrailer) => void }) {
  const initState: ITrailer = {
    id: props.object.id,
    plate: props.object.plate,
    TrailerType: {
      id: props.object.TrailerType.id,
      name: props.object.TrailerType.name,
      Question: props.object.TrailerType.Question,
    },
    company: props.object.company,
    vin: props.object.vin,
    number: props.object.number,
    seal: props.object.seal,
    trailerTypeId: props.object.trailerTypeId,
    Incident: props.object.Incident,
  }
  const { onChange, onSubmit, values } = useForm(handleSave, initState)
  const [data, setData] = useState<Array<TowTypeEntity>>([])
  const [selectedValue, setSelectedValue] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getTrailerTypes().then((data) => {
      setData(data)
    }).catch(error => console.error(error))
  }, [])

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = data.find((option: TowTypeEntity) => option.id === event.target.value)
    setSelectedValue(event.target.value)
    const eventObject = {
      target: {
        name: 'TrailerType',
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
        <Modal.Title className={styles.dialogTitle}>Editar Trailer</Modal.Title>
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
                <label className={styles.label} htmlFor="TrailerType">Tipo de Remolque</label>
                <select className={styles.inputSelect} value={selectedValue} onChange={handleSelectChange}>
                  <option className={styles.inputOption} value="">Select an option</option>
                  {data.map((option: TowTypeEntity) => (
                    <option className={styles.inputOption} key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="seal">
                  Carga
                </label>
                <input
                  onChange={onChange}
                  value={values.seal}
                  className={styles.input}
                  id="seal"
                  name="seal"
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="number">
                  Numero de Unidad
                </label>
                <input
                  onChange={onChange}
                  value={values.number}
                  className={styles.input}
                  id="number"
                  name="number"
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
