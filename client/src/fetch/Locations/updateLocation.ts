import { connection } from '..//../env'
import { getAuthorizationHeader } from '../Token'
import type { ILocation } from '../../interfaces'

// actulizado
export const updateLocation = async(data: ILocation) => {
  try {
    const response = await fetch(`${connection}/locations/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
