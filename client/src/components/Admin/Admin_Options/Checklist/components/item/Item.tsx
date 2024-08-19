import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Accordion, Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import iconTrash from '@iconify-icons/ph/trash'
import { getVehicleTypes } from '../../../../../../fetch/VehicleTypes/getVehicleTypes'
import { vehicleTypeStore } from '../../../../../../zustand/VehicleTypeStore'
import { QuestionStore } from '../../../../../../zustand/QuestionStore'
import { getTrailerTypes } from '../../../../../../fetch/TrailerTypes/getTrailerTypes'
import { trailerTypeStore } from '../../../../../../zustand/TrailerTypeStore'
import { deleteVehicleTypes } from '../../../../../../fetch/VehicleTypes/deleteVehicleTypeById'
import { deleteTrailerTypes } from '../../../../../../fetch/TrailerTypes/deleteTrailerTypeById'
import { TransferListPanel } from '../transferlist/modal-checklist'
import styles from '../../VehicleType.module.scss'
import { itemNotDeletedSuccessfully, itemSuccessfullyRemoved } from '../../../../../../components/Notifications/notifications'
import * as stylesM from '../../../../../operator-layout/modalEnter.css'
import type { TowTypeEntity, VehicleTypeEntity } from '../../../../../../interfaces'

export function Item(props: { data: VehicleTypeEntity | TowTypeEntity, type: string }) {
  const id = props.data.id
  const [opened, { open, close }] = useDisclosure(false)
  const [disabledButton, setDisabledButton] = useState(false)

  const { Questions } = QuestionStore()

  function deleteElement() {
    open()
  }

  async function deleteVehicleOrTrailer(id: string) {
    setDisabledButton(true)
    close()
    if (props.type === 'trailer') {
      await deleteTrailerTypes(id).then(() => itemSuccessfullyRemoved(props.data.name)).catch(() => itemNotDeletedSuccessfully(props.data.name))
      const trailer = await getTrailerTypes()
      QuestionStore.getState().setQuestions(trailer.data)
    } else {
      await deleteVehicleTypes(id).then(() => itemSuccessfullyRemoved(props.data.name)).catch(() => itemNotDeletedSuccessfully(props.data.name))
      const vehicle = await getVehicleTypes()
      QuestionStore.getState().setQuestions(vehicle.data)
    }
    close()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Modal.Title className={stylesM.dialogTitle}>Confirmar la Eliminación</Modal.Title>
        <div>
          <p >Se eliminará: <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{props.data.name}</span> y todas sus preguntas asignadas, los operadores tampoco podrán registrar unidades y remolques que correspondan con este tipo
          </p>

        </div>
        <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 'bold ' }}>¿Deseas Continuar?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className={stylesM.button} style={{ width: '40%' }} onClick={() => deleteVehicleOrTrailer(props.data.id)} disabled={disabledButton}>SI</button>
          <button className={stylesM.closeButton} style={{ width: '40%' }} onClick={close}>NO</button>
        </div>
      </Modal>

      <Accordion.Item className={styles.accordionItemStyles} value={id} key={id}>
        <Accordion.Control>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            {props.data.name}
            <button
              color="dark"
              onClick={(e) => {
                setDisabledButton(false)
                e.stopPropagation()
                deleteElement()
              }}
            >
              <Icon className={styles.accordionIconStyles} style={{ color: 'red' }} icon={iconTrash} />
            </button>
          </div>
        </Accordion.Control>
        {/* <Camera /> */}
        <Accordion.Panel>
          <TransferListPanel
            id={props.data.id}
            myQuestions={props.data.Question}
            notMyQuestions={Questions}
            type={props.type}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </>
  )
}
