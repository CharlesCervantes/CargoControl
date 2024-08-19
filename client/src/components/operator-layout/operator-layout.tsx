import { Icon } from '@iconify/react'
import iconSignOut from '@iconify-icons/ph/sign-out'
import { MantineProvider } from '@mantine/core'
import iconTruck from '@iconify-icons/ph/truck'
import iconPerson from '@iconify-icons/ph/user-circle'
import iconJeep from '@iconify-icons/ph/jeep'
import iconVisitor from '@iconify-icons/ph/person-simple-walk'
import iconRegist from '@iconify-icons/ph/user-circle'
import iconRegistVisitor from '@iconify-icons/ph/person-simple-walk'
import iconCircleWavyWarningLight from '@iconify-icons/ph/circle-wavy-warning'
import iconQR from '@iconify-icons/ph/qr-code'
import iconNotePencil from '@iconify-icons/ph/note-pencil'
import iconDisplay from '@iconify-icons/ph/caret-up-bold'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ThemeSwitcher } from '../../styles/themeSwitcher'
import { useTheme } from '../../styles/contextTheme'
import RegistegicIso2022 from '../../assets/LogoSolo.png'
import otroLogo from '../../assets/Logo4.png'
import './responsive.css'
import { paginationStore } from '../../zustand/paginationStore'
import { driverStore } from '../../zustand/DriverStore'
import { vehicleStore } from '../../zustand/VehicleStore'
import { trailerStore } from '../../zustand/TrailerStore'
import { getDriversInside } from '../../fetch/Drivers/getDriversInside'
import { getVehiclesInside } from '../../fetch/Vehicles/getVehiclesInside'
import { getTrailersInside } from '../../fetch/Trailers/getTrailersInside'
import * as styles from './operator-layout.css'
import { TableIncidentsInOperator } from './IncidentsTable/incidents'

export function OperatorLayout() {
  const { reset } = paginationStore()
  const { theme } = useTheme()
  const [activo, setActivo] = useState(0)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState<null | 'accesos' | 'unidades' | 'registros'>(null)
  const { setDrivers, drivers } = driverStore()
  const { setVehicle, Vehicle } = vehicleStore()
  const { setTrailer, Trailer } = trailerStore()

  // FIREBASE
  const [userInSession, setUserInSession] = useState('')
  useEffect(() => {
    document.body.className = theme
    // onAuthStateChanged(auth, (usuario) => {
    //   if (usuario)
    //     setUserInSession(usuario.email)
    // })
  }, [theme])

  useEffect(() => {
    console.log('reseteamos la info de la tabla')
    reset()
  }, [])
  const closeSession = () => {
    // signOut(auth)
    navigate('/auth')
  }

  async function driverInsideData() {
    console.log('in driversdatafunction')
    await getDriversInside()
      .then((data) => {
        setDrivers(data.data)
        console.log('driver.data:', drivers)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function vehicleInsideData() {
    console.log('in driversdatafunction')
    await getVehiclesInside()
      .then((data) => {
        setDrivers(data.data)
        console.log('vehicle.data:', Vehicle)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function trailerInsideData() {
    console.log('in driversdatafunction')
    await getTrailersInside()
      .then((data) => {
        setDrivers(data.data)
        console.log('trailer.data:', Trailer)
      })
      .catch((e) => {
        console.log(e)
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
            <h1 style={{ fontSize: '1rem' }} className={menuAbierto ? styles.registegic : styles.texto}><img
              onClick={() => setMenuAbierto(!menuAbierto)}
              src={otroLogo}
              className={styles.logo}
              alt="Info Guard Logo"
                                                                                                        />
            </h1>
          </a>
        </div>
        <div className={[styles.section, styles.flexGrow].join(' ')} >
          <button
            className={[
              styles.linkSelect,
              menuAbierto ? '' : styles.linkSelectCerrado,
            ].join(' ')}
            onClick={() => setActiveMenu(activeMenu !== 'accesos' ? 'accesos' : null)}
          >
            <Icon className={styles.icon} icon={iconPerson} />
            {menuAbierto && (
              <>
                <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Visitantes</p>
                <Icon className={styles.icon} icon={iconDisplay} flip={activeMenu === 'accesos' ? 'horizontal' : 'vertical'} />
              </>
            )}
          </button>
          {activeMenu === 'accesos'
            ? (
              <>
                <Link
                  className={activo === 1 ? styles.linkActivoBEnter : styles.linkBEnter}
                  to="/operator/visitor-enter"
                  onClick={() => {
                    if (activo !== 1)
                      reset()
                    setActivo(1)
                  }}
                >
                  <Icon className={styles.iconEnter} icon={iconVisitor} />
                  {menuAbierto && (
                    <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Entrada</p>
                  )}
                </Link>
                <Link
                  className={activo === 2 ? styles.linkActivoBExit : styles.linkBExit}
                  to="/operator/visitor-exit"
                  onClick={() => {
                    if (activo !== 2)
                      reset()
                    setActivo(2)
                  }}
                >
                  <Icon className={styles.iconExit} icon={iconVisitor} flip="horizontal" />
                  {menuAbierto && (
                    <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Salida</p>
                  )}
                </Link>
              </>
              )
            : null
          }
          <button
            className={[
              styles.linkSelect,
              menuAbierto ? '' : styles.linkSelectCerrado,
            ].join(' ')}
            onClick={() => setActiveMenu(activeMenu !== 'unidades' ? 'unidades' : null)}
          >
            <Icon className={styles.icon} icon={iconJeep} />
            {menuAbierto && (
              <>
                <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Unidades</p>
                <Icon className={styles.icon} icon={iconDisplay} flip={activeMenu === 'unidades' ? 'horizontal' : 'vertical'} />
              </>
            )}
          </button>
          {activeMenu === 'unidades'
            ? (
              <>
                <Link
                  className={activo === 3 ? styles.linkActivoBEnter : styles.linkBEnter}
                  to="/operator/trade-enter"
                  onClick={() => {
                    if (activo !== 3)
                      reset()
                    setActivo(3)
                  }}
                >
                  <Icon className={styles.iconEnter} icon={iconTruck} />
                  {menuAbierto && (
                    <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Entrada</p>
                  )}
                </Link>
                <Link
                  className={activo === 4 ? styles.linkActivoBExit : styles.linkBExit}
                  to="/operator/trade-exit"
                  onClick={() => {
                    if (activo !== 4) {
                      driverInsideData()
                      vehicleInsideData()
                      trailerInsideData()
                      reset()
                    }
                    reset()
                    setActivo(4)
                  }}
                >
                  <Icon className={styles.iconExit} icon={iconTruck} flip="horizontal" />
                  {menuAbierto && (
                    <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Salida</p>
                  )}
                </Link>
              </>
              )
            : null
          }
          <Link
            className={activo === 5 ? styles.linkActivoB : styles.linkBB}
            to="/operator/incidents"
            onClick={() => {
              if (activo !== 5)
                reset()
              setActivo(5)
            }}
          >
            <Icon className={styles.icon} icon={iconCircleWavyWarningLight} />
            {menuAbierto && (
              <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Incidencias</p>
            )}
          </Link>
          <button
            className={[
              styles.linkSelect,
              menuAbierto ? '' : styles.linkSelectCerrado,
            ].join(' ')}
            onClick={() => setActiveMenu(activeMenu !== 'registros' ? 'registros' : null)}
          >
            <Icon className={styles.icon} icon={iconNotePencil} />
            {menuAbierto && (
              <>
                <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Registros</p>
                <Icon className={styles.icon} icon={iconDisplay} flip={activeMenu === 'registros' ? 'horizontal' : 'vertical'} />
              </>
            )}
          </button>
          {activeMenu === 'registros'
            ? (
              <>
                <Link
                  className={activo === 6 ? styles.linkActivoB : styles.linkB}
                  to="/operator/visitor-table"
                  onClick={() => {
                    if (activo !== 6)
                      reset()
                    setActivo(6)
                  }}
                >
                  <Icon className={styles.icon} icon={iconRegistVisitor} />
                  {menuAbierto && (
                    <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Visitantes</p>
                  )}
                </Link>
                <Link
                  className={activo === 7 ? styles.linkActivoB : styles.linkB}
                  to="/operator/records"
                  onClick={() => {
                    if (activo !== 7)
                      reset()
                    setActivo(7)
                  }}
                >
                  <Icon className={styles.icon} icon={iconTruck} />
                  {menuAbierto && (
                    <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Unidades</p>
                  )}
                </Link>

                <Link
                  className={activo === 8 ? styles.linkActivoB : styles.linkB}
                  to="/operator/incidentsTable"
                  onClick={() => {
                    if (activo !== 8)
                      reset()
                    setActivo(8)
                  }}
                >
                  <Icon className={styles.icon} icon={iconCircleWavyWarningLight} />
                  {menuAbierto && (
                  <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Incidencias</p>
                  )}
                </Link>
              </>
              )
            : null
          }
          {/* <Link
            className={activo === 5 ? styles.linkActivoB : styles.linkBB}
            to="/operator/incidents"
            onClick={() => setActivo(5)}
          >
            <Icon className={styles.icon} icon={iconCircleWavyWarningLight} />
            {menuAbierto && (
              <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Incidencia</p>
            )}
          </Link> */}
          {/* <Link
            className={activo === 9 ? styles.linkActivoB : styles.linkBB}
            to="/operator/qr-generator"
            onClick={() => {
              if (activo !== 9)
                reset()
              setActivo(9)
            }}

          >
            <Icon className={styles.icon} icon={iconQR} />
            {menuAbierto && (
              <p style={{ fontSize: '0.9rem' }} className={menuAbierto ? '' : styles.texto}>Calendario QR</p>
            )}
          </Link> */}
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
