/* eslint-disable operator-linebreak */

import { useDisclosure } from '@mantine/hooks'
import { Button, Card, Checkbox, Divider, Group, Modal, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { resetSession } from '../../../fetch/LoginAndSignUp/postLogin'
import { closeUserSession } from '../../../fetch/User/deleteUserToken'
import type { IUser } from '../../../interfaces'

export function ResetSession() {
  // const [fetching, isFetching] = useState<boolean>(false)
  const [user, setUser] = useState<{ user: IUser }>()
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const resetForm = useForm({
    initialValues: {
      terms: false,
    },
  })

  const handleSave = async(email: string, password: string) => {
    try {
      const response = await resetSession({ email, password })
      setUser(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleReset = async(terms: boolean) => {
    try {
      if (terms) {
        const request = await closeUserSession(user?.user.id || '')
        if (request.ok) {
          toast.success('Sesiones cerradas correctamente')
          close()
        }
      } else {
        toast.error('Necesita autorizar la acción')
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error}`)
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Restablecer sesión">
        <Divider />
        <form onSubmit={form.onSubmit(values => handleSave(values.email, values.password))}>
          <TextInput
            withAsterisk
            label="Correo electrónico"
            placeholder="test@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Contraseña"
            {...form.getInputProps('password')}
          />

          <Button type="submit">Enviar</Button>
        </form>

        {user ?
          <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group>
                <Text >Nombre:</Text>
                <Text size="sm" >{user.user.name} { user.user.lastname }</Text>
              </Group>
              <Group>
                <Text >Correo:</Text>
                <Text size="sm" >{user.user.email}</Text>
              </Group>
              <Group>
                <Text >Organización:</Text>
                <Text size="sm" >{user.user.Organization?.name}</Text>
              </Group>

              <form onSubmit={resetForm.onSubmit(values => handleReset(values.terms))}>
                <Checkbox
                  label="Verificacion"
                  description="¿Desea cerrar las sesiones en todos los dispositivos?"
                  {...resetForm.getInputProps('terms')}
                />

                <Group>
                  <Button type="submit">Cerrar sesiones</Button>
                </Group>
              </form>
            </Card>
          </div>
          : null}
      </Modal>

      <Button onClick={open}>Restablecer sesión</Button>
    </>
  )
}
