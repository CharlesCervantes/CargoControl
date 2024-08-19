/* eslint-disable @typescript-eslint/no-unused-vars */
import { createColumnHelper } from '@tanstack/react-table'
import { Badge, Button, Checkbox, Group, Modal, PasswordInput, Switch, Title } from '@mantine/core'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import toast from 'react-hot-toast'
import { paginationStore } from '../../zustand/paginationStore'
import { updateUserPassword } from '../../fetch/User/updateUserPassword'
import { userStore } from '../../zustand/userStore'
import { deleteUser } from '../../fetch/User/patchUsers'
import { closeUserSession } from '../../fetch/User/deleteUserToken'
import { RestoreSession } from '../../components/Admin/Admin_Options/Users/deleteSession/deleteUserSession'
import type { IRole, UserEntity } from '../../interfaces'

export function userColumns() {
  // Create the Table Columns
  const { users } = userStore()
  console.log('users in columns:', users)
  const columnHelper = createColumnHelper<UserEntity>()
  const columns = [
    columnHelper.accessor('deleteUser', {
      header: '',
      disableFilter: true,
      cell: ({ row }) => (
        <DeleteUser user={row.original} />
      ),
    }),
    columnHelper.accessor('isActive', {
      header: '',
      disableFilter: true,
      cell: ({ row }) => {
        if (row.original.token) {
          return (
            <Badge variant="dot" color="green" size="lg">Online</Badge>
          )
        } else {
          return (<Badge variant="dot" color="red" size="lg">Offline</Badge>)
        }
      },
    }),
    columnHelper.accessor('name', {
      id: 'firstName',
      header: 'Nombres',
    }),
    columnHelper.accessor('lastname', {
      id: 'lastname',
      header: 'Apellidos',
    }),
    columnHelper.accessor('username', {
      id: 'username',
      header: 'Username',

    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('numberphone', {
      header: 'Teléfono',
    }),
    columnHelper.accessor((row: IRole) => row.Role.name || '', {
      header: 'Rol',
    }),
    // columnHelper.accessor('password', {
    //   header: 'password',
    // }),
    columnHelper.accessor('restorePassword', {
      header: '',
      disableFilter: true,
      cell: ({ row }) => (
        <RestorePassword id={row.original.id} password={row.original.password} email={row.original.email} name={row.original.name} />
      ),
    }),
    columnHelper.accessor('restoreSession', {
      header: '',
      disableFilter: true,
      cell: ({ row }) => (
        <RestoreSession id={row.original.id} name={row.original.name} email={row.original.email} />
      ),
    }),
  ]
  return columns
}

export function RestorePassword(props: { id: string, password: string, email: string, name: string }) {
  const [password2, setPassword2] = useState('')
  const form = useForm({
    initialValues: {
      password: '',
      email: props.email,
      terms: false, // Inicialmente el checkbox no está marcado
    },
    validate: {
      password: (value) => {
        if (value.length < 7 || !/^[0-9a-zA-Z]*$/.test(value))
          return 'Ingresa una Contraseña válida'

        if (value !== password2)
          return 'Las contraseñas no coinciden'

        return null
      },
    },
  })

  const [opened, { open, close }] = useDisclosure(false)

  async function edit(id: string, password: string) {
    const response = await updateUserPassword(id, password)
    if (response.ok) {
      form.reset()
      setPassword2('')
      close()
    }
  }

  return (
    <>
      <Modal centered opened={opened} onClose={close} withCloseButton={false}>
        <div>
          <Title style={{ textAlign: 'center', paddingBottom: '0rem' }} order={2}>Restaurar Contraseña</Title>
          <Title align="end" style={{ textAlign: 'center', paddingBottom: '1rem', fontWeight: '400' }} order={5}>Para: {props.name} - {props.email}</Title>
        </div>
        <form onSubmit={form.onSubmit(() => edit(props.id, form.values.password))}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <PasswordInput
              required
              placeholder="Password"
              label="Nueva Contraseña"
              style={{ marginRight: '1%' }}
              {...form.getInputProps('password')}
              withAsterisk
            />
            <PasswordInput
              required
              placeholder="Password"
              label="Repetir Contraseña"
              onChange={e => setPassword2(e.target.value)}
              withAsterisk
            />
          </div>
          <Checkbox
            required
            mt="md"
            label="Acepto que el propietario será notificado sobre su nueva contraseña"
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />
          <Group position="center" mt="md">
            <Button type="submit">Restaurar</Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button
          color="green"
          onClick={() => {
            open()
          }}
          size="xs"
        >Cambiar Contraseña
        </Button>
      </Group>
    </>
  )
}

export function DeleteUser(props: { user }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { removeUser } = userStore()
  console.log('user:', props.user.id)
  return (
    <>
      <Modal centered opened={opened} onClose={close} withCloseButton={false}>
        <Title style={{ textAlign: 'center', paddingBottom: '1rem', fontWeight: '500' }} order={3}>Se eliminará
          <Title style={{ fontWeight: 400 }} color="red">{props.user.name} {props.user.lastname}</Title>
          <Title style={{ fontWeight: 400 }} order={5} color="red">{props.user.email}</Title>
        </Title>
        <Title style={{ textAlign: 'center', paddingBottom: '1rem', fontWeight: '500' }} order={4}>¿Deseas continuar?</Title>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            color="red"
            onClick={() => {
              close()
              deleteUser(props.user)
              removeUser(props.user.id)
            }}
          >Eliminar
          </Button>
          <Button onClick={close}>Cancelar</Button>
        </div>
      </Modal>
      <Group position="center">
        <Button color="red" onClick={open} size="xs">Eliminar</Button>
      </Group>
    </>
  )
}
