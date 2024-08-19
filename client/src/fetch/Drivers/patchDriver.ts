
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IDriver } from '../../interfaces'

// actualizado
export const updateDriver = async(data: IDriver) => {
  try {
    const response = await fetch(`${connection}/driver/`, {
      method: 'PATCH',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
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
