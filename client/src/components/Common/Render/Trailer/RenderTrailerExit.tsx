import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import iconTow from '@iconify-icons/tabler/truck-loading'
import { responseStore } from '../../../../zustand/responseStore'
import { Checklist } from '../../../operator-layout/checklist/checklistExit'
import { RemoveElement } from '../RemoveElement'
import { ExitUnitStore } from '../../../../zustand/ExitUnitStore'
import * as styles from './RenderTrailer.css'
import type { IChecklist, IResponse, ITrailer } from 'src/interfaces'

export function RenderTrailer() {
  const { ExitUnit, addCheklistToTrailer } = ExitUnitStore()
  const { getResponses, resetResponses } = responseStore()
  const storedResponses = responseStore.getState().getResponses()
  console.log(storedResponses)
  let newTrailer: ITrailer

  function asigningChecklistToTrailer() {
    if (ExitUnit.Trailer?.length && ExitUnit.Trailer.length > 0) {
      const trailer = ExitUnit.Trailer
      console.log('1.38: Trailer de ExitUnit:', trailer)
      const validResponses = getResponses()
      // resetResponses()
      newTrailer.tempResponse = validResponses
      console.log('1.38: validResponses:', validResponses)
    }
  }

  return (
    <div>
      {ExitUnit.Trailer?.map((trailer, index) => (
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
              <button
                onClick={() => {
                  console.log('1.41Index:', index)
                  asigningChecklistToTrailer()
                }}
              >
                {/* TODO: crear metodo para setear los datos en el estado de la salida */}
                <Checklist
                  Questions={trailer.TrailerType?.Question}
                  onSave={(data: IChecklist) => addCheklistToTrailer(index, data)}
                  plates={trailer.plate}
                  unitId={trailer.id}
                  trailer={trailer}
                  isExit
                />
              </button>
            </div>
            <div className={`${styles.detailsContent} fontSize`}>
              <div className={styles.flexGrow}>
                <p> <p className={styles.typeLetter}>Empresa: : </p>{trailer.Company?.name}</p>
                <p> <p className={styles.typeLetter}>Número de Unidad : </p>{trailer.number}</p>
                <p> <p className={styles.typeLetter}>Tipo de Remolque : </p>{trailer.TrailerType?.name}</p>
                <p> <p className={styles.typeLetter}>Placas : </p>{trailer.plate}</p>
                <p> <p className={styles.typeLetter}>Tipo de carga : </p>{trailer.seal}</p>
                <p> <p className={styles.typeLetter}>VIN : </p>{trailer.vin}</p>
              </div>
              <div className={styles.buttonContainer}>
                {/* <button>
                      <EditTow
                          object={tow}
                          onEdit={onEdit}
                      />
                      </button> */}
                <RemoveElement trailer checklist trailerIndex={trailer.id || ''} message="Trailer" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  )
}
