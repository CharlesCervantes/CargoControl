import { Button, Checkbox, Group, Modal, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import toast from 'react-hot-toast'
import { userStore } from '../../../../../zustand/userStore'
import { closeUserSession } from '../../../../../fetch/User/deleteUserToken'

export function RestoreSession(props: { id: string, name: string, email: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { users, deleteSesionToken } = userStore()

  const form = useForm({
    initialValues: {
      terms: false,
    },
  })

  async function edit(terms: boolean) {
    if (terms) {
      const response = await closeUserSession(props.id)
      if (response.ok) {
        toast.success('Sesión cerrada correctamente')
        deleteSesionToken(props.id)
        console.log(users)
        close()
      }
    } else {
      toast.error('Es necesario Aceptar el cierre de sesión')
    }
  }

  return (
    <>
      <Modal centered opened={opened} onClose={close} withCloseButton={false}>
        <div>
          <Title style={{ textAlign: 'center', paddingBottom: '0rem' }} order={2}>Restaurar Sesiones</Title>
          <Title align="end" style={{ textAlign: 'center', paddingBottom: '1rem', fontWeight: '400' }} order={5}>Para: {props.name} - {props.email}</Title>
        </div>
        <form onSubmit={form.onSubmit(values => edit(values.terms))}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <p>Esta acción cerrará todas las sesiones en todos los dispositivos donde la cuenta se encuentre en uso, será necesario volver a iniciar sesión</p>
          </div>
          <Checkbox
            label="¿Desea cerrar las sesiones de esta cuenta?"
            {...form.getInputProps('terms')}
          />
          <Group position="center" mt="md">
            <Button type="submit">Restaurar</Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button
          color="cyan"
          onClick={() => {
            open()
          }}
          size="xs"
        >Cerrar Sesión
        </Button>
      </Group>
    </>
  )
}
