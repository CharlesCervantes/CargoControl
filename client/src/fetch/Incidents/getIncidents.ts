import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

export const getIncidents = async(pageSize: number, pageIndex: number) => {
  try {
    const response = await fetch(`${connection}/incident/pageSize/${pageSize}/pageIndex/${pageIndex}`, {
      headers: {
        ...getAuthorizationHeader(),
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllIncidents = async() => {
  try {
    const response = await fetch(`${connection}/incident/`, {
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
