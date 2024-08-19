import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import iconCar from '@iconify-icons/ph/car-profile'
import { useState } from 'react'
import iconPencil from '@iconify-icons/ph/pencil'
import { Tooltip } from '@mantine/core'
import { RemoveElement } from '../RemoveElement'
import { useVisitorEnterStore } from '../../../../zustand/visitorEnterStore'
import { ExitVisitorStore } from '../../../../zustand/ExitVisitorStore'
import * as styles from './VehicleVisitorRender.css'
import { EditVehicleVisitor } from './EditVehicleVisitor'
import type { IVehicleVisitor } from '../../../../interfaces'
interface IVehicleVisitorRenderProps {
  vehicleVisitor: IVehicleVisitor
  handleVehicleVisitorUpdate: (updatedVehicleVisitor: IVehicleVisitor) => void
}

export function RenderVehicleVisitor(props: IVehicleVisitorRenderProps) {
  const { vehicleVisitor: initialVehicleVisitor } = props
  const [vehicleVisitor, setVehicleVisitor] = useState(initialVehicleVisitor)

  function handleVehicleVisitorUpdate(updatedVehicleVisitor: IVehicleVisitor) {
    console.log('1.28 Vehículo del visitante actualizado render:', updatedVehicleVisitor)
    setVehicleVisitor(updatedVehicleVisitor)
    const newRender: IVehicleVisitorRenderProps = {
      vehicleVisitor: updatedVehicleVisitor,
    }
    setVehicleVisitor(updatedVehicleVisitor)
    props.handleVehicleVisitorUpdate(updatedVehicleVisitor)
  }

  return (
    <AnimatePresence key={vehicleVisitor.id}>
      <motion.div
        key={vehicleVisitor.id}
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
            <Icon className={styles.existingIcon} icon={iconCar} />
            <p className={styles.badge} style={{ fontWeight: 'bold' }}>Vehículo</p>
          </div>
        </div>
        <div className={`${styles.detailsContent} fontSize`}>
          <div className={styles.flexGrow}>
            <p> <p className={styles.typeLetter}>Placas : </p>{vehicleVisitor.plates}</p>
            <p> <p className={styles.typeLetter}>Marca : </p>{vehicleVisitor.brand}</p>
            <p> <p className={styles.typeLetter}>Modelo : </p>{vehicleVisitor.model}</p>
            <p> <p className={styles.typeLetter}>Color : </p>{vehicleVisitor.color}</p>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => handleVehicleVisitorUpdate(props.vehicleVisitor)}>
              <Tooltip label="Actualizar vehículo">
                <EditVehicleVisitor vehicle={vehicleVisitor} onVehicleVisitorUpdate={handleVehicleVisitorUpdate} />
              </Tooltip>
            </button>
            <button>
              <Tooltip label="Eliminar vehículo">
                <RemoveElement VehicleVisitor message="Vehículo" idVisitor={typeof vehicleVisitor.id === 'string' ? vehicleVisitor.id : ''} />
              </Tooltip>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
