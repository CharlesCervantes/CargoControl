import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

export const getVehicleVisitorsInside = async() => {
  try {
    const response = await fetch(`${connection}/vehicle-visitor/inside`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const erroBody = await response.json()
      const errorMessage = `Error en la solicitud: ${erroBody.message}}`
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
