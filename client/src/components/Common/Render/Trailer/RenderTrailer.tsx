import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import iconTow from '@iconify-icons/tabler/truck-loading'
import { useState } from 'react'
import { Button, Group, Modal, Title, Tooltip } from '@mantine/core'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'
import { Checklist } from '../../../operator-layout/checklist/checklist'
import { RemoveElement } from '../RemoveElement'
import { EditTrailerRender } from './EditTrailerRender'
import * as styles from './RenderTrailer.css'
import type { IChecklist, ITrailer } from 'src/interfaces'

interface ITrailerRenderProps {
  trailer: ITrailer
  handleTrailerUpdate: (updatedTrailer: ITrailer) => void
}

export function RenderTrailer(props: ITrailerRenderProps) {
  const {
    entrance,
    setTraileCheklist,
    // removeTrailer,
    // updateTrailerChecklist
  } = EntranceUnitStore()
  const { trailer: initialTrailer } = props
  const [trailer, setTrailer] = useState(initialTrailer)

  function handleTrailerUpdate(updatedTrailer: ITrailer) {
    console.log('1.28 Trailer actualizado render:', updatedTrailer)
    const newRender: ITrailerRenderProps = {
      trailer: updatedTrailer,
    }
    setTrailer(updatedTrailer)
    props.handleTrailerUpdate(updatedTrailer)
  }

  return (
    <div>
      {entrance.Trailer?.map(trailer => (
        <AnimatePresence key={trailer.id}>
          <motion.div
            key={trailer.id}
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
                <Icon icon={iconTow} className={styles.existingIcon} />
                <p className={styles.badge} style={{ fontWeight: 'bold' }}>Remolque</p>
              </div>
              <button>
                <Checklist
                  Questions={trailer.TrailerType?.Question}
                  onSave={(data: IChecklist) => setTraileCheklist(data, trailer.id || '')}
                  plates={trailer.plate}
                // Checklist={trailer.Checklist}
                />
              </button>
            </div>
            <div className={`${styles.detailsContent} fontSize`}>
              <div className={styles.flexGrow}>
                <p> <p className={styles.typeLetter}>Empresa: : </p>{trailer.Company?.name}</p>
                <p> <p className={styles.typeLetter}>Número de Unidad : </p>{trailer.number}</p>
                <p> <p className={styles.typeLetter}>Tipo de Remolque : </p>{trailer.TrailerType?.name}</p>
                <p> <p className={styles.typeLetter}>Placas : </p>{trailer.plate}</p>
                <p> <p className={styles.typeLetter}>Sello : </p>{trailer.seal}</p>
                <p> <p className={styles.typeLetter}>VIN : </p>{trailer.vin}</p>
              </div>
              <div className={styles.buttonContainer}>
                {/* <button>
                      <EditTow
                          object={tow}
                          onEdit={onEdit}
                      />
                      </button> */}
                <button>
                  <Tooltip label="Editar Conductor">
                    <EditTrailerRender id={trailer.id || ''} onTrailerUpdate={handleTrailerUpdate} />
                  </Tooltip>
                </button>

                <button>
                  <RemoveElement trailer checklist trailerIndex={trailer.id || ''} message="Trailer" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  )
}
