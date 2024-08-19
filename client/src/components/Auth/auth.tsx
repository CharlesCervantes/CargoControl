import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteUserToken } from '../../fetch/User/deleteUserToken'

export function Auth() {
  const location = useLocation()

  useEffect(() => {
    // Función para eliminar el token del servidor y del localStorage
    const deleteTokenFromDBandLS = async() => {
      await deleteUserToken()
      localStorage.setItem('authToken', '')
    }

    // Agregamos evento beforeunload para detectar cuando se cierra la página
    const handleBeforeUnload = async() => {
      await deleteTokenFromDBandLS()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Limpiamos el evento beforeunload cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, []) // Esta dependencia vacía nos asegura que el efecto solo se ejecute una vez al montar el componente

  useEffect(() => {
    // Función para eliminar el token solo si la página es /auth
    const deleteToken = async() => {
      console.log('eliminando token...')
      if (localStorage.getItem('authToken')) {
        await deleteUserToken()
          .then((response) => {
            console.log('responseIs:', response)
          })
        localStorage.setItem('authToken', '')
      } else {
        console.log('no hay token')
      }
    }

    // Ejecutar la función deleteToken cuando la ubicación cambie
    if (location.pathname === '/auth')
      deleteToken()
  }, [location])

  return (
    <Outlet />
  )
}
