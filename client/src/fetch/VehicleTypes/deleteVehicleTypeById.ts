import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const deleteVehicleTypes = async(id: string) => {
  console.log('id recibido:', id)
  try {
    const response = await fetch(`${connection}/vehicle-types/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      console.error('Error en deleteVehicleTypes:', error.message)
    throw error
  }
}
