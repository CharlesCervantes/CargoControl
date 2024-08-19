import { Group, Modal } from '@mantine/core'
import { Icon } from '@iconify/react'
import iconVisit from '@iconify-icons/ph/identification-badge'
import { DateTimePicker } from '@mantine/dates'
import { createId } from '@paralleldrive/cuid2'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import moment from 'moment'
import { useForm } from '../../../../../tools/useForm'
import Fieldset from '../../../../operator-layout/Fieldset'
import { Camera } from '../../../../Camera/Camera'
import { ThemeProvider, useTheme } from '../../../../../styles/contextTheme'
import { getVisitorTypes } from '../../../../../fetch/Visitor/getVisitorTypes'
import SelectList from '../../../../Common/Select-list/Select-list'
import * as styles from './qrModalVisitor.css'
import '../../../../operator-layout/responsive.css'
import type { IQrVisitor, IVisitorType } from '../../../../../interfaces'

function QRModal({ showQR, setShowQR, newVisitorQr, showModal, setShowModal }: any) {
  const modalContent = showModal
    ? (
      <Modal
        opened={showModal}
        onClose={() => { setShowModal(false); setShowQR(false) }}
        withCloseButton={false}
      >
        <Modal.Title className={styles.dialogTitle}>QR</Modal.Title>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
          {showQR && (
          <div>
            <QRCode value={JSON.stringify(newVisitorQr)} />
          </div>
          )}
        </Modal.Body>
        <div className={styles.saveContainer}>
          <button className={styles.closeButton} onClick={() => { setShowModal(false); showQR(false) }}>Guardar</button>
          <button className={styles.button}>Enviar por correo</button>
        </div>
      </Modal>
      )
    : null
  return <div>{modalContent}</div>
}

export function QrModalVisitor(props: { onSave: (data: IQrVisitor) => void }) {
  const [open, setOpen] = useState(false)
  const [typeOfVisit, setTypeOfVisit] = useState<Array<IVisitorType>>([])
  const [valueVisitorType, setValueVisitorType] = useState<IVisitorType>()
  const [isSaveButton, setIsSaveButton] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [newVisitorQr, setNewVisitorQr] = useState<IQrVisitor | null>(null)
  const [showModal, setShowModal] = useState(false)
  const { onChange, onSubmit, values, onReset } = useForm(handleSave, {
    id: '',
    start: '',
    end: '',
    visitor: {
      id: '',
      name: '',
      subject: '',
      company: '',
      badge: '',
      curp: '',
      identification_url: '',
      picture_url: '',
      security_social_number: '',
      visitorTypeId: '',
    },
  })

  function handleSave() {
    const startMoment = moment(values.start)
    const endMoment = startMoment.clone().add(1, 'hour')

    const newVisitorQr = {
      id: createId(),
      start: startMoment.toISOString(),
      end: endMoment.toISOString(),
      visitor: {
        id: createId(),
        name: values.name,
        subject: values.subject,
        company: values.company,
        badge: values.badge,
        curp: values.curp,
        identification_url: values.identification_url,
        picture_url: values.picture_url,
        security_social_number: values.security_social_number,
        visitorTypeId: valueVisitorType?.id || '',
      },
    }
    if (
      (newVisitorQr.start !== '' && newVisitorQr.start !== undefined)
          && (newVisitorQr.end !== '' && newVisitorQr.end !== undefined)
          && (newVisitorQr.visitor.name !== '' && newVisitorQr.visitor.name !== undefined)
          && (newVisitorQr.visitor.subject !== '' && newVisitorQr.visitor.subject !== undefined)
    ) {
      // ...
      setIsSaveButton(false)
    } else {
      setIsSaveButton(true)
    }
    props.onSave(newVisitorQr)
    setNewVisitorQr(newVisitorQr)
    setShowModal(true)
    setShowQR(true)
    // setOpen() tratando de cerrar el modal formulario  !!!!! Se esta guardando la hora actual en los eventos !!!!!
    onReset()
  }

  const { theme } = useTheme()

  useEffect(() => {
    document.body.className = theme

    const fetchData = async() => {
      try {
        const data = await getVisitorTypes()
        setTypeOfVisit(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [theme])

  return (
    <ThemeProvider>
      <Group>
        <button
          className={`${styles.itemOperador} ${theme}`}
          onClick={() => setOpen(true)}
        >
          <p><Icon icon={iconVisit} /> <span>Generar Visita</span></p>
        </button>
      </Group>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 600 }}
      >
        <Modal.Title className={styles.dialogTitle}>Generar Visitante</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div>
            <form onSubmit={onSubmit}>
              <div className={styles.fieldset}>
                <label className={styles.label}>Fecha entrada</label>
                <DateTimePicker
                  className="calendarPicker"
                  dropdownType="modal"
                  placeholder="Seleccione fecha y hora"
                  classNames={{
                    placeholder: 'placeholder',
                    input: 'placeholder',
                    wrapper: 'placeholder',
                  }}
                  locale="es"
                />
              </div>
              <SelectList
                name="Tipo de visita"
                data={typeOfVisit}
                valueKey="id"
                labelKey="name"
                onChange={(selectedValue) => {
                  if (selectedValue !== undefined)
                    setValueVisitorType(selectedValue)
                }}
              />
              <Fieldset
                name="name"
                onChange={onChange}
                label="Nombre"
              />
              <Fieldset
                name="subject"
                onChange={onChange}
                label="Motivo de visita"
              />
              <Fieldset
                name="company"
                onChange={onChange}
                label="Empresa"
              />
              <Fieldset
                name="badge"
                onChange={onChange}
                label="Gafete"
              />
              <Fieldset
                name="curp"
                onChange={onChange}
                label="CURP"
              />
              <Fieldset
                name="social_security_number"
                onChange={onChange}
                label="Num. seguro social"
              />
              <div className={styles.saveContainer}>
                <button onClick={() => setOpen(false)} className={styles.closeButton}>Cerrar</button>
                <button
                  type="submit"
                  disabled={isSaveButton}
                  onClick={isSaveButton ? () => setShowModal(true) : undefined}
                  className={styles.button}
                >
                  Generar QR
                </button>
                {showModal && <QRModal showQR={showQR} setShowQR={setShowQR} newVisitorQr={newVisitorQr} showModal={showModal} setShowModal={setShowModal} />}
              </div>

            </form>
          </div>
        </Modal.Body>
      </Modal>
    </ThemeProvider>
  )
}
