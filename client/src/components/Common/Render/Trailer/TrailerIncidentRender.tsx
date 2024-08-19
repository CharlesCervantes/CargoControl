import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { IncidentStore } from '../../../../zustand/incidentStore'
import * as styles from '../../../operator-layout/operator-incident/operator-incidents.css'
import type { ITrailer } from '../../../../interfaces'

interface IDriverIncidentProps {
  trailer: ITrailer
}

export function TrailerIncidentRender(props: IDriverIncidentProps) {
  const { trailer } = props
  const { removeTrailers } = IncidentStore()
  return (
    <div key={trailer.id} className={styles.flexx3}>
      <p>
        <p className={styles.typeLetter}>Trailer:</p>
        {trailer.number} | {trailer.plate}
      </p>
      <button>
        <Icon onClick={() => removeTrailers(trailer.id || '')} className={styles.iconTrash2} icon={iconTrash} />
      </button>
    </div>
  )
}
