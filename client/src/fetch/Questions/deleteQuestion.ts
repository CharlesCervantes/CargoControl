import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const deleteQuestion = async(id: string) => {
  try {
    const response = await fetch(`${connection}/question/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
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
      console.error('Error en deleteQuestion:', error.message)
    throw error
  }
}
