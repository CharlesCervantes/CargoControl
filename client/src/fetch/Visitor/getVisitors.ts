import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getVisitors = async(pageSize: number, pageIndex: number) => {
  try {
    const response = await fetch(`${connection}/visitor-entrance/pageSize/${pageSize}/pageIndex/${pageIndex}`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }
    const data = await response.json()
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getVisitors:', error.message)

    throw error
  }
}
