import { toast } from 'react-hot-toast'
import { connection } from '..//../env'
import { getAuthorizationHeader } from '../Token'
import type { ICompany } from '../../interfaces'
// actualizado
export const CreateLocations = async(data: ICompany) => {
  try {
    const response = await fetch(`${connection}/locations/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `${errorBody.message}`
      // const errorMessage = `Error en la solicitud: ${response.status}: ${errorBody.message}`
      throw new Error(errorMessage)
    }
    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
