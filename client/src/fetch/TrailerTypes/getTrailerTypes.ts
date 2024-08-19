import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getTrailerTypes = async() => {
  try {
    const request = await fetch(`${connection}/trailer-types/`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const erroBody = await request.json()
      const errorMessage = `Error al obtener los tipos de trailes: ${erroBody.message}`
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
