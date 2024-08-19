import { useState } from 'react'
import { Loader } from '@mantine/core'
import { toast } from 'react-hot-toast'
import { imagesStore } from '../../../zustand/fileStore'
import { VisitorRender } from '../../Common/Render/Visitor/VisitorRender'
import { UpdateVisitor } from '../../Common/modal/Visitor/UpdateVisitor/UpdateVisitor'
import { RenderVehicleVisitor } from '../../Common/Render/VehicleVisitor/VehicleVisitorRender'
import { Header } from '../../Common/Header/Header'
import { SwipeButton } from '../../Common/Buttons/Buttons'
import { useVisitorEnterStore } from '../../../zustand/visitorEnterStore'
import { useVehicleVisitorStore } from '../../../zustand/VehicleVisitorStore'
import { locationStore } from '../../../zustand/locationsStore'
import { CreateVisitorEntrance } from '../../../fetch/EntranceVisitor/Post'
import * as styles from './visitor-enter.css'
import { VehicleVisitor } from './vehicleVisit-form/vehicleVisitForm'
import { VisitorForm } from './visitor-form/visitorModal'
import '../responsive.css'
import type { IVisitorEntrance } from '../../../interfaces'

export function VisitorEnter() {
  const { images, resetImages } = imagesStore()
  const { entrance, setLocationId } = useVisitorEnterStore()
  const { vehicleVisitor } = useVehicleVisitorStore()
  const { deviceLocation } = locationStore()
  const [loading, setLoading] = useState(true)
  const [updatedVisitor, setUpdatedVisitor] = useState(null)
  const [updatedVehicleVisitor, setUpdatedVehicleVisitor] = useState(null)
  const refactor = true

  function handleVisitorUpdate(updatedData) {
    // Actualizar el estado del visitante con los datos actualizados
    setUpdatedVisitor(updatedData)
    console.log('1.28: Visitante actualizado enter:', updatedData)
    for (let i = 0; i < entrance.Visitors.length; i++)
      if (updatedData.id === entrance.Visitors[i].id) entrance.Visitors[i] = updatedData
    console.log('1.28: Enter: Entrance post actualización:', entrance)
  }

  function handleVehicleVisitorUpdate(updatedData) {
    // Actualizar el estado del vehículo de los visitantes con los datos actualizados
    for (let i = 0; i < entrance.Visitors.length; i++) {
      setUpdatedVehicleVisitor(updatedData)
      entrance.VehicleVisitor = updatedData
    }
    console.log('1.28: Vehículo de visitante actualizado enter:', updatedData)
    console.log('1.28: Enter: entrance.VehicleVisitor post actualización:', entrance.VehicleVisitor)
  }

  // async function saveVisitorEntrance() {
  //   setLoading(false)
  //   try {
  //     if (deviceLocation.id === 'notFound' || deviceLocation.id === '') {
  //       toast.error('No se ha configurado la ubicación del dispositivo')
  //       setLoading(true)
  //       return null
  //     } else {
  //       setLocationId(deviceLocation.id || '')
  //     }

  //     if (entrance.Visitors.length < 1) {
  //       toast.error('No hay visitantes para registrar')
  //       setLoading(true)
  //       return null
  //     }

  //     const newEntrance: IVisitorEntrance = {
  //       locationId: deviceLocation.id || '',
  //       organizationId: '',
  //       Visitors: entrance.Visitors,
  //       VehicleVisitor: entrance.VehicleVisitor,
  //     }

  //     // console.log('MYNew Entrance:', newEntrance)

  //     // console.log(newEntrance.Visitors)

  //     const request = await CreateVisitorEntrance(newEntrance, images)
  //     if (request.ok)
  //       toast.success('Entrada registrada')
  //   } catch (error) {
  //     toast.error(`Error al registrar entrada: ${error}`)
  //   }
  //   setLoading(true)
  //   resetImages()
  // }

  async function saveVisitorEntrance() {
    setLoading(false)
    try {
      if (deviceLocation.id === 'notFound' || deviceLocation.id === '') {
        toast.error('No se ha configurado la ubicación del dispositivo')
        setLoading(true)
        return null
      } else {
        setLocationId(deviceLocation.id || '')
      }

      if (entrance.Visitors.length < 1) {
        toast.error('No hay visitantes para registrar')
        setLoading(true)
        return null
      }

      // Crear una copia de la lista de visitantes actualizada
      const updatedVisitors = entrance.Visitors.map((visitor) => {
        console.log('1.28: updatedVisitor: ', updatedVisitor)
        if (visitor.id === updatedVisitor.id)
          return updatedVisitor // Reemplazar el visitante actualizado

        return visitor // Mantener los otros visitantes sin cambios
      })

      // const updatedVehicleVisitors = entrance.Visitors.map((vehicleVisitor) => {
      //   console.log('1.28: updatedVehicleVisitor: ', updatedVehicleVisitor)
      //   if (vehicleVisitor.id === updatedVehicleVisitor.id)
      //     return updatedVehicleVisitor // Reemplazar el visitante actualizado

      //   return vehicleVisitor // Mantener los otros visitantes sin cambios
      // })

      const newEntrance: IVisitorEntrance = {
        locationId: deviceLocation.id || '',
        organizationId: '',
        Visitors: updatedVisitors, // Usar la lista de visitantes actualizada
        VehicleVisitor: entrance.VehicleVisitor,
      }

      const request = await CreateVisitorEntrance(newEntrance, images)
      if (request.ok)
        toast.success('Entrada registrada')
    } catch (error) {
      toast.error(`Error al registrar entrada: ${error}`)
    }
    setLoading(true)
    resetImages()
  }

  return (
    <div className={styles.container}>
      <Header title="Entrada de visitantes" />
      <div className={`${styles.content} contentResp contentMov`}>
        {loading
          ? (
            <div className={`${styles.existing} padding`}>
              {entrance.Visitors.map(visitor => (
                <VisitorRender key={visitor.id} visitor={visitor} handleVisitorUpdate={handleVisitorUpdate} />
              ))}
              {entrance.VehicleVisitor ? <RenderVehicleVisitor vehicleVisitor={entrance.VehicleVisitor} key={entrance.VehicleVisitor.id} handleVehicleVisitorUpdate={handleVehicleVisitorUpdate} /> : <div />}
            </div>
            )
          : (
            <div className={`${styles.loader}`}>
              <Loader color="dark" size="xl" variant="bars" />
            </div>
            )}
        <div className={`${styles.actions} actions actionsMov`}>
          <div className={`${styles.add} respAdd addMov`}>
            <VisitorForm />
            <VehicleVisitor />
          </div>
          <SwipeButton
            isEnter
            onClick={saveVisitorEntrance}
          />
        </div >
      </div >
    </div >
  )
}
