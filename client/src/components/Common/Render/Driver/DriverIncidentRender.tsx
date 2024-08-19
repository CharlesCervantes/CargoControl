import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { IncidentStore } from '../../../../zustand/incidentStore'
import * as styles from '../../../operator-layout/operator-incident/operator-incidents.css'
import type { IDriver } from '../../../../interfaces'

interface IDriverIncidentProps {
  driver: IDriver
}

export function DriverIncidentRender(props: IDriverIncidentProps) {
  const { driver } = props
  const { removeDrivers } = IncidentStore()
  return (
    <div key={driver.id} className={styles.flexx3}>
      <p>
        <p className={styles.typeLetter}>Conductor:</p>
        {driver.Person?.name} | {driver.Company?.name}
      </p>
      <button>
        <Icon onClick={() => removeDrivers(driver.id || '')} className={styles.iconTrash2} icon={iconTrash} />
      </button>
    </div>
  )
}
