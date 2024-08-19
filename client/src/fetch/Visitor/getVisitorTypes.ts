import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getVisitorTypes = async(pageSize: number, pageIndex: number) => {
  try {
    const response = await fetch(`${connection}/visitor-type/pageSize/${pageSize}/pageIndex/${pageIndex}`, {
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
      console.error('Error en getVisitorsInside:', error.message)
    throw error
  }
}

export const getAllVisitorTypes = async() => {
  try {
    const request = await fetch(`${connection}/visitor-type/`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const errorbody = await request.json()
      const errorMessage = `Al obtener los tipos de visitantes: ${request.status} ${request.statusText}, ${errorbody.message}`
      throw new Error(errorMessage)
    }

    const response = await request.json()
    return response
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getVisitorsInside:', error.message)
    throw error
  }
}
