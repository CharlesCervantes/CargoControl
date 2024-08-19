/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */

import { Icon } from '@iconify/react'
import iconUser from '@iconify-icons/ph/user'
// import iconTrash from '@iconify-icons/ph/trash'
import { AnimatePresence, motion } from 'framer-motion'
import { useDisclosure } from '@mantine/hooks'
import { Modal } from '@mantine/core'
import { ExitUnitStore } from '../../../../zustand/ExitUnitStore'
import { RemoveElement } from '../RemoveElement'
import * as styles from './DriverRender.css'

export function RenderDriver() {
  const [opened, { open, close }] = useDisclosure(false)

  const { ExitUnit } = ExitUnitStore()
  function handleRemove() {
    open()
    // removeDriver()
    return (
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>
    )
  }

  return (
    ExitUnit.Driver?.id ? (
      <AnimatePresence key={ExitUnit.Driver?.id}>
        <motion.div
          key={ExitUnit.Driver?.id}
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

            <RemoveElement driver message="Conductor" />
          </div>
          <div className={`${styles.detailsContent} fontSize`}>
            <div className={styles.flexGrow}>
              <p> <p className={styles.typeLetter}>Nombre : </p>{ExitUnit.Driver?.Person?.name}</p>
              <p> <p className={styles.typeLetter}>Licencia : </p>{ExitUnit.Driver?.Person?.license}</p>
              <p> <p className={styles.typeLetter}>CURP : </p>{ExitUnit.Driver?.Person?.curp}</p>
              <p> <p className={styles.typeLetter}>Empresa : </p>{ExitUnit.Driver?.Company?.name}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button>
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
