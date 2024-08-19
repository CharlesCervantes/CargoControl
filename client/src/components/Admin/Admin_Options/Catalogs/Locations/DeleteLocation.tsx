import { useDisclosure } from '@mantine/hooks'
import { Alert, Button, Group, Input, Modal } from '@mantine/core'
import editIcon from '@iconify-icons/ph/pencil'
import deleteIcon from '@iconify-icons/ph/trash'
import warningIcon from '@iconify-icons/ph/seal-warning'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getLocations } from '../../../../../fetch/Locations/getLocations'
import { locationStore } from '../../../../../zustand/locationsStore'
import { deleteLocations } from '../../../../../fetch/Locations/deleteLocations'
import { deleteLocationSuccess, errorNotification } from '../../../../Notifications/notifications'
import * as styles from '../../../../operator-layout/modalEnter.css'
import { paginationStore } from '../../../../../zustand/paginationStore'
import type { ILocation } from '../../../../../interfaces'

export function DeleteLocation(props: { data: ILocation }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { setLocations } = locationStore()
  const { pageSize, pageIndex } = paginationStore()
  const handleClick = () => {
    open()
  }

  const handleDelete = async() => {
    try {
      await deleteLocations(props.data)
        .then((response) => {
          toast.success(response.message)
          close()
        })
    } catch (error) {
      toast.error('Error Inesperado al Eliminar')
    }
    try {
      await getLocations(pageSize, pageIndex + 1)
        .then((response) => {
          setLocations(response.data.result)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Localizaciones')
    }
    // close()
    // try {
    //   const result = await deleteLocations(props.data)
    //   if (result.ok === true) {
    //     const locations = await getLocations(pageSize, pageIndex + 1)
    //     setLocations(locations.data.result)
    //     deleteLocationSuccess()
    //   } else {
    //     errorNotification()
    //   }
    // } catch (error) {
    //   errorNotification()
    // }
  }

  return (
    <>
      <Modal style={{ borderColor: 'red' }} opened={opened} withCloseButton={false} onClose={close} centered>
        <Modal.Title className={styles.dialogTitle}>{`Eliminando: ${props.data.name}`}</Modal.Title>
        <Alert icon={<Icon icon={warningIcon} />} title="Precaucion" color="red">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p >Se eliminará<span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{props.data.name}</span> Los operadores ya no podran registrar entradas con esta localización</p>
            <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 'bold ' }}>¿Deseas Continuar?</p>
          </div>
        </Alert>
        <div className={styles.saveContainer}>
          <button className={styles.button} onClick={handleDelete}>Si</button>
          <button className={styles.closeButton} onClick={close}>No</button>
        </div>
      </Modal>

      <Group position="center">
        <Button
          size="xs"
          onClick={handleClick}
          style={{ marginBottom: '0.1rem' }}
          color="red"
        ><Icon icon={deleteIcon} style={{ marginRight: '0.3rem' }} /> Eliminar
        </Button>
      </Group>
    </>
  )
}
