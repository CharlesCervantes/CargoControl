import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IVehicleType } from '../../interfaces'

export const postVehicleTypes = async(data: IVehicleType) => {
  try {
    const response = await fetch(`${connection}/vehicle-types/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `Error al crear el tipo de vehiculo: ${errorBody.message}`
      throw new Error(errorMessage)
    }

    const req = await response.json()
    return req
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en postVehicleTypes', error.message)
    throw error
  }
}
