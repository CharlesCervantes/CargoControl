import { useEffect, useState } from 'react'
import { DateTimePicker } from '@mantine/dates'
import moment from 'moment'
import QRCode from 'qrcode.react'
import { getVisitorTypes } from '../../../fetch/Visitor/getVisitorTypes'
import { qrEmail } from '../../Notifications/notifications'
import { Header } from '../../Common/Header/Header'
import SelectListVisitor from '../../Common/Select-list/Select-listQR'
import { useForm } from '../../../tools/useForm'
import { postCreateQrVisitorPreEntrance } from '../../../fetch/QrVisitors/create'
import styles from './qr-visitor.module.css'
import type { IQrVisitor, IVisitorType } from '../../../interfaces'

function Fieldset(props: any) {
  const { children, show } = props
  return <fieldset style={{ display: show ? 'block' : 'none' }} className={styles.fieldset}>{children}</fieldset>
}

function ProgressBar(props: any) {
  const { steps, currentStep } = props
  return (
    <ul className={styles.progressbar}>
      {steps.map((step, index) => (
        <li key={index} className={index < currentStep ? styles.active : ''}>
          {step}
        </li>
      ))}
    </ul>
  )
}

export function QrVisitorForm() {
  const numberVisits: Array<string> = [
    'Cantidad de visitantes',
    '1',
    '2',
    '3',
    '4',
  ]
  const [currentStep, setCurrentStep] = useState(1)
  const [typeOfVisit, setTypeOfVisit] = useState<Array<IVisitorType>>([])
  const [valueVisitorType, setValueVisitorType] = useState<IVisitorType>()
  const [newVisitorQr, setNewVisitorQr] = useState<IQrVisitor | null>(null)
  const [startDate, setStartDate] = useState(null)
  const [numVisits, setNumVisits] = useState(numberVisits[0])
  const { onChange, onSubmit, values, onReset } = useForm(handleSave, {
    id: '',
    start: '',
    end: '',
    numVisitors: '',
    visitor: {
      name: '',
      curp: '',
      identification_url: '',
      picture_url: '',
      security_social_number: '',
      visitorTypeId: '',
    },
    vehicle: {
      plates: '',
      brand: '',
      model: '',
      color: '',
    },
    email: '',
    subject: '',
    company: '',
    badge: '',
  })

  function handleSave() {
    const dataV: IQrVisitor = {
      id: '423423423',
      dateTime: '07/13/2023',
      dateTime_updated_at: '07/13/2023',
      start: '07/13/2023',
      end: '07/13/2023',
      numVisitors: 4,
      Visitor: [{
        name: 'Charles Cervantes',
        visitorTypeId: 'clj8z6vaa0008tkro5t6qdjdt',
      }],
      vehicle: {
        id: '4234235345',
        plates: '345345',
        brand: 'Ford',
        model: 'Focus',
        color: 'Blanco',
      },
      email: 'Charles_2001@outlook.es',
      subject: 'Motivo Prueba',
      company: 'Industrial Code',
      badge: '423543',
    }
    // event.preventDefault()
    // const startMoment = moment(startDate)
    // const endMoment = startMoment.clone().add(1, 'hour')

    // const newVisitorQr = {
    //   start: startMoment.toISOString(),
    //   end: endMoment.toISOString(),
    //   numVisitors: values.numVisitors,
    //   visitorType: valueVisitorType,
    //   visitor: {
    //     name: values.name,
    //     curp: values.curp,
    //     identification_url: values.identification_url,
    //     picture_url: values.picture_url,
    //     security_social_number: values.security_social_number,
    //     visitorTypeId: values.valueVisitorType?.id || '',
    //   },
    //   vehicle: {
    //     plates: values.plates,
    //     brand: values.brand,
    //     model: values.model,
    //     color: values.color,
    //   },
    //   email: values.email,
    //   subject: values.subject,
    //   company: values.company,
    //   badge: values.badge,
    // }

    // setNewVisitorQr(newVisitorQr)
    // console.log(newVisitorQr)
    // onReset()

    console.log(dataV)

    const result = postCreateQrVisitorPreEntrance(dataV)
    console.log(result)
  }

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleNumVisitsChange = (e) => {
    const selectedNumVisits = e.target.value
    setNumVisits(selectedNumVisits)
    onChange(e)
  }

  useEffect(() => {
    const fetchData = async() => {
      try {
        const data = await getVisitorTypes()
        setTypeOfVisit(data)
      } catch (error) {
      }
    }
    fetchData()
  }, [])

  const steps = ['Datos', 'Visitante', 'Vehiculo', 'QR']

  return (
    <div className={styles.container}>
      {/* <Header title="Generar visita" />
      <form className={styles.msform} id="msform" onSubmit={handleSave}>
        <ProgressBar steps={steps} currentStep={currentStep} />

        <Fieldset show={currentStep === 1}>
          <h2 className={styles['fs-title']}>Datos generales</h2>
          <DateTimePicker
            className={styles.calendarPicker}
            dropdownType="modal"
            placeholder="Seleccione fecha y hora"
            onChange={date => setStartDate(date)}
            classNames={{
              placeholder: styles.placeHolder,
              input: 'placeholder',
              wrapper: 'placeholder',
            }}
            locale="es"
          />
          <SelectListVisitor
            name="Tipo de visita"
            data={typeOfVisit}
            valueKey="id"
            onChange={(selectedValue) => {
              if (selectedValue !== undefined)
                setValueVisitorType(selectedValue)
            }}
          />
          <input onChange={onChange} type="text" name="company" placeholder="Empresa" />
          <input onChange={onChange} required type="email" name="email" placeholder="Correo" />

          <input type="button" name="next" className={styles['action-button']} value="Siguiente" onClick={handleNext} />
        </Fieldset>

        <Fieldset show={currentStep === 2}>
          <h2 className={styles['fs-title']}>Visitante</h2>
          <select
            id="numVisitors"
            value={numVisits}
            onChange={handleNumVisitsChange}
            placeholder="Cantidad de visitantes"
          >
            {numberVisits.map(visits => (
              <option key={visits} value={visits}>
                {visits}
              </option>
            ))}
          </select>
          <input
            onChange={onChange}
            required
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
          />
          <input
            onChange={onChange}
            required
            type="text"
            id="curp"
            name="curp"
            placeholder="CURP"
          />
          <input onChange={onChange} type="text" id="badge" name="badge" placeholder="Gafete" />
          <input type="button" name="previous" className={styles['action-button']} value="Anterior" onClick={handlePrevious} />
          <input type="button" name="next" className={styles['action-button']} value="Siguiente" onClick={handleNext} />
        </Fieldset>

        <Fieldset show={currentStep === 3}>
          <h2 className={styles['fs-title']}>Vehiculo</h2>
          <input onChange={onChange} type="text" name="plates" placeholder="Placas" />
          <input onChange={onChange} type="text" name="brand" placeholder="Marca" />
          <input onChange={onChange} type="text" name="model" placeholder="Modelo" />
          <input onChange={onChange} type="text" name="color" placeholder="Color" />
          <input type="button" name="previous" className={styles['action-button']} value="Anterior" onClick={handlePrevious} />
          <input type="button" name="next" className={styles['action-button']} value="Siguiente" onClick={handleNext} />
        </Fieldset>

        <Fieldset show={currentStep === 4}>
          <h2 className={styles['fs-title']}>QR</h2>
          <div>
            <QRCode value={JSON.stringify(newVisitorQr)} />
          </div>
          <input type="button" name="previous" className={styles['action-button']} value="Anterior" onClick={handlePrevious} />
          <input type="submit" name="submit" className={styles['action-button']} value="Enviar" />
        </Fieldset>
      </form> */}
      <button onClick={handleSave}>test data</button>
    </div>
  )
}
