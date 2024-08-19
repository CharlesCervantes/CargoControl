import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { Group, Modal, TextInput } from '@mantine/core'
import iconX from '@iconify-icons/ph/x'
import '../../../../../operator-layout/responsive.css'
import iconPlus from '@iconify-icons/ph/plus'
import iconCheck from '@iconify-icons/ph/check'
import { valueGetters } from '@mantine/core/lib/Box/style-system-props/value-getters/value-getters'
import { toast } from 'react-hot-toast'
import { vehicleTypeStore } from '../../../../../../zustand/VehicleTypeStore'
import * as styles from '../../../../../operator-layout/modalEnter.css'
import { postVehicleTypes } from '../../../../../../fetch/VehicleTypes/postVehicleType'
import { existingElement, successNotification } from '../../../../../../components/Notifications/notifications'
import type { IVehicleType } from '../../../../../../interfaces'
export function AddUnitType() {
  const [openModal, modal] = useDisclosure(false)
  const [name, setName] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const { addVehicleType, setFetchControl } = vehicleTypeStore()

  async function saveData() {
    setButtonDisabled(true)
    try {
      if (name === '') {
        toast.error('Debe de ingresar un nombre')
        return null
      }

      const newVehicleType: IVehicleType = {
        name,
        organizationId: '',
        status: true,
      }

      const result = await postVehicleTypes(newVehicleType)
      if (result.ok === true) {
        addVehicleType(result.data)
        setFetchControl(true)
        toast.success('Vehículo creado exitosamente')
      }
    } catch (error) {
      toast.error(`Error: ${error}`)
    }
    modal.close()
  }

  return (
    <>
      <Modal
        opened={openModal}
        onClose={modal.close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
      >
        <Modal.Title className={styles.dialogTitle}>Agregar Unidad</Modal.Title>
        <Modal.Body>
          <TextInput
            value={name}
            placeholder="Torton"
            label="Nombre de la unidad"
            withAsterisk
            onChange={event => setName(event.currentTarget.value)}
          />
          <div className={styles.saveContainerChecklist}>
            <button className={styles.button} onClick={saveData} disabled={buttonDisabled}>
              Guardar
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <button
          className={styles.checklistButtons}
          onClick={() => {
            setName('')
            setButtonDisabled(false)
            modal.open()
          }}
        >
          <Icon icon={iconPlus} />
          Agregar Unidad
        </button>
      </Group>
    </>
  )
}
