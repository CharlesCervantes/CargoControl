import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useState } from 'react'
import moment from 'moment'
import { Header } from '../../Common/Header/Header'
import * as styles from './qr-calendar.css'
import type { IQrVisitor } from '../../../interfaces'

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

const localizer = momentLocalizer(moment)

export function QrCalendar() {
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
      <Header title="Calendario" />
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
      </div>
    </div>
  )
}
