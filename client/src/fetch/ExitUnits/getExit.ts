import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// Actualizado
export const fetchUnitExitData = async() => {
  try {
    const response = await fetch(`${connection}/exit-units/`, {
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
