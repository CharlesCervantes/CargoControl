import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getUnitReport = async(pageSize: number, pageIndex: number) => {
  try {
    const response = await fetch(`${connection}/entrance-units/excel/pageSize/${pageSize}/pageIndex/${pageIndex}`, {
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
    console.log('dataInGetUnitReport:', data)
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getVisitorsInside:', error.message)
    throw error
  }
}
