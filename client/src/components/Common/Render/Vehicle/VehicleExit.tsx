/* eslint-disable multiline-ternary */
import { Icon } from '@iconify/react'
import iconTruck from '@iconify-icons/ph/truck'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { ExitUnitStore } from '../../../../zustand/ExitUnitStore'
import { Checklist } from '../../../operator-layout/checklist/checklist'
import { RemoveElement } from '../RemoveElement'
import * as styles from './VehicleRender.css'
import type { IChecklist } from '../../.././../interfaces'

export function RenderVehicle() {
  const { ExitUnit, addChecklistVechicle } = ExitUnitStore()
  console.log('MyExitUnit:', ExitUnit)
  useEffect(() => {
    console.log('estado del vehicle exit driver')
    console.log(ExitUnit)
  }, [ExitUnit])
  return (
    ExitUnit.Vehicle?.id ? (
      <AnimatePresence key={ExitUnit.Vehicle?.id}>
        <motion.div
          key={ExitUnit.Vehicle.id}
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
              <Icon className={styles.existingIcon} icon={iconTruck} />
              <p className={styles.badge} style={{ fontWeight: 'bold' }}>Unidad</p>
            </div>
            <button>
              <Checklist
                Questions={ExitUnit.Vehicle.VehicleType?.Question}
                Checklist={ExitUnit.Vehicle.frontendChecklistSave}
                plates={ExitUnit.Vehicle.plate}
                onSave={(data: IChecklist) => {
                  addChecklistVechicle(data)
                }}
              />
            </button>
          </div>
          <div className={`${styles.detailsContent} fontSize`}>
            <div className={styles.flexGrow}>
              <p><p className={styles.typeLetter}>Empresa : </p>{ExitUnit.Vehicle?.Company?.name}</p>
              <p> <p className={styles.typeLetter}>Número de Unidad / Económico : </p>{ExitUnit.Vehicle.unitNumber}</p>
              <p> <p className={styles.typeLetter}>Tipo de Unidad : </p>{ExitUnit.Vehicle.VehicleType?.name}</p>
              <p> <p className={styles.typeLetter}>Placas : </p>{ExitUnit.Vehicle.plate}</p>
              <p><p className={styles.typeLetter}>VIN : </p>{ExitUnit.Vehicle.vin}</p>

            </div>
            <div className={styles.buttonContainer}>
              <RemoveElement vehicle checklist message="Vehiculo" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    ) : null
  )
}
