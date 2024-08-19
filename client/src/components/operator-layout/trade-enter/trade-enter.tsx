import { Loader } from '@mantine/core'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { postCreateUnitEntrace } from '../../../fetch/EntranceUnits/postCreateUnit'
import { Header } from '../../Common/Header/Header'
import { SwipeButton } from '../../Common/Buttons/Buttons'
import { RenderDriver } from '../../Common/Render/Driver/DriverRender'
import { RenderVehicle } from '../../Common/Render/Vehicle/VehicleRender'
import { RenderTrailer } from '../../Common/Render/Trailer/RenderTrailer'
import { EntranceUnitStore } from '../../../zustand/EntraceUnitStore'
import { orderData } from '../../../tools/entranceUnitsPrepare'
import { locationStore } from '../../../zustand/locationsStore'
import * as styles from './trade-enter.css'
import { DriverForm } from './driver/driver'
import { Vehicle } from './vehicle/vehicle'
import { TowForm } from './tow/tow'

export function TradeEnter() {
  const [Loading, setLoading] = useState(false)
  const { entrance, setLocationID, resetEntrance } = EntranceUnitStore()
  const [editable, setEditable] = useState(false)
  const { deviceLocation } = locationStore()

  function handleDriverUpdate(updatedData) {
    entrance.Driver = updatedData
    console.log('1.28: Conductor actualizado en Enter:', entrance.Driver)
  }

  function handleVehicleUpdate(updatedData) {
    entrance.Vehicle = updatedData
    console.log('1.28: Vehículo actualizado en Enter:', entrance.Vehicle)
  }

  function handleTrailerUpdate(updatedData) {
    if (entrance.Trailer) {
      for (let i = 0; i < entrance.Trailer?.length; i++) {
        if (updatedData.id === entrance.Trailer[i].id) entrance.Trailer[i] = updatedData
        console.log('1.28: Remolque actualizado en Enter:', entrance.Trailer[i])
      }
    }
  }

  async function saveEntrace() {
    if (deviceLocation.id !== 'notFound') {
      setLoading(true)
      console.log('1.18LocationInStore:', deviceLocation)
      try {
        entrance.locationId = deviceLocation.id
        // setLocationID(deviceLocation.id)
        console.log('1.18Entrance:', entrance)

        if (!entrance.Driver?.id) {
          toast.error('Ingresa un conductor')
          setLoading(false)
          return null
        }

        if (!entrance.Vehicle?.id) {
          toast.error('Ingresa un vehículo')
          setLoading(false)
          return null
        }

        if (!entrance.Vehicle.Checklist) {
          toast.error('El checklist del vehículo es requerido')
          setLoading(false)
          return null
        }

        entrance.Trailer?.forEach((trailer) => {
          if (!trailer.Checklist) {
            toast.error(`Por favor, realiza la inspección ${trailer.number || ''}`)
            setLoading(false)
            return null
          }
        })
        const { entranceData, imagesData } = await orderData(entrance, true)
        console.log('1.18MyEntranceData:', entranceData, 'ImagesData:', imagesData)
        await postCreateUnitEntrace(entranceData, imagesData)
          .then((response) => {
            if (response.ok) {
              toast.success(response.message)
              resetEntrance()
            }
          })
          .catch((error) => {
            toast.error(`${error}`)
            console.log(error)
          })
      } catch (error) {
        console.log(error)
        toast.error(`Ha ocurrido un error: ${error}`)
      }
      setLoading(false)
    } else {
      toast.error('Por favor, configura la ubicación desde la configuración')
    }
  }

  useEffect(() => {
    console.log('Entrada Recibida:', entrance)
  }, [entrance])

  return (
    <div className={styles.container}>
      <Header title="Entrada de Unidades" />
      <div className={`${styles.content} contentResp contentMov`}>
        {Loading
          ? (
            <div className={styles.loader}>
              <Loader color="dark" size={90} variant="dots" />
            </div>
            )
          : (
            <div className={`${styles.existing} padding`}>
              <RenderDriver driver={entrance.Driver} handleDriverUpdate={handleDriverUpdate} />
              <RenderVehicle vehicle={entrance.Vehicle} handleVehicleUpdate={handleVehicleUpdate} />
              <RenderTrailer trailer={entrance.Trailer} handleTrailerUpdate={handleTrailerUpdate} />
            </div>
            )}
        <div className={`${styles.actions} actions actionsMov`}>
          <div className={`${styles.add} respAdd addMov`}>
            <DriverForm setEditable={setEditable} />
            <Vehicle />
            <TowForm />
          </div>
          <SwipeButton
            isEnter
            onClick={saveEntrace}
          />
        </div>
      </div>
    </div>
  )
}
