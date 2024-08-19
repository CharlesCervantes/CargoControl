import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IVisitorExit } from '../../interfaces'

export const postCreateVisitorExit = async(data: IVisitorExit) => {
  try {
    const response = await fetch(`${connection}/visitor-exit/`, {
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
      console.error('Error en postCreateVisitorEntrance:', error.message)
    throw error
  }
}
