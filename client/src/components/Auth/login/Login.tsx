/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Button, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { updateUserToken } from '../../../fetch/User/updateUserToken'
import { getRoleById } from '../../../fetch/Role/getRoleById'
import RegistegicLogo2022 from '../../../assets/LogoSolo.png'
import { connection, dev_env, prod_env } from '../../../env'
import { vars } from '../../../styles/themes.css'
import { LoginPost } from '../../../fetch/LoginAndSignUp/postLogin'
import { sesionStore } from '../../../zustand/sesionStore'
import * as styles from './login.css'
import '../loginQR/loginSlide.css'
import { CreateDemoForm } from './createDemoForm'
import { ResetSession } from './resetSession'
import type { UserCredential } from 'firebase/auth'
import type { UserModel } from '../../../Models'
import type { IUser } from '../../../interfaces'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = React.useState(false)
  const [showError, setError] = React.useState(false)
  const { setUser, user } = sesionStore()
  const [saveUser, setSaveUser] = useState<IUser>(
    {
      name: '',
      username: '',
      password: '',
      email: '',
      roleId: '',
      lastname: '',
    })
  const [opened, { open, close }] = useDisclosure(false)

  const toggleShow = () => setShow(!show)
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setUser(saveUser)
  }, [saveUser])

  async function onSuccess() {
    const data = {
      email,
      password,
    }
    try {
      const result = await LoginPost(data)

      if (result && result.token) {
        // primero guardamos el token de la sesion en el local storage y en la bd
        localStorage.setItem('authToken', result.token)
        const updateResult = await updateUserToken(result.data.user.id, result.token)
        // dirigimos al usuario segun su role
        if (updateResult) {
          if (result.data.user.Role.name === 'admin')
            navigate('/admin/inicio')
          if (result.data.user.Role.name === 'user')
            navigate('/operator/visitor-enter')
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      onError()
    }
  }

  function onError() {
    // showNotification({ title: 'Error', message: 'El usuario o la contraseña son incorrectos' })
    setError(true)
  }

  const handleSignUpClick = () => {
    const container = document.getElementById('containerL')
    if (container)
      container.classList.add('right-panel-active')
  }

  const handleSignInClick = () => {
    const container = document.getElementById('containerL')
    if (container)
      container.classList.remove('right-panel-active')
  }

  return (
    <div className={styles.all}>
      <CreateDemoForm opened={opened} close={close} />

      <div className={styles.body}>

        <div className="containerL" id="containerL">
          <div className="form-containerL sign-up-containerL">
            <div className={styles.signInContainer}>
              <div>
                <img
                  className={styles.image}
                  src={RegistegicLogo2022}
                  alt="Info Guard Logo"
                />
                <div className={`${styles.footer}`}>
                  <p className={styles.p}>Powered By <span style={{ color: vars.colors.blue400 }}>Industrial Code</span></p>
                </div>
              </div>
              <div>
                <form className={styles.form} onSubmit={(e) => { e.preventDefault() }}>
                  <div className={`${styles.marginButton}`}>
                    <h1 className={styles.h1}>Crea una cuenta</h1>

                  </div>
                  <input className={styles.input2} type="email" placeholder="Correo" />
                  <input className={styles.input2} type="password" placeholder="Contraseña" />
                  <a style={{ fontSize: '10px' }}>¿Deseas Probar un Demo?</a>
                  <div className={`${styles.marginButton}`}>
                    <button className={styles.button}>Registrate</button>
                  </div>
                </form>
              </div>
              <div className={styles.button3Container}>
                <p className={styles.button3P}>¿Tienes cuenta?</p>
                <button className={styles.button3} id="signIn" onClick={handleSignInClick}>Ingresar</button>
              </div>
            </div>
          </div>
          <div className="form-containerL sign-in-containerL">
            <div className={styles.signInContainer}>
              <div>
                <img
                  className={styles.image}
                  src={RegistegicLogo2022}
                  alt="Info Guard Logo"
                />
                <div className={`${styles.footer}`}>
                  <p className={styles.p}>Powered By <span style={{ color: vars.colors.blue400 }}>Industrial Code</span></p>
                </div>
              </div>
              <div>
                <form className={styles.form} onSubmit={(e) => { e.preventDefault() }}>
                  <div className={`${styles.marginButton}`}>
                    <h1 className={styles.h1}>Iniciar sesión</h1>
                  </div>
                  <input
                    className={styles.input2}
                    type="email"
                    placeholder="Correo"
                    onChange={ev => setEmail(ev.target.value)}
                    maxLength={60}
                    minLength={1}
                    required
                  />
                  <p className={styles.errorMessage} style={{ display: 'none' }}>Correo no válido</p>
                  <input
                    className={styles.input2}
                    type="password"
                    placeholder="Contraseña"
                    onChange={ev => setPassword(ev.target.value)}
                    maxLength={29}
                    minLength={1}
                    required
                  />
                  <div className={`${styles.marginButton}`}>
                    <button className={styles.button} onClick={onSuccess}>Ingresar</button>
                  </div>
                </form>
              </div>

              <div className={styles.button3Container}>
                <div>
                  <p className={styles.button3P}>¿No tienes cuenta?</p>
                  <button className={styles.button3} id="signUp" onClick={open}>Solicitar una Demo</button>
                </div>
                <div>
                  <p className={styles.button3P}>¿Problemas con Sesión?</p>
                  <button className={styles.button3} id="signUp" onClick={open}>Restablecer sesión</button>
                </div>
              </div>
            </div>
          </div>
          <div className="overlayL-containerL">
            <div className="overlayL">
              <div className="overlayL-panel overlayL-left">
                <h1 className={styles.h1}>¿Tienes cuenta?</h1>
                <p className={styles.p}>Ingresa con tu correo y contraseña ya registrados</p>
                <button className={styles.button2} id="signIn" onClick={handleSignInClick}>Ingresar</button>
              </div>
              <div className="overlayL-panel overlayL-right">
                <div>
                  <h1 className={styles.h1}>¿No tienes cuenta?</h1>
                  <button style={{ marginTop: '10px' }} className={styles.button2} id="signUp" onClick={open}>Solicitar una Demo</button>
                </div>
                <div>
                  <h1 className={styles.h1}>¿Problemas con iniciar sesión?</h1>
                  <ResetSession />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
