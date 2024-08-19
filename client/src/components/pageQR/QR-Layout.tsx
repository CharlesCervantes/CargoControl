import { Icon } from '@iconify/react'
import iconSignOut from '@iconify-icons/ph/sign-out'
import { MantineProvider } from '@mantine/core'
import iconCalendar from '@iconify-icons/ph/calendar'
import iconPerson from '@iconify-icons/ph/user-circle'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ThemeSwitcher } from '../../styles/themeSwitcher'
import { useTheme } from '../../styles/contextTheme'
import RegistegicIso2022 from '../../assets/LogoSolo.png'
import * as styles from './QR-Layout.css'
import '../operator-layout/responsive.css'

const auth = getAuth()

export function QRLayout() {
  const { theme } = useTheme()
  const [activo, setActivo] = useState(0)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState<null | 'accesos' | 'unidades'>(null)

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const closeSession = () => {
    signOut(auth)
      .then(() => {
        navigate('/QR')
      })
      .catch(() => {
      })
  }
  return (
    <div className={`${styles.wrapper} ${theme}`}>
      <div
        className={[`${styles.sidebar} sidebarMov`, menuAbierto ? '' : styles.sidebarCerrado].join(' ')}
      >
        <div className={styles.section}>
          <a className={styles.headerLink}>
            <img
              onClick={() => setMenuAbierto(!menuAbierto)}
              src={RegistegicIso2022}
              className={styles.logo}
              alt="Info Guard Logo"
            />
            <h1 style={{ fontSize: '1rem' }} className={menuAbierto ? styles.registegic : styles.texto}>Registegic</h1>
          </a>
        </div>
        <div className={[styles.section, styles.flexGrow].join(' ')} >
          <Link
            className={activo === 1 ? styles.linkActivoB : styles.linkBB}
            to="qr-visitor"
            onClick={() => setActivo(1)}
          >
            <Icon className={styles.icon} icon={iconPerson} />
            {menuAbierto && (
              <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Visitante QR</p>
            )}
          </Link>
          <Link
            className={activo === 2 ? styles.linkActivoB : styles.linkBB}
            to="qr-calendar"
            onClick={() => setActivo(2)}
          >
            <Icon className={styles.icon} icon={iconCalendar} />
            {menuAbierto && (
              <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Visitante QR</p>
            )}
          </Link>
        </div>
        <div className={styles.themeContainer}>
          <MantineProvider>
            <ThemeSwitcher />
          </MantineProvider>
        </div>
        <div className={styles.section}>
          <a className={styles.linkB} href="#" onClick={() => closeSession()}>
            <Icon className={styles.iconClose} icon={iconSignOut} onClick={() => closeSession()} />
            {menuAbierto && (
              <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Cerrar sesión</p>
            )}
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
