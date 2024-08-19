import { Group, Modal } from '@mantine/core'
import { Icon } from '@iconify/react'
import iconEdit from '@iconify-icons/ph/pencil'
import { useState } from 'react'
import { useForm } from '../../../../../tools/useForm'
import * as styles from '../../../modalEnter.css'
import type { IDriver } from '../../../../../interfaces'

export function EditDriver(props: { object: IDriver, onEdit: (data: IDriver) => void }) {
  const initialValues: IDriver = {
    id: props.object.id,
    name: props.object.name,
    license: props.object.license,
    curp: props.object.curp,
    company: props.object.company,
  }

  const { onChange, onSubmit, values } = useForm(handleSave, initialValues)
  const [open, setOpen] = useState(false)

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
        <Modal.Title className={styles.dialogTitle}>Editar Conductor</Modal.Title>
        <Modal.Body>
          <div className="formResp">
            <form onSubmit={onSubmit} autoComplete="off">
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="name">
                  Nombre
                </label>
                <input
                  onChange={onChange}
                  value={values.name}
                  className={styles.input}
                  id="name"
                  name="name"
                  required
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="license">
                  Licencia
                </label>
                <input onChange={onChange} value={values.license} className={styles.input} id="license" name="license" />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="curp">
                  CURP
                </label>
                <input onChange={onChange} value={values.curp} className={styles.input} id="curp" name="curp" />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label} htmlFor="company">
                  Empresa
                </label>
                <input onChange={onChange} value={values.company} className={styles.input} id="company" name="company" />
              </fieldset>
            </form>
          </div>
        </Modal.Body>
        <div className={styles.saveContainer}>
          <button onClick={() => setOpen(false)} className={styles.closeButton} >Cerrar</button>
          <button type="submit" onClick={handleSave} className={styles.button}>Guardar</button>
        </div>
      </Modal>
    </>
  )
}
