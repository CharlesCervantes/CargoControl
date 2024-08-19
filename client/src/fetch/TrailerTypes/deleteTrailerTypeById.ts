import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const deleteTrailerTypes = async(id: string) => {
  console.log('id recibido:', id)
  try {
    const response = await fetch(`${connection}/trailer-types/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
    })
    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    } else {
      console.log('ok')
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      console.error('Error en deleteTrailerTypes:', error.message)
    throw error
  }
}
