import { errorGettingData } from '../../components/Notifications/notifications'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// Actualizado
export const getDriversInside = async() => {
  try {
    const response = await fetch(`${connection}/driver/inside`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorBody = await response.json() // Leemos el cuerpo del error
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText} - ${errorBody.msg}`
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error)
      errorGettingData(error.message)
    throw error
  }
}
