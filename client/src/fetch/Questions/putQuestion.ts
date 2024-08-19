import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IQuestion } from '../../interfaces'

// actualizado, actualizar importaciones
export const putQuestion = async(data: IQuestion) => {
  try {
    const response = await fetch(`${connection}/question/`, {
      method: 'PUT',
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
      console.error('Error en postCreateQuestion:', error.message)
    throw error
  }
}
