import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { Group, Modal, TextInput } from '@mantine/core'
import iconX from '@iconify-icons/ph/x'
import iconPlus from '@iconify-icons/ph/plus'
import { toast } from 'react-hot-toast'
import '../../../../../operator-layout/responsive.css'
import * as styles from '../../../../../operator-layout/modalEnter.css'
import { trailerTypeStore } from '../../../../../../zustand/TrailerTypeStore' // Asegúrate de usar la ruta correcta a tu archivo de store
import { postTrailerTypes } from '../../../../../../fetch/TrailerTypes/postTrailerTypes'
import type { ITrailerType } from '../../../../../../interfaces'

export function AddTrilerType() {
  const [openModal, modal] = useDisclosure(false)
  const [name, setName] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const { addTrailerTypes, setFetchControl } = trailerTypeStore()

  async function saveData() {
    try {
      if (name === '') {
        toast.error('Debe de ingresar un nombre')
        return null
      }

      const newTrailerType: ITrailerType = {
        name,
        organizationId: '',
        status: true,
      }

      const result = await postTrailerTypes(newTrailerType)
      if (result.ok === true) {
        addTrailerTypes(result.data)
        setFetchControl(true)
      }
      toast.success('Trailer creado exitósamente')
    } catch (error) {
      console.log('error message:', error)
    }
    modal.close()
  }

  function showMessage() {
    setButtonDisabled(true)
    if (name === '') {
      showNotification({
        title: 'Registro No Válido',
        icon: <Icon icon={iconX} />,
        color: 'red',
        message: undefined,
      })
    } else {
      saveData()
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
        <Modal.Title className={styles.dialogTitle}>Agregar Remolque</Modal.Title>
        <Modal.Body>
          <TextInput
            value={name}
            placeholder="Torton"
            label="Nombre"
            withAsterisk
            onChange={event => setName(event.currentTarget.value)}
          />
          <div className={styles.saveContainerChecklist}>
            <button
              className={styles.button}
              onClick={showMessage}
              disabled={buttonDisabled}
            >
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
          Agregar Remolque
        </button>
      </Group>
    </>
  )
}
