
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IVisitorExit } from '../../interfaces'

// actualizado
export const createExitVisitorFetch = async(data: IVisitorExit) => {
  console.log(data)
  try {
    const response = await fetch(`${connection}/visitor-exit/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok === false) {
      const errorBody = await response.json()
      const errorMessage = `Error: ${errorBody.message}`
      throw new Error(errorMessage)
    }

    const result = await response.json()

    return result
  } catch (error) {
    if (error instanceof Error)
      console.error('Error en createExitVisitorFetch:', error)
    throw error
  }
}
