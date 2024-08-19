/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import iconBuildings from '@iconify-icons/ph/buildings'
import iconHouse from '@iconify-icons/ph/house'
import { MantineProvider } from '@mantine/core'
import iconTruck from '@iconify-icons/ph/truck'
import iconUsers from '@iconify-icons/ph/users'
import iconPerson from '@iconify-icons/ph/person-simple-walk'
import iconNotePencil from '@iconify-icons/ph/note-pencil'
import iconSignOut from '@iconify-icons/ph/sign-out'
import iconDisplay from '@iconify-icons/ph/caret-up-thin'
import iconCatalog from '@iconify-icons/ph/list-dashes'
import iconCheck from '@iconify-icons/ph/check-square'
import iconLocations from '@iconify-icons/ph/map-trifold'
import iconPrimeUser from '@iconify-icons/ph/user-gear'
import iconQR from '@iconify-icons/ph/qr-code'
import iconTow from '@iconify-icons/tabler/truck-loading'
import iconChecklist from '@iconify-icons/ph/check-square-offset'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { motion, spring } from 'framer-motion'
import iconIncidents from '@iconify-icons/ph/circle-wavy-warning'
import { ThemeSwitcher } from '../../styles/themeSwitcher'
import RegistegicLogo from '../../assets/LogoSolo.png'
import otroLogo from '../../assets/Logo4.png'
import { useTheme } from '../../styles/contextTheme'
import { paginationStore } from '../../zustand/paginationStore'
import { sesionStore } from '../../zustand/sesionStore'
import * as styles from './Admin.css'
import { Locations } from './Admin_Options/Catalogs/Locations/Locations'
// import { VehicleTypeChecklist } from './Admin_Options/Checklist/Checklist'
import { ShowChecklist } from './Admin_Options/Checklist/ShowChecklist'

// Iniciamos Firebase Auth
const auth = getAuth()

export function Admin() {
  const { reset } = paginationStore()
  // const { user } = sesionStore()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [openedIcon, setOpenedIcon] = useState(null)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [activo, setActivo] = useState(0)
  // ---------------FIREBASE--------------//
  const [userInSession, setUserInSession] = useState('')
  useEffect(() => {
    document.body.className = theme
    // onAuthStateChanged(auth, (usuario) => {
    //   if (usuario)
    //     setUserInSession(usuario.email || '')
    // })
  }, [theme])

  useEffect(() => {
    reset()
  }, [])
  const closeSession = () => {
    navigate('/auth')
  }

  const handleIconClick = (menuName: any) => {
    if (openedIcon === menuName)
      setOpenedIcon(null)
    else
      setOpenedIcon(menuName)
  }

  // -------------------------------------//
  // if (auth.currentUser !== null) {
  return (
    <div className={`${styles.pageContainer} ${theme}`}>
      <div
        className={[`${styles.sideBarContainer} ${theme} `, menuAbierto ? '' : styles.sidebarCerrado].join(' ')}
      >
        <div className={styles.section}>
          <a className={styles.headerLink}>
            <img
              onClick={() => {
                setMenuAbierto(!menuAbierto)
                reset()
              }}
              className={styles.logo}
              src={RegistegicLogo}
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
        <div className={[styles.section, styles.flexGrow].join(' ')}>
          {/* Inicio ************ */}
          <Link
            className={activo === 1 ? styles.linkActivo : styles.link}
            to="/admin/inicio"
            onClick={() => {
              if (activo !== 1)
                reset()
              setActivo(1)
            }}
          >
            <Icon className={styles.icon} icon={iconHouse} />
            {menuAbierto && (
              <p className={menuAbierto ? '' : styles.textoCerrado}>Inicio</p>
            )}
          </Link>
          {/* Agregar Usuario ************* */}
          <Link
            className={activo === 2 ? styles.linkActivo : styles.link}
            to="/admin/users"
            onClick={() => {
              if (activo !== 2)
                reset()
              setActivo(2)
            }}
          >
            <Icon className={styles.icon} icon={iconUsers} />
            {menuAbierto && (
            <p className={menuAbierto ? '' : styles.textoCerrado}>Usuarios</p>
            )}
          </Link>
          {/* Registros ******************* */}
          <button
            className={styles.link}
            onClick={() => {
              handleIconClick('registros')
              reset()
            }}
          >
            <Icon className={styles.icon} icon={iconNotePencil} />
            <p className={menuAbierto ? '' : styles.textoCerrado}>Registros</p>
            <Icon className={styles.icon} icon={iconDisplay} flip={openedIcon === 'registros' ? 'horizontal' : 'vertical'} />
          </button>
          {openedIcon === 'registros'
            ? (
              <>
                <Link
                  className={activo === 3 ? styles.linkActivoB : styles.linkB}
                  to="/admin/inputRecords"
                  onClick={() => {
                    if (activo !== 3)
                      reset()
                    setActivo(3)
                  }}
                >
                  <Icon className={styles.icon} icon={iconTruck} />
                  {menuAbierto && (
                    <p className={menuAbierto ? '' : styles.textoCerrado}>Unidades</p>
                  )}
                </Link>
                <Link
                  className={activo === 4 ? styles.linkActivoB : styles.linkB}
                    // to="/admin/outputRecords"
                  to="/admin/visitors"
                  onClick={() => {
                    if (activo !== 4)
                      reset()
                    setActivo(4)
                  }}
                >
                  <Icon className={styles.icon} icon={iconPerson} />
                  {menuAbierto && (
                    <p className={menuAbierto ? '' : styles.textoCerrado}>Accesos</p>
                  )}
                </Link>
                <Link
                  className={activo === 7 ? styles.linkActivoB : styles.linkB}
                  to="/admin/incidents"
                  onClick={() => {
                    if (activo !== 7)
                      reset()
                    setActivo(7)
                  }}
                >
                  <Icon className={styles.icon} icon={iconIncidents} />
                  {menuAbierto && (
                    <p className={menuAbierto ? '' : styles.textoCerrado}>Incidencias</p>
                  )}
                </Link>
                {/* <a href="#" onClick={() => (navigate('incidents'))}> <Icon className={styles.icon} icon={iconCircleWavyWarningLight} />Incidencias</a> */}
                {/* <a href="#" onClick={() => (navigate('Registers'))}> <Icon className={styles.icon} icon={iconNotePencil} />Registros</a> */}
              </>
              )
            : null
              }
          {/* Catalogos ************************ */}
          <button
            className={styles.link}
            onClick={() => {
              handleIconClick('catalogos')
              reset()
            }}
          >
            <Icon className={styles.icon} icon={iconCatalog} />
            <p className={menuAbierto ? '' : styles.textoCerrado}>Catálogos</p>
            <Icon className={styles.icon} icon={iconDisplay} flip={openedIcon === 'catalogos' ? 'horizontal' : 'vertical'} />
          </button>
          {openedIcon === 'catalogos'
            ? (
              <>
                <Link
                  className={activo === 5 ? styles.linkActivoB : styles.linkB}
                  to="/admin/companies"
                  onClick={() => {
                    if (activo !== 5)
                      reset()
                    setActivo(5)
                  }}
                >
                  <Icon className={styles.icon} icon={iconBuildings} />
                  {menuAbierto && (
                    <p className={menuAbierto ? '' : styles.textoCerrado}>Empresas</p>
                  )}
                </Link>
                <Link
                  className={activo === 6 ? styles.linkActivoB : styles.linkB}
                  to="/admin/locations"
                  onClick={() => {
                    if (activo !== 6)
                      reset()
                    setActivo(6)
                  }}
                >
                  <Icon className={styles.icon} icon={iconLocations} />
                  {menuAbierto && (
                  <p className={menuAbierto ? '' : styles.textoCerrado}>Localizaciones</p>
                  )}
                </Link>
                <Link
                  className={activo === 8 ? styles.linkActivoB : styles.linkB}
                  to="/admin/visitorType"
                  onClick={() => {
                    if (activo !== 8)
                      reset()
                    setActivo(8)
                  }}
                >
                  <Icon className={styles.icon} icon={iconPrimeUser} />
                  {menuAbierto && (
                    <p className={menuAbierto ? '' : styles.textoCerrado}>Visitantes</p>
                  )}
                </Link>
              </>
              )
            : null
              }
          {/* Checklist ********************* */}
          <button
            className={styles.link}
            onClick={() => {
              reset()
              handleIconClick('checklist')
            }}
          >
            <Icon className={styles.icon} icon={iconCheck} />
            <p className={menuAbierto ? '' : styles.textoCerrado}>Checklist</p>
            <Icon className={styles.icon} icon={iconDisplay} flip={openedIcon === 'checklist' ? 'horizontal' : 'vertical'} />
          </button>
          {openedIcon === 'checklist'
            ? (
              <>
                <Link
                  className={activo === 9 ? styles.linkActivoB : styles.linkB}
                  to="/admin/vehicleChecklist"
                  onClick={() => {
                    if (activo !== 9)
                      reset()
                    setActivo(9)
                  }}
                >
                  <Icon className={styles.icon} icon={iconTruck} />
                  {menuAbierto && (
                    <p className={menuAbierto ? '' : styles.textoCerrado}>Unidades</p>
                  )}
                </Link>
                <Link
                  className={activo === 10 ? styles.linkActivoB : styles.linkB}
                  to="/admin/trailerChecklist"
                  onClick={() => {
                    if (activo !== 10)
                      reset()
                    setActivo(10)
                  }}
                >
                  <Icon className={styles.icon} icon={iconTow} />
                  {menuAbierto && (
                    <p className={menuAbierto ? '' : styles.textoCerrado}>Remolques</p>
                  )}
                </Link>
              </>
              )
            : null
            }
          {/* <Link
            className={activo === 11 ? styles.linkActivo : styles.link}
            to="/admin/qrGeneratorAdm"
            onClick={() => {
              if (activo !== 11)
                reset()
              setActivo(11)
            }}
          >
            <Icon className={styles.icon} icon={iconQR} />
            {menuAbierto && (
            <p className={menuAbierto ? '' : styles.textoCerrado}>Generar QR</p>
            )}
          </Link> */}
        </div>
        <div className={styles.themeContainer}>
          {/* <MantineProvider>
            <ThemeSwitcher />  //Revisar theme switcher, si se descomenta falla
          </MantineProvider> */}
        </div>
        <div className={styles.section}>
          <a className={styles.link} href="#" onClick={closeSession}>
            <Icon className={styles.iconClose} icon={iconSignOut} />
            {menuAbierto && (
              <p className={menuAbierto ? styles.texto : styles.textoCerrado}>Cerrar Sesión</p>
            )}
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  )
  // } else {
  //   return (
  //     <h1>Primero debes iniciar sesion</h1>
  //   )
  // }
}
