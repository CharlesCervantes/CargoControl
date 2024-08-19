/* eslint-disable multiline-ternary */

import { Icon } from '@iconify/react'
import iconUser from '@iconify-icons/ph/user'
import { useState } from 'react'
import iconTrash from '@iconify-icons/ph/trash'
import iconPencil from '@iconify-icons/ph/pencil'
import { AnimatePresence, motion } from 'framer-motion'
import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Title, Tooltip } from '@mantine/core'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'
import { RemoveElement } from '../RemoveElement'
import { EditDriverRender } from './EditDriverRender'
import * as styles from './DriverRender.css'
import type { IDriver } from '../../.././../interfaces'

interface IDriverRenderProps {
  driver: IDriver
  handleDriverUpdate: (updatedDriver: IDriver) => void
}

export function RenderDriver(props: IDriverRenderProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const { driver: initialDriver } = props
  const [driver, setDriver] = useState(initialDriver)

  const { entrance, removeDriver } = EntranceUnitStore()
  function handleRemove() {
    open()
    // removeDriver()
    return (
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>
    )
  }

  function handleDriverUpdate(updatedDriver: IDriver) {
    console.log('1.28 Conductor actualizado render:', updatedDriver)
    const newRender: IDriverRenderProps = {
      driver: updatedDriver,
    }
    setDriver(updatedDriver)
    props.handleDriverUpdate(updatedDriver)
  }

  return (
    entrance.Driver?.id ? (
      <AnimatePresence key={entrance.Driver?.id}>
        <motion.div
          key={entrance.Driver?.id}
          className={styles.existingItem}
          tabIndex={0}
          transition={{ duration: 0.7 }}
          initial={{ x: 800 }}
          animate={{ x: 0 }}
          whileHover={{ scale: 1.01 }}
          exit={{ x: 1000 }}
        >
          <div className={styles.iconContainer}>
            <div className={styles.flex}>
              <Icon className={styles.existingIcon} icon={iconUser} />
              <p className={styles.badge} style={{ fontWeight: 'bold' }}>Conductor</p>
            </div>

          </div>
          <div className={`${styles.detailsContent} fontSize`}>
            <div className={styles.flexGrow}>
              <p> <p className={styles.typeLetter}>Nombre : </p>{entrance.Driver?.Person?.name} {entrance.Driver.Person?.lastname}</p>
              <p> <p className={styles.typeLetter}>Licencia : </p>{entrance.Driver?.Person?.license}</p>
              <p> <p className={styles.typeLetter}>CURP : </p>{entrance.Driver?.Person?.curp}</p>
              <p> <p className={styles.typeLetter}>Empresa : </p>{entrance.Driver?.Company?.name}</p>
            </div>

            <div className={styles.buttonContainer}>
              <button>
                <Tooltip label="Editar Conductor">
                  <EditDriverRender id={entrance.Driver.id} onDriverUpdate={handleDriverUpdate} />
                </Tooltip>
              </button>

              <button className={styles.deleteButton}>
                <RemoveElement driver message="Conductor" />
                {/* <EditDriver
                object={driver}
                onEdit={onEdit}
              /> */}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    ) : null
  )
}
