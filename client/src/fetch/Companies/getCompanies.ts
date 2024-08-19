import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export const getCompanies = async(pageSize: number, pageIndex: number) => {
  try {
    const response = await fetch(`${connection}/company/pageSize/${pageSize}/pageIndex/${pageIndex}`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(response)
    return data
  } catch (error) {
    console.log(error)
  }
}
