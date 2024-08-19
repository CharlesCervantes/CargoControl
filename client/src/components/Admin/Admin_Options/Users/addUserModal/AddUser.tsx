/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */

// librarys
import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import type { SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { Button, Checkbox, Group, Input, Modal, PasswordInput, Radio, TextInput, Title } from '@mantine/core'
import { Icon } from '@iconify/react'
import { render } from '@react-email/render'
import { initializeApp } from 'firebase/app'
import { showNotification } from '@mantine/notifications'
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import iconAddUser from '@iconify-icons/ph/user-plus'
import iconKey from '@iconify-icons/ph/key'
import Fieldset from '../../../../operator-layout/Fieldset'
import { Camera } from '../../../../Camera/Camera'
import { useForm } from '@mantine/form'

// assets
import { firebaseAuth, firebaseConfig } from '../../../../../firebase'
import TemplateEmail from '../../../../Email/TemplateEmail'
import sendCustomEmail from '../../../../../tools/SendCustomEmail'
import { useTheme } from '../../../../../styles/contextTheme'
import * as styles from './AddUser.css'
import type { IArrImages, IIdArray, IUser } from 'src/interfaces'
import '../../../../operator-layout/responsive.css'
import { userStore } from '../../../../../zustand/userStore'
import { createUser } from '../../../../../fetch/User/postCreateUser'
import { getRoles } from '../../../../../fetch/Role/getRoles'
import { getUsersActive } from '../../../../../fetch/User/getUsersActive'
import { paginationStore } from '../../../../../zustand/paginationStore'

// Generamos password
export function passGenerate(lenght: 10) {
  const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // no ñ
  let result = ''
  for (let i = 0; i <= lenght; i++)
    result += alph.charAt(Math.floor(Math.random() * alph.length))
  return result
}

export function AddUser() {
  // Stores
  const { addUser, users, setUsers } = userStore()
  const { pageSize, pageIndex, setCount } = paginationStore()
  // Get Data From Database
  const [checked, setChecked] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState()
  const [roles, setRoles] = useState()
  const [open, setOpen] = useState(false)
  const [picture, setPicture] = useState<any | undefined>()

  // Formulario
  const formulario = useForm({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      username: '',
      numberphone: '',
      password: '',
      roleId: '', // cambiar esto por una busqueda de role por nombre
    },
    validate: {
      name: value => /^[A-Za-z\s]+$/.test(value) ? null : 'Por favor ingresa un valor válido',
      lastname: value => /^[A-Za-z\s]+$/.test(value) ? null : 'Por favor ingresa un valor válido',
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Por favor ingresa un correo válido'),
      password: (value) => {
        const isValid = (value.length >= 7) && (/^[0-9a-zA-Z]*$/.test(value))
        return isValid ? null : 'Ingresa una contraseña válida'
      },
      numberphone: value => (/^[0-9]+$/.test(value) ? null : 'Ingresa un telefono válido'),
    },
  })
  //

  // Firebase
  const secondaryApp = initializeApp(firebaseConfig, 'Secondary')
  const auth = getAuth(secondaryApp)
  const authNow = firebaseAuth

  useEffect(() => {
    async function fetchData() {
      const rolesFromDB = await getRoles()
      setRoles(rolesFromDB)
    }
    fetchData()
  }, [])

  async function create(user) {
    const newUser = await createUser(user)
    if (newUser.ok === true) {
      await getUsersActive(pageSize, pageIndex + 1)
        .then((users) => {
          setUsers(users.data.result)
          setCount(users.data.count)
        })
    }

    // reseteamos todo al cerrar el formulario
    // addUser(newUser.data)
    setOpen(false)
    formulario.reset()
    setSelectedRole('')
    setPassword('')
  }

  return (
    <>

      <Group>

        <Button className={`${styles.itemOperador}`} onClick={() => setOpen(true)}>
          <Icon style={{ marginRight: '1rem' }} icon={iconAddUser} />
          <p style={{ fontSize: '1rem' }}>Agregar Usuario</p>
        </Button>
      </Group>
      <Modal
        opened={(open)}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
      >
        <Modal.Title className={styles.dialogTitle}>Agregar Usuario</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form
              style={{
                marginBottom: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
              onSubmit={formulario.onSubmit((values) => {
                create(values)
              })}
            >

              <TextInput
                label="Nombre"
                required
                withAsterisk
                placeholder="Pablo Sebastian"
                {...formulario.getInputProps('name')}
              />

              <TextInput
                label="Apellidos"
                required
                withAsterisk
                placeholder="Ruiz Gallegos"
                {...formulario.getInputProps('lastname')}
              />

              <TextInput
                label="Usuario"
                required
                withAsterisk
                placeholder="username123"
                {...formulario.getInputProps('username')}
              />

              <TextInput
                label="Correo"
                required
                withAsterisk
                placeholder="correo@correo.com"
                {...formulario.getInputProps('email')}
              />

              <TextInput
                label="Telefono"
                required
                withAsterisk
                placeholder="8112345678"
                {...formulario.getInputProps('numberphone')}
              />
              <div style={{ marginBottom: '1rem' }}>
                <div className={styles.fieldset} style={{ margin: '1rem 0 0rem 0', display: 'flex', flexDirection: 'row' }}>
                  <Title
                    style={{
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#212529',
                    }}
                    order={5}
                  >
                    Contraseña
                  </Title>
                  <div
                    style={{
                      width: '100%',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      borderRadius: '4px',
                      padding: '0 12px 0 12px',
                      borderColor: '#ced4da',
                    }}
                  >
                    <input
                      type="text"
                      value={password}
                      onChange={(ev) => {
                        setPassword(ev.target.value)
                        formulario.setFieldValue('password', ev.target.value)
                      }}
                      maxLength={20}
                      required
                      style={{ height: '36px', width: '90%', borderColor: formulario.errors.password ? 'red' : '#ced4da' }}
                    />
                    <Icon
                      className={styles.icon}
                      icon={iconKey}
                      onClick={() => {
                        const pass = passGenerate(10)
                        setPassword(pass)
                        formulario.setFieldValue('password', pass)
                      }}
                    />
                  </div>

                </div>
                {formulario.errors.password && (
                <p style={{ color: 'red', fontSize: '12px', marginLeft: '6rem' }}>
                  {formulario.errors.password}
                </p>
                )}
              </div>

              <Radio.Group
                required
                value={selectedRole}
                onChange={(value) => {
                  setSelectedRole(value)
                  formulario.setFieldValue('roleId', value)
                }}
                label="Rol del Usuario"
                withAsterisk
              >
                {roles?.roles?.length > 0
                  ? (
                    <div style={{ display: 'flex', gap: '2rem' }}>
                      {roles.roles.map(r => (
                        <Radio key={r.id} value={r.id} label={r.name} required />
                      ))}
                    </div>
                    )
                  : (
                    <p>Hola Mundo</p>
                    )}
              </Radio.Group>

              {/* <Camera
                Image={(image: any) => {
                  setPicture(image)
                }}
              />
              {picture
                  && <>
                    <img style={{ width: '40%' }} src={picture} alt="Captured" />
                    <button
                      type="button"
                      onClick={() => setPicture(null)}
                      className={styles.removeButton}
                    >
                      Eliminar
                    </button>
                  </>
              } */}
              <div className={styles.saveContainer}>
                <Button
                  style={{ width: '45%' }}
                  type="submit"
                >Guardar
                </Button>
                <Button color="red" style={{ width: '45%' }} onClick={() => setOpen(false)}>Cancelar</Button>
              </div>
            </form>
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}
