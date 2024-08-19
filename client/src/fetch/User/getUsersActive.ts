import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

export const getUsersActive = async(pageSize: number, pageIndex: number) => {
  try {
    const response = await fetch(`${connection}/user/pageSize/${pageSize}/pageIndex/${pageIndex}`, {
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
    console.log('MyUsersOR:', response)
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getUsersActive:', error.message)

    throw error
  }
}
