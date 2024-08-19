import { connection } from '..//../env'
import { getAuthorizationHeader } from '../Token'
import type { ICompany } from '../../interfaces'
// actualizado
export const deleteCompanies = async(data: ICompany) => {
  console.log('Deleteee', data)
  try {
    const response = await fetch(`${connection}/company/delete/${data.id}`, {
      method: 'PATCH',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText} ${errorBody.msg}`
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
