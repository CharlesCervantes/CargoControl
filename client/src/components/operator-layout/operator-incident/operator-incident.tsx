/* eslint-disable import/order */
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Header } from '../../Common/Header/Header'
import { getEveryLocation } from '../../../fetch/Locations/getLocations'
import { locationStore } from '../../../zustand/locationsStore'
import * as styles from './operator-incidents.css'
import { Camera } from '../../Camera/Camera'
import { Loader, Select, TextInput, Textarea } from '@mantine/core'
import '../responsive.css'
import type { SetStateAction } from 'react'
import type { IArrImages, IDriver, IIncident, ILocation, ITrailer, IVehicle, IVisitor, IncidentReport } from '../../../interfaces'
import { CarouselModal } from '../../Camera/CarouselModal'
import { useStore } from 'zustand'
import { IncidentStore } from '../../../zustand/incidentStore'
import { DriverFormIncident } from './Forms-Incidents/DriverFormIncident'
import { DriverIncidentRender } from '../../Common/Render/Driver/DriverIncidentRender'
import { VisitorFormIncident } from './Forms-Incidents/VisitorFormIncident'
import { VisitorIncidentRender } from '../../Common/Render/Visitor/VisitorIncidentRender'
import { TrailerFormIncident } from './Forms-Incidents/TrailerFormIncident'
import { TrailerIncidentRender } from '../../Common/Render/Trailer/TrailerIncidentRender'
import { VehicleFormIncident } from './Forms-Incidents/VehicleFormIncident'
import { VehicleIncidentRender } from '../../Common/Render/Vehicle/VehicleIncidentRender'
import { toast } from 'react-hot-toast'
import { CreateIncident } from '../../../fetch/Incidents/postIncident'
import { useForm } from '@mantine/form'

import { imagesStore } from '../../../zustand/fileStore'
import { createId } from '@paralleldrive/cuid2'
// import type { IDriver } from '../../../interfaces'

export function OperatorIncident() {
  // Estados para llenar el formulario
  const [incidentReport, setIncidentReport] = useState<Array<IncidentReport>>([])
  const [currentTime, setCurrentTime] = useState(moment().format('hh:mm:ss A'))
  const [imageS, setImageS] = useState<any>(null)
  const { addImage, images, resetImages } = imagesStore()
  const { Incident, setReport, setSubject, resetIncident } = useStore(IncidentStore)
  const { locations: dataLocations, setLocations } = useStore(locationStore)
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('Ninguna')
  const [isLoading, setIsLoading] = useState(false)

  // usef
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('hh:mm:ss A'))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const getDataLocation = async() => {
      try {
        const locationsData = await getEveryLocation()
        setLocations(locationsData.data)
      } catch (error) {
        console.log(error)
      }
    }
    getDataLocation()
  }, [])

  const form = useForm({
    initialValues: {
      subject: '',
      location: '',
      report: '',
    },
  })

  const deleteReport = (id: string | number) => {
    const filterReport = incidentReport.filter(incidentReport => incidentReport.id !== id)
    setIncidentReport(filterReport)
  }

  const handleCancelar = () => {
    form.reset()
    resetIncident()
    resetImages()
  }

  // Guardar Reporte
  async function saveIncident(values: any) {
    setIsLoading(true)
    try {
      const incidentData: IIncident = {
        subject: values.subject,
        report: values.report,
        locationId: values.location,
        Driver: Incident.Driver,
        Visitor: Incident.Visitor,
        Vehicle: Incident.Vehicle,
        Trailer: Incident.Trailer,
        organizationId: '',
      }
      const result = await CreateIncident(incidentData, images)
      toast.success('Incidente creado')
      resetImages()
      resetIncident()
      form.reset()
    } catch (error) {
      toast.error('Error al mandar')
    }
    setIsLoading(false)
  }

  const handleImageCaptured = (image: any) => {
    const imageId = createId()
    const newImage: IArrImages = { name: `${imageId}incident.png`, base64: image }
    addImage(newImage)
    setImageS(image)
  }

  return (
    <div className={styles.container}>
      <Header title="Incidentes" />
      {isLoading
        ? (
          <div className={styles.loaderDiv}>
            <Loader color="dark" size="xl" variant="bars" />
          </div>
          )
        : (
          <div className={styles.divisorContainer}>
            <div className={styles.containerLeft}>
              <div>
                <div className={styles.ubicacionContainer}>
                  <label className={styles.label} htmlFor="ubicacion"> Elementos involucrados </label>
                  <div className={styles.elementosContainer}>
                    <DriverFormIncident />
                    <VisitorFormIncident />
                    <VehicleFormIncident />
                    <TrailerFormIncident />
                  </div>

                  {Incident.Driver?.map(driver => (
                    <DriverIncidentRender
                      key={driver.id}
                      driver={driver}
                    />
                  ))}

                  {Incident.Visitor?.map(visitor => (
                    <VisitorIncidentRender
                      key={visitor.id}
                      visitor={visitor}
                    />
                  ))}

                  {Incident.Vehicle?.map(vehicle => (
                    <VehicleIncidentRender
                      key={vehicle.id}
                      vehicle={vehicle}
                    />
                  ))}

                  {Incident.Trailer?.map(trailer => (
                    <TrailerIncidentRender
                      key={trailer.id}
                      trailer={trailer}
                    />
                  ))}
                </div>
                <div className={styles.contentForm}>
                  <form onSubmit={form.onSubmit(values => saveIncident(values))}>

                    <TextInput
                      size="md"
                      radius="md"
                      label="Asunto"
                      withAsterisk
                      description="Describa el incidente"
                      placeholder="Describa el incidente de manera detallada"
                      {...form.getInputProps('subject')}
                    />

                    <Select
                      label="Ubicación"
                      size="md"
                      radius="md"
                      placeholder="Seleccione la ubicación del incidente"
                      withAsterisk
                      data={dataLocations.map(locations => ({ value: locations.id, label: locations.name }))}
                      {...form.getInputProps('location')}
                    />

                    <Textarea
                      size="md"
                      radius="md"
                      label="Reporte"
                      withAsterisk
                      description="Describa el reporte"
                      placeholder="Describa el reporte de manera detallada"
                      {...form.getInputProps('report')}
                    />
                    <div className={styles.elementosContainerCamera}>
                      <div style={{ marginRight: '10px' }}>
                        <Camera
                          disabled={false}
                          Image={(image: any) => handleImageCaptured(image)}
                        />
                      </div>
                      <CarouselModal />
                    </div>
                    <div className={styles.buttonContainer2}>
                      <div className={styles.buttonDiv} >
                        <button className={styles.closeButton} type="button" onClick={handleCancelar}>
                          Cancelar
                        </button>
                      </div>
                      <div className={styles.buttonDiv}>
                        <button
                          className={`${(!form.values.subject || !form.values.report) ? styles.styleGray : styles.button}`}
                          type="submit"
                          disabled={!form.values.subject || !form.values.report}
                        >
                          Crear Reporte
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          )
      }
    </div>
  )
}
