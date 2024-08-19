import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Input, Modal } from '@mantine/core'
import editIcon from '@iconify-icons/ph/pencil'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as styles from '../../../../operator-layout/modalEnter.css'
import { visitorTypeStore } from '../../../../../zustand/visitorTypeStore'
import { paginationStore } from '../../../../../zustand/paginationStore'
// import type { IVisitorType } from '../../../../../interfaces'
import { updateVisitorType as update } from '../../../../../fetch/Visitor/updateVisitorType'
import { getVisitorTypes } from '../../../../../fetch/Visitor/getVisitorTypes'
import type { IVisitorType } from '../../../../../interfaces'

export function EditVisitorType(props: { data: IVisitorType }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { setVisitorTypes } = visitorTypeStore()
  const { pageSize, pageIndex, setCount } = paginationStore()
  const [visitorTypeName, setVisitorTypeName] = useState(props.data.name || '')
  const [vistorTypeDescription, setVisitorTypeDescription] = useState(props.data.description || '')

  async function updateVisitorTypes() {
    const data: IVisitorType = {
      id: props.data.id,
      name: visitorTypeName,
      description: vistorTypeDescription,
      organizationId: '',
      status: true,
    }
    try {
      await update(data)
        .then((data) => {
          if (data.ok) {
            toast.success(data.message)
            close()
          } else { toast.error(data.message) }
        })
    } catch (error) {
      toast.error('Error Inesperado al Actualizar el Tipo de Visitante')
    }
    try {
      await getVisitorTypes(pageSize, pageIndex + 1)
        .then((data) => {
          setVisitorTypes(data.data.result)
          setCount(data.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener los Tipos de Visitante')
    }
    // const data: IVisitorType = {
    //   id: props.data.id,
    //   name: visitorTypeName,
    //   description: vistorTypeDescription,
    //   organizationId: '',
    //   status: true,
    // }
    // const result = await update(data)
    // if (result.ok === false) {
    //   toast.error('Ya existe un elemento con este nombre')
    // } else {
    //   await getVisitorTypes(pageSize, pageIndex + 1)
    //     .then((visitorTypes) => {
    //       setVisitorTypes(visitorTypes.data.result)
    //       setCount(visitorTypes.data.count)
    //       toast.success('Actualizado Exitosamente!')
    //       close()
    //     })
    // }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Modal.Title className={styles.dialogTitle}>Editar Tipo de Visitante</Modal.Title>
        <Input.Wrapper label="Tipo de Visitante" required size="responsive">
          <Input<any>

            placeholder="Proveedor"
            defaultValue={visitorTypeName} // Usa el valor del estado
            onChange={ev => setVisitorTypeName(ev.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Descripcion" required size="responsive">
          <Input<any>

            placeholder="..."
            defaultValue={vistorTypeDescription} // Usa el valor del estado
            onChange={ev => setVisitorTypeDescription(ev.target.value)}
          />
        </Input.Wrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Button
            // className={styles.button}
            onClick={updateVisitorTypes}
            style={{ width: '40%' }}
            disabled={!!((vistorTypeDescription.length === 0 || visitorTypeName.length === 0))}
          >
            Guardar
          </Button>
          <Button onClick={close} color="red" style={{ width: '40%' }}>Cancelar</Button>
        </div>
      </Modal>

      <Group position="center">
        <Button
          size="xs"
          style={{ marginBottom: '0.1rem' }}
          color="green"
          onClick={open}
        ><Icon icon={editIcon} style={{ marginRight: '0.3rem' }} /> Editar
        </Button>
      </Group>
    </>
  )
}
