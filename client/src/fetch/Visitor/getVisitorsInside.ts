import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getVisitorsInside = async() => {
  try {
    const response = await fetch(`${connection}/visitor/inside`, {
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
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getVisitorsInside:', error.message)
    throw error
  }
}
