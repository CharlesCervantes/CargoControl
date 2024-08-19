import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { ITrailerType } from '../../interfaces'

export const postTrailerTypes = async(data: ITrailerType) => {
  try {
    const response = await fetch(`${connection}/trailer-types/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `Error al crear el tipo de trailer: ${errorBody.message}`
      throw new Error(errorMessage)
    }

    const req = await response.json()
    return req
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en postTrailerTypes', error.message)
    throw error
  }
}
