
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import iconVisit from '@iconify-icons/ph/identification-badge'
import { useState } from 'react'
// import iconUpdate from '@iconify-icons/ph/arrow-clockwise-bold'
import iconTrash from '@iconify-icons/ph/trash'
import { Tooltip } from '@mantine/core'
import { RemoveElement } from '../RemoveElement'
import { useVisitorEnterStore } from '../../../../zustand/visitorEnterStore'
import { UpdateVisitor } from '../../../Common/modal/Visitor/UpdateVisitor/UpdateVisitor'
import * as styles from './VisitorRender.css'
import type { IVisitor } from '../../../../interfaces'

interface IVisitorRenderProps {
  visitor: IVisitor
  handleVisitorUpdate: (updatedVisitor: IVisitor) => void
}

export function VisitorRender(props: IVisitorRenderProps) {
  const { visitor: initialVisitor } = props
  const [visitor, setVisitor] = useState(initialVisitor)

  function handleVisitorUpdate(updatedVisitor: IVisitor) {
    console.log('1.28 Visitante actualizado render:', updatedVisitor)
    const newRender: IVisitorRenderProps = {
      visitor: updatedVisitor,
    }
    setVisitor(updatedVisitor)
    props.handleVisitorUpdate(updatedVisitor)
  }

  return (
    <AnimatePresence key={visitor.id}>
      <motion.div
        key={visitor.id}
        className={styles.existingItem}
        tabIndex={0}
        transition={{ duration: 0.7 }}
        initial={{ x: 800 }}
        animate={{ x: 0 }}
        whileHover={{ scale: 1.01 }}
        onHoverStart={(_e) => { }}
        onHoverEnd={(_e) => { }}
      >
        <div className={styles.iconContainer}>
          <div className={styles.flex}>
            <Icon className={styles.existingIcon} icon={iconVisit} />
            <p className={styles.badge} style={{ fontWeight: 'bold' }}>Visitante</p>
          </div>
        </div>
        <div className={`${styles.detailsContent} fontSize`}>
          <div className={styles.flexGrow}>
            <p> <p className={styles.typeLetter}>Tipo de visitante: </p>{visitor.VisitorType?.name}</p>
            <p> <p className={styles.typeLetter}>Nombre: </p>{visitor.Person?.name} {visitor.Person?.lastname}</p>
            <p> <p className={styles.typeLetter}>Empresa: </p>{visitor.Company?.name}</p>
            <p> <p className={styles.typeLetter}>Motivo de visita: </p>{visitor.subject}</p>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => handleVisitorUpdate(props.visitor)}>
              <Tooltip label="Actualizar Usuario">
                <UpdateVisitor id={visitor.id || ''} onVisitorUpdate={handleVisitorUpdate} />
              </Tooltip>
            </button>
            <button >
              <Tooltip label="Eliminar usuario">
                <RemoveElement visitor message="Visitante" idVisitor={typeof visitor.id === 'string' ? visitor.id : ''} />
              </Tooltip>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
