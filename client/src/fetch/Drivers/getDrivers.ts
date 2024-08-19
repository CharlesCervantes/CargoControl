import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// Actualizado
export const getDrivers = async() => {
  try {
    const request = await fetch(`${connection}/driver/`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const errorBody = await request.json()
      const errorMessage = `Error en la solicitud: ${errorBody.message}`
      throw new Error(errorMessage)
    }

    const response = await request.json()
    return response
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
