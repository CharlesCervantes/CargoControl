import { toast } from 'react-hot-toast'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IVisitorType } from '../../interfaces'

// actualizado
// actulizado
export const updateVisitorType = async(data: IVisitorType) => {
  try {
    const response = await fetch(`${connection}/visitor-type/`, {
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
