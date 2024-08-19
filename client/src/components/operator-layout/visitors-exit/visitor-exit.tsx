import { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import { toast } from 'react-hot-toast'
import { Header } from '../../Common/Header/Header'
import { SwipeButton } from '../../Common/Buttons/Buttons'
import { ExitVisitorStore } from '../../../zustand/ExitVisitorStore'
import { VisitorRender } from '../../Common/Render/Visitor/VisitorRender'
import { locationStore } from '../../../zustand/locationsStore'
import { RenderVehicleVisitor } from '../../Common/Render/VehicleVisitor/VehicleVisitorRender'
import { createExitVisitorFetch } from '../../../fetch/ExitVisitor/Post'
import { VisitorForm } from './visitorExit-form/visitorExit-form'
import { VehicleVisitorExitForm } from './visitVehicleExit-form/visitorVehicleExit-form'
import * as styles from './visitor-exit.css'
import type { IVisitorExit } from 'src/interfaces'
import '../responsive.css'

export function VisitorExit() {
  const { ExitVisitor, setlocationId, resetExitVisitor } = ExitVisitorStore()
  const { deviceLocation } = locationStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async() => {
    setIsLoading(true)
    try {
      // console.log(deviceLocation)
      if (deviceLocation.id === 'notFound' || deviceLocation.id === '') {
        toast.error('No se ha configurado la ubicación del dispositivo')
        setIsLoading(false)

        return null
      }

      if (deviceLocation.id) {
        const newVisitorExit: IVisitorExit = {
          organizationId: '',
          Visitors: ExitVisitor.Visitors,
          locationId: deviceLocation.id,
          VehicleVisitor: ExitVisitor.VehicleVisitor,
        }

        console.log(newVisitorExit)

        if (ExitVisitor.Visitors.length < 1) {
          toast.error('Seleccione al menos un visitante para la salida')
          setIsLoading(false)
          return null
        }

        // console.log(ExitVisitor)
        const response = await createExitVisitorFetch(newVisitorExit)

        if (response.ok === true)
          toast.success('Registro guardado exitosamente!!!')
      }
    } catch (error) {
      console.error('Error producido en funcion handleSave: ', error)
      toast.error(`Error al registar salida: ${error}`)
    }
    resetExitVisitor()
    setIsLoading(false)
  }

  useEffect(() => {
  }, [ExitVisitor])

  return (
    <div className={styles.container}>
      <Header title="Salida de visitantes" />
      <div className={`${styles.content} contentResp contentMov`}>
        {isLoading
          ? (
            <div className={styles.loader}>
              <Loader color="dark" size="xl" variant="bars" />
            </div>
            )
          : (

            <div className={`${styles.existing} padding`}>
              {ExitVisitor.Visitors.map(v => (
                <VisitorRender key={v.id} visitor={v} />
              ))}
              {ExitVisitor.VehicleVisitor ? <RenderVehicleVisitor vehicleVisitor={ExitVisitor.VehicleVisitor} /> : null}
            </div>
            )}
        <div className={`${styles.actions} actions actionsMov`}>
          <div className={`${styles.add} respAdd addMov`}>
            <VisitorForm />
            <VehicleVisitorExitForm />
          </div>
          <SwipeButton
            onClick={handleSave}
            isEnter={false}
          />
        </div>
      </div>
    </div>
  )
}
