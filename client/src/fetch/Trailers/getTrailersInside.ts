import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getTrailersInside = async() => {
  try {
    const response = await fetch(`${connection}/trailer/inside`, {
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
      console.error('Error en getVisitorsInside:', error.message)
    throw error
  }
}
