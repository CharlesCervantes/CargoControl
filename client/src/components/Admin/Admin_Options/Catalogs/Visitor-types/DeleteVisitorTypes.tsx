import { useDisclosure } from '@mantine/hooks'
import { Alert, Button, Group, Input, Modal } from '@mantine/core'
import deleteIcon from '@iconify-icons/ph/trash'
import warningIcon from '@iconify-icons/ph/seal-warning'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import { visitorTypeStore } from '../../../../../zustand/visitorTypeStore'
import { getVisitorTypes } from '../../../../../fetch/Visitor/getVisitorTypes'
import { companyStore } from '../../../../../zustand/companiesStore'

// import { putQuestion } from '../.././../../../../fetch/putQuestion'
import * as styles from '../../../../operator-layout/modalEnter.css'
import { paginationStore } from '../../../../../zustand/paginationStore'
import { deleteVisitorType } from '../../../../../fetch/Visitor/deleteVisitorType'
import type { ICompany } from '../../../../../interfaces'

export function DeleteVisitorTypes(props: { data: ICompany }) {
  const { pageSize, pageIndex, setCount } = paginationStore()
  const [opened, { open, close }] = useDisclosure(false)
  const { setVisitorTypes } = visitorTypeStore()

  const handleClick = () => {
    open()
  }

  const handleDelete = async() => {
    try {
      await deleteVisitorType(props.data.id)
        .then((response) => {
          toast.success(response.message)
          close()
        })
    } catch (error) {
      toast.error('Error Inesperado al Eliminar')
    }
    try {
      await getVisitorTypes(pageSize, pageIndex + 1)
        .then((response) => {
          setVisitorTypes(response.data.result)
          setCount(response.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener los Tipos de Visitante')
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
