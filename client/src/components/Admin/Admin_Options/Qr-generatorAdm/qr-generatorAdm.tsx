import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import QRCode from 'qrcode.react'
import { Modal } from '@mantine/core'
import { Header } from '../../../Common/Header/Header'
import * as styles from './qr-generatorAdm.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { QrModalVisitor } from './QrModalVisitor/qrModalVisitor'
import type { IQrVisitor } from '../../../../interfaces'

moment.locale('es')
moment.updateLocale('es', {
  weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
  monthsShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ],
})
const localizer = momentLocalizer(moment)

const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  showMore: total => `+ Ver más (${total})`,
}

export function QrGeneratorAdm() {
  const [VisitorQR, setVisitorQR] = useState<Array<IQrVisitor>>([])
  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<IQrVisitor | null>(null)

  const handleSelectEvent = (event: IQrVisitor) => {
    setSelectedEvent(event)
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedEvent(null)
    setOpen(false)
  }

  const events = VisitorQR.map((visitorQR) => {
    return {
      title: visitorQR.visitor.name,
      start: new Date(visitorQR.start),
      end: new Date(visitorQR.end),
    }
  })

  return (
    <div className={styles.container}>
      <Header title="Generador QR" />
      <div className={styles.wrapper}>
        <QrModalVisitor onSave={(data) => { setVisitorQR([...VisitorQR, data]) }} />
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
          />
          {selectedEvent && (
          <Modal
            opened={open}
            onClose={handleClose}
          >
            <Modal.Title className={styles.dialogTitle}>{selectedEvent.visitor ? selectedEvent.visitor.name : 'Evento'}</Modal.Title>
            <Modal.Body>
              <div className={styles.fieldset}>
                <label className={styles.label}>Hora de entrada</label>
                <div className={styles.input}>Entrada</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <QRCode value={JSON.stringify(selectedEvent)} />
              </div>
            </Modal.Body>
            <div className={styles.saveContainer}>
              <button className={styles.closeButton} onClick={handleClose}>Cerrar</button>
            </div>
          </Modal>
          )}
        </div>
      </div>
    </div>
  )
}
