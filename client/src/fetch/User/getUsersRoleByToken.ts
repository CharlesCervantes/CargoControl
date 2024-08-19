import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actulizado
export const fetchUserRole = async() => {
  const token = localStorage.getItem('authToken')
  try {
    const response = await fetch(`${connection}/user/${token}`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }
    const data = await response.json()
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.log('Error en getUsersRole:', error.message)
  }
}
