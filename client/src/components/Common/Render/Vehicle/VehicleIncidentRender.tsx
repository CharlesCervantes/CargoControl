import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { IncidentStore } from '../../../../zustand/incidentStore'
import * as styles from '../../../operator-layout/operator-incident/operator-incidents.css'
import type { IVehicle } from '../../../../interfaces'

interface IDriverIncidentProps {
  vehicle: IVehicle
}

export function VehicleIncidentRender(props: IDriverIncidentProps) {
  const { vehicle } = props
  const { removeVehicle } = IncidentStore()

  return (
    <div key={vehicle.id} className={styles.flexx3}>
      <p>
        <p className={styles.typeLetter}>Vehículo:</p>
        {vehicle.unitNumber} | {vehicle.VehicleType?.name}
      </p>
      <button>
        <Icon onClick={() => removeVehicle(vehicle.id || '')} className={styles.iconTrash2} icon={iconTrash} />
      </button>
    </div>
  )
}
