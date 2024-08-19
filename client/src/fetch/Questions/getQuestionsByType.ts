import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado, actualizar importaciones
export const getQuestionsByType = async(type: string) => {
  try {
    const response = await fetch(`${connection}/question/by-type/${type}`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })
    console.log('response:', response)
    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getQuestionsByType:', error.message)

    throw error
  }
}
