import { useDisclosure } from '@mantine/hooks'
import { Alert, Button, Group, Input, Modal } from '@mantine/core'
import editIcon from '@iconify-icons/ph/pencil'
import deleteIcon from '@iconify-icons/ph/trash'
import warningIcon from '@iconify-icons/ph/seal-warning'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getCompanies } from '../../../../../fetch/Companies/getCompanies'
import { companyStore } from '../../../../../zustand/companiesStore'
import { deleteCompanies } from '../../../../../fetch/Companies/deleteCompanies'
import { deleteCompanySuccess, errorNotification } from '../../../../Notifications/notifications'
// import { putQuestion } from '../.././../../../../fetch/putQuestion'
import * as styles from '../../../../operator-layout/modalEnter.css'
import { paginationStore } from '../../../../../zustand/paginationStore'
import type { ICompany } from '../../../../../interfaces'

export function DeleteCompany(props: { data: ICompany }) {
  const { pageSize, pageIndex, setCount } = paginationStore()
  const [opened, { open, close }] = useDisclosure(false)
  const { setCompanies } = companyStore()

  const handleClick = () => {
    open()
  }

  const handleDelete = async() => {
    try {
      await deleteCompanies(props.data)
        .then((response) => {
          toast.success(response.message)
          close()
        })
    } catch (error) {
      toast.error('Error Inesperado al Eliminar')
    }
    try {
      await getCompanies(pageSize, pageIndex + 1)
        .then((response) => {
          setCompanies(response.data.result)
          setCount(response.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Compañías')
    }
  }

  return (
    <>
      <Modal style={{ borderColor: 'red' }} opened={opened} onClose={close} withCloseButton={false} centered>
        <Modal.Title className={styles.dialogTitle}>{`Eliminando: ${props.data.name}`}</Modal.Title>
        <Alert icon={<Icon icon={warningIcon} />} title="Precaucion" color="red">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p >Se eliminará<span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{props.data.name}</span> Los operadores ya no podrán registrar entradas con esta empresa</p>
            <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 'bold ' }}>¿Deseas Continuar?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '0.5rem' }} />
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
