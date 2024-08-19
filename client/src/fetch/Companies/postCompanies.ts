import { connection } from '..//../env'
import { getAuthorizationHeader } from '../Token'
import type { ICompany } from '../../interfaces'

// actualizado
export const CreateCompany = async(data: ICompany) => {
  try {
    const response = await fetch(`${connection}/company`, {
      method: 'POST',
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
