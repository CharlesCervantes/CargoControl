// librarys
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import { postCreateVisitorType } from '../../../../../../fetch/Visitor/postCreateVisitorType'
import { visitorTypeStore } from '../../../../../../zustand/visitorTypeStore'
import '../../../../../operator-layout/responsive.css'
import { paginationStore } from '../../../../../../zustand/paginationStore'
import { getVisitorTypes } from '../../../../../../fetch/Visitor/getVisitorTypes'
import * as styles from './AddVisitorType.css'
import type { IVisitorType } from '../../../../../../interfaces'
// Generamos password

export function Add() {
  const {
    pageIndex,
    pageSize,
    setCount,
  } = paginationStore()
  const { setVisitorTypes } = visitorTypeStore()
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },
  })

  async function createVisitorType(values: IVisitorType) {
    try {
      await postCreateVisitorType(values)
        .then((data) => {
          if (data.ok) {
            toast.success(data.message)
            form.reset()
            close()
          } else {
            toast.error(data.message)
            form.reset()
          }
        })
    } catch (error) {
      toast.error('Error Inesperado al Crear el tipo de visitante')
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
    // try {
    //   const request = await postCreateVisitorType(values)
    //   // Si el request es exitoso, agrega el visitorType al estado global
    //   if (request)
    //     addVisitorType(request.data)
    // } catch (error) {
    // }
    // form.reset()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} >
        {/* Modal content */}
        <div>
          <Modal.Title className={styles.dialogTitle}>
            <div>Agregar tipo de Visitante</div>
          </Modal.Title>
        </div>
        <form onSubmit={form.onSubmit(values => createVisitorType(values))}>
          <TextInput
            withAsterisk
            label="Tipo de visitante"
            placeholder="Proveedor"
            {...form.getInputProps('name')}
          />

          <TextInput
            withAsterisk
            label="Descripción de tipo visitante"
            placeholder="Mantenimiento"
            {...form.getInputProps('description')}
          />

          <Group position="right" mt="md">
            <Button disabled={form.values.name === '' || form.values.description === ''} type="submit" onClick={close}>Crear</Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Agregar Tipo de Visitante</Button>
      </Group>
    </>
  )
}
