import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconNotePencil from '@iconify-icons/ph/note-pencil'
import iconDisplay from '@iconify-icons/ph/caret-up-thin'
import { Icon } from '@iconify/react'
import styles from '../../Admin.module.scss'

export function ShowChecklist() {
  const [state, setState] = useState(true)
  let flip = 'vertical'

  const navigate = useNavigate()

  if (state)
    flip = 'horizontal'

  return (
    <>
      <button onClick={() => setState(!state)}>Checklist <Icon className={styles.icon} icon={iconDisplay} flip={flip} /></button>
      {state
        ? (
          <>
            <a href="#" onClick={() => (navigate('vehicleChecklist'))}> <Icon className={styles.icon} icon={iconNotePencil} />Unidades</a>
            <a href="#" onClick={() => (navigate('trailerChecklist'))}> <Icon className={styles.icon} icon={iconNotePencil} />Remolques</a>
          </>
          )
        : null
          }
    </>
  )
}
