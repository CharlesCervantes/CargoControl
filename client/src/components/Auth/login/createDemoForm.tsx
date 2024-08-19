import toast from 'react-hot-toast'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import '../../operator-layout/responsive.css'
import { Button, Checkbox, Group, Modal, PasswordInput, TextInput, Title } from '@mantine/core'
import { createDemo } from '../../../fetch/LoginAndSignUp/postSignUp'
import { CheckAnimation } from '../../Common/CheckAnimation/checkAnimation'

import { getRoles } from '../../../fetch/Role/getNewRole'
import type { IRole } from '../../../interfaces'

export function CreateDemoForm(props: { opened: boolean, close: () => void }) {
  const [succses, setSuccses] = useState(true)
  const [password2, setPassword2] = useState('')
  const [roles, setRoles] = useState<Array<IRole>>([])

  const form = useForm({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      username: '',
      numberphone: '',
      password: '',
      organizationName: '',
      terms: false,

      roleId: '', // TODO:cambiar esto por una busqueda de role por nombre

    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value => (value !== password2) ? 'Las contraseñas no coinciden' : null,
    },
  })

  function validateDemo(values: any) {
    const adminRole = roles.find(r => r.name === 'admin')
    console.log('Admin role', adminRole)
    values.roleId = adminRole?.id

    if (adminRole) {
      createDemo(values)
        .then((response) => {
          form.reset()
          if (response.ok)
            toast.success('Cuenta creada correctamente...')
          props.close()
        },
        )
    } else {
      toast.error('No Roles')
    }
  }

  function handleClose() {
    setSuccses(true)
    form.reset()
    props.close()
  }

  useEffect(() => {
    const fetchData = async() => {
      const data = await getRoles()
      console.log('Test 1', data)
      setRoles(data.roles)
    }
    fetchData()
  }, [])

  return (

    <Modal
      centered
      opened={props.opened}
      onClose={() => {
        handleClose()
        form.reset()
      }}
      withCloseButton={false}
    >

      {succses
        ? (
          <>
            <Title style={{ textAlign: 'end' }} order={1}>Formulario Demo</Title>

            <form autoComplete="new-password" onSubmit={form.onSubmit(values => validateDemo(values))}>
              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Name"

                {...form.getInputProps('name')}
              />
              <TextInput
                label="Apellidos"
                placeholder="Cervantes"
                {...form.getInputProps('lastname')}
              />
              <TextInput
                withAsterisk
                label="Correo"
                placeholder="charles@email.com"
                {...form.getInputProps('email')}
              />
              <TextInput
                withAsterisk
                label="Nombre de Usuario"
                placeholder="Charles0921"
                {...form.getInputProps('username')}
              />
              <TextInput
                //   withAsterisk
                label="Teléfono"
                placeholder="81234567890"
                {...form.getInputProps('numberphone')}
              />
              <div style={{ width: '100%', display: 'flex' }}>
                <PasswordInput

                  autoComplete="new-password"

                  placeholder="Password"
                  label="Contraseña"
                  style={{ width: '50%', marginRight: '1%' }}
                  {...form.getInputProps('password')}
                  withAsterisk
                />
                <PasswordInput

                  autoComplete="off"

                  style={{ width: '50%' }}
                  placeholder="Password"
                  label="Repetir Contraseña"
                  onChange={e => setPassword2(e.target.value)}
                  withAsterisk
                />
              </div>
              <TextInput
                withAsterisk
                label="Nombre de la Organización"
                placeholder="Insytech"
                {...form.getInputProps('organizationName')}
              />
              <Checkbox
                mt="md"
                label="Aceptar Términos y Condiciones"
                {...form.getInputProps('terms', { type: 'checkbox' })}
              />

              <Group position="right" mt="md">
                <Button type="submit">Envíar</Button>
              </Group>
            </form>
          </>
          )
        : (
          <>
            <Title style={{ textAlign: 'center', paddingBottom: '15px' }} order={2}>¡Demo creado con éxito!</Title>
            <CheckAnimation />
            <p style={{ textAlign: 'center' }}>Revisa tu correo para finalizar el registro</p>
          </>
          )}
    </Modal>
  )
}
