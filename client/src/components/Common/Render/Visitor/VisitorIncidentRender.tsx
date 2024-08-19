import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { IncidentStore } from '../../../../zustand/incidentStore'
import * as styles from '../../../operator-layout/operator-incident/operator-incidents.css'
import type { IVisitor } from '../../../../interfaces'

interface IVisitorIncidentProps {
  visitor: IVisitor
}

export function VisitorIncidentRender(props: IVisitorIncidentProps) {
  const { visitor } = props
  const { removeVisitors } = IncidentStore()
  return (
    <div key={visitor.id} className={styles.flexx3}>
      <p>
        <p className={styles.typeLetter}>Conductor:</p>
        {visitor.Person?.name} | {visitor.Company?.name}
      </p>
      <button>
        <Icon onClick={() => removeVisitors(visitor.id || '')} className={styles.iconTrash2} icon={iconTrash} />
      </button>
    </div>
  )
}
