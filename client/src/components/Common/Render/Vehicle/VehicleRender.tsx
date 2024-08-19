/* eslint-disable multiline-ternary */
import { Icon } from '@iconify/react'
import iconTruck from '@iconify-icons/ph/truck'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Group, Modal, Title, Tooltip } from '@mantine/core'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'
import { Checklist } from '../../../operator-layout/checklist/checklist'
import { RemoveElement } from '../RemoveElement'
import { EditVehicleRender } from './EditVehicleRender'
import * as styles from './VehicleRender.css'
import type { IChecklist, IVehicle } from '../../.././../interfaces'

interface IVehicleRenderProps {
  vehicle: IVehicle
  handleVehicleUpdate: (updatedVehicle: IVehicle) => void
}

export function RenderVehicle(props: IVehicleRenderProps) {
  const { entrance, setVehicleCheklist } = EntranceUnitStore()
  const { vehicle: initialVehicle } = props
  const [vehicle, setVehicle] = useState(initialVehicle)

  function handleVehicleUpdate(updatedVehicle: IVehicle) {
    console.log('1.28 Vehículo actualizado render:', updatedVehicle)
    const newRender: IVehicleRenderProps = {
      vehicle: updatedVehicle,
    }
    setVehicle(updatedVehicle)
    props.handleVehicleUpdate(updatedVehicle)
  }

  return (
    entrance.Vehicle?.id ? (
      <AnimatePresence key={entrance.Vehicle?.id}>
        <motion.div
          key={entrance.Vehicle.id}
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
                Questions={entrance.Vehicle.VehicleType?.Question}
                Checklist={entrance.Vehicle.frontendChecklistSave}
                plates={entrance.Vehicle.plate}
                onSave={(data: IChecklist) => {
                  setVehicleCheklist(data)
                }}
              />
            </button>
          </div>
          <div className={`${styles.detailsContent} fontSize`}>
            <div className={styles.flexGrow}>
              <p><p className={styles.typeLetter}>Empresa : </p>{entrance.Vehicle.Company?.name}</p>
              <p> <p className={styles.typeLetter}>Número de Unidad / Económico : </p>{entrance.Vehicle.unitNumber}</p>
              <p> <p className={styles.typeLetter}>Tipo de unidad : </p>{entrance.Vehicle.VehicleType?.name}</p>
              <p> <p className={styles.typeLetter}>Placas : </p>{entrance.Vehicle.plate}</p>
              <p><p className={styles.typeLetter}>VIN : </p>{entrance.Vehicle.vin}</p>

            </div>
            <div className={styles.buttonContainer}>
              <button>
                <Tooltip label="Editar Conductor">
                  <EditVehicleRender id={entrance.Vehicle.id} onVehicleUpdate={handleVehicleUpdate} />
                </Tooltip>
              </button>

              <button className={styles.deleteButton}>
                <RemoveElement vehicle checklist message="Vehiculo" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    ) : null
  )
}
