/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import { toast } from 'react-hot-toast'
import { postCreateUnitExit } from '../../../fetch/ExitUnits/postCreateExitUnit'
import { getDriversInside } from '../../../fetch/Drivers/getDriversInside'
import { getVehiclesInside } from '../../../fetch/Vehicles/getVehiclesInside'
import { getTrailersInside } from '../../../fetch/Trailers/getTrailersInside'
import { Header } from '../../Common/Header/Header'
import { SwipeButton } from '../../Common/Buttons/Buttons'
import { ExitUnitStore } from '../../../zustand/ExitUnitStore'
import { orderData } from '../../../tools/exitUnitsPrepare'
import { locationStore } from '../../../zustand/locationsStore'
import { RenderDriver } from '../../Common/Render/Driver/DriverExit'
import { RenderVehicle } from '../../Common/Render/Vehicle/VehicleExit'
import { RenderTrailer } from '../../Common/Render/Trailer/RenderTrailerExit'
import { driverStore } from '../../../zustand/DriverStore'
import { vehicleStore } from '../../../zustand/VehicleStore'
import { trailerStore } from '../../../zustand/TrailerStore'
import { ChecklistStore } from '../../../zustand/checklistStore'
import { responseStore } from '../../../zustand/responseStore'
import { RemoveElement } from '../../Common/Render/RemoveElement'
import { EntranceUnitStore } from '../../../zustand/EntraceUnitStore'
import { DriverExitForm } from './exit-form/driver-exit/driverExit-form'
import { VehicleExitForm } from './exit-form/vehicle-exit/vehicleExit-form'
import { TrailerExitForm } from './exit-form/tow-exit/towExit-form'
import * as styles from './trade-exit.css'
import type { IChecklist, IResponse, ITotalData, ITrailer } from 'src/interfaces'

export interface IAssignChecklistToTrailer {
  trailer: ITrailer
  checklist: IChecklist
}

export function TradeExit() {
  const [isLoading, setIsLoading] = useState(true)
  const [fetchedData, setFetchedData] = useState(null)
  const { ExitUnit, setLocationID, resetExitUnit } = ExitUnitStore()
  const { entrance, resetEntrance } = EntranceUnitStore()
  const { deviceLocation } = locationStore()
  const { setDrivers, drivers } = driverStore()
  const { setVehicle, Vehicle, setVehicles } = vehicleStore()
  const { addResponse, responses, setResponses, getResponses } = responseStore()
  const { setTrailer, Trailer } = trailerStore()
  const { Checklists, getChecklists } = ChecklistStore()
  const totalChecklists = getChecklists()
  const [trailers, setTrailers] = useState<Array<ITrailer>>([])
  const [checklists, setChecklists] = useState<Array<IChecklist>>([])
  const fullData: ITotalData = { }

  useEffect(() => {
    async function fetchData() {
      try {
        const driversData = await getDriversInside()
        setDrivers(driversData.data)
        const vehiclesData = await getVehiclesInside()
        setVehicles(vehiclesData.data)
        const trailersData = await getTrailersInside()
        setTrailer(trailersData.data)

        const data = {
          id: trailersData.data?.id || '',
          driver: driversData.data || null,
          entranceVehicle: vehiclesData.data || null,
          entranceTrailer: trailersData.data || [],
          exitVehicle: vehiclesData.data || null,
          exitTrailer: trailersData.data || [],
        }

        console.log('1.65: Datos obtenidos de operator:', data)

        setFetchedData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const saveExit = async() => {
    if (deviceLocation.id !== 'notFound') {
      try {
        ExitUnit.locationId = deviceLocation.id

        if (!ExitUnit.Driver?.id) {
          toast.error('Ingresa un conductor')
          return null
        }

        if (!ExitUnit.Vehicle?.id) {
          toast.error('Ingresa un vehículo')
          return null
        }

        if (!ExitUnit.Vehicle.Checklist) {
          toast.error('El checklist del vehículo es requerido')
          return null
        }

        ExitUnit.Trailer?.forEach((trailer) => {
          if (!trailer.Checklist) {
            toast.error(`Por favor, realiza la inspección ${trailer.number || ''}`)
            return null
          }
        })
        const { exitData, imagesData } = await orderData(ExitUnit, true)
        await postCreateUnitExit(exitData)
          .then((response) => {
            if (response.ok) {
              toast.success(response.message)
              resetExitUnit()
              setIsLoading(true)
            }
          })
          .catch((error) => {
            toast.error(`${error}`)
            console.log(error)
            setIsLoading(true)
          })
      } catch (error) {
        console.log(error)
        toast.error(`Ha ocurrido un error: ${error}`)
      }
      setIsLoading(true)
    } else {
      toast.error('Por favor, configura la ubicación desde la configuración')
    }
  }

  return (
    <div className={styles.container}>
      <Header title="Salida de Unidades" />
      <div className={`${styles.content} contentResp contentMov`}>
        {isLoading
          ? (
            <Loader color="dark" size="xl" variant="bars" />
            )
          : (
            <div className={`${styles.existing} padding`}>
              <RenderDriver />
              <RenderVehicle />
              <RenderTrailer />
            </div>
            )}
        <div className={`${styles.actions} actions actionsMov`}>
          <div className={`${styles.add} respAdd addMov`}>
            <DriverExitForm />
            <VehicleExitForm />
            <TrailerExitForm />
          </div>
          <SwipeButton
            isEnter={false}
            onClick={saveExit}
          />
        </div>
      </div>
      {/* <ul>
        {Trailer.map(trailer => (
          <li key={trailer.id}>Número del Trailer: {trailer.number}</li>
        ))}
      </ul>
      <ul>
        {Checklists.map(checklist => (
          <li key={checklist.id}>Checklist:</li>
        ))}
      </ul> */}
    </div>
  )
}
