import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getVehicleTypes = async() => {
  try {
    const request = await fetch(`${connection}/vehicle-types/`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const errorBody = await request.json()
      const errorMessage = `Error al optener los tipos de vhicul: ${errorBody.message}`
      throw new Error(errorMessage)
    }

    const data = await request.json()
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getVisitorsInside:', error.message)
    throw error
  }
}
