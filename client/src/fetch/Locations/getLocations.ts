import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// Funcion para tablas
export const getLocations = async(pageSize: number, pageIndex: number) => {
  try {
    const request = await fetch(`${connection}/locations/pageSize/${pageSize}/pageIndex/${pageIndex}`, {
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const erroBody = await request.json()
      const errorMessage = `Error al obtener las localizaciones: ${erroBody.message}`
      throw new Error(errorMessage)
    }

    const response = await request.json()
    return response
  } catch (error: unknown) {
    if (error instanceof Error)
      throw error
  }
}

export const getAllLocations = async() => {
  try {
    const request = await fetch(`${connection}/locations/`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const erroBody = await request.json()
      const errorMessage = `Error al obtener las localizaciones: ${erroBody.message}`
      throw new Error(errorMessage)
    }

    const response = await request.json()
    return response
  } catch (error: unknown) {
    if (error instanceof Error)
      throw error
  }
}

// Funcion para formularios

export const getEveryLocation = async() => {
  try {
    const response = await fetch(`${connection}/locations/`, {
      headers: {
        ...getAuthorizationHeader(),
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
