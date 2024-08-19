import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Input, Modal } from '@mantine/core'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { paginationStore } from '../../../../../zustand/paginationStore'
import { getCompanies } from '../../../../../fetch/Companies/getCompanies'
import { companyStore } from '../../../../../zustand/companiesStore'
import { errorNotification, existingElement, successNotification, updateCompanySuccess } from '../../../../../components/Notifications/notifications'
import { updateCompany } from '../../../../../fetch/Companies/updateCompanies'
import * as styles from '../../../../operator-layout/modalEnter.css'
import type { ICompany } from '../../../../../interfaces'

export function EditCompany(props: { data: ICompany }) {
  const [opened, { open, close }] = useDisclosure(false)

  // Define los estados iniciales para los campos de entrada.
  const [companyName, setCompanyName] = useState(props.data.name)
  const [companyLocation, setCompanyLocation] = useState(props.data.address)
  const { pageSize, pageIndex, setCount } = paginationStore()

  // Obtiene la función setCompanies de la tienda
  // const updateCompanyInStore = companyStore(state => state.updateCompnay)
  const { setCompanies } = companyStore()

  // Define los manejadores de eventos para los cambios en los campos de entrada.
  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value)
  }
  const handleCompanyLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyLocation(event.target.value)
  }

  // guardamos la informacion en la BD

  async function updateCompanies() {
    const data: ICompany = {
      id: props.data.id,
      name: companyName,
      address: companyLocation,
    }
    try {
      await updateCompany(data)
        .then((data) => {
          if (data.ok)
            toast.success(data.message)
          else
            toast.error(data.message)
        })
    } catch (error) {
      toast.error('Error Inesperado al Actualizar la Compañía')
    }
    try {
      await getCompanies(pageSize, pageIndex + 1)
        .then((data) => {
          setCompanies(data.data.result)
          setCount(data.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Compañías')
    }
  }

  function openModal() {
    setCompanyName(props.data.name)
    setCompanyLocation(props.data.address)
    open()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Modal.Title className={styles.dialogTitle}>Editar Compañía</Modal.Title>
        <Input.Wrapper label="Nombre de la Compañía" required size="responsive">
          <Input<any>
            placeholder="Insytech"
            value={companyName} // Usa el valor del estado
            onChange={handleCompanyNameChange} // Agrega un manejador de eventos para los cambios
          />
        </Input.Wrapper>
        <Input.Wrapper label="Ubicación de la Compañía" required size="responsive">
          <Input<any>
            placeholder="Parque España"
            value={companyLocation} // Usa el valor del estado
            onChange={handleCompanyLocationChange} // Agrega un manejador de eventos para los cambios
          />
        </Input.Wrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button className={styles.button} onClick={updateCompanies} style={{ width: '40%' }} >Guardar</button>
          {/* <Button style={{ display: 'flex', width: '90%', justifyContent: 'center' }}>Guardar</Button> */}
          <button className={styles.closeButton} onClick={close} color="red" style={{ width: '40%' }}>Cancelar</button>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={openModal} color="green">Editar</Button>
      </Group>
    </>
  )
}
