import { errorGettingData } from '../../components/Notifications/notifications'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// Actualizado
export const getDriversOutside = async() => {
  try {
    const response = (await fetch(`${connection}/driver/outside`, {
      headers: {
        ...getAuthorizationHeader(),
      },
    })).json()
    console.log('1.3response:', response)
    return response
  } catch (error) {
    errorGettingData('Conductores Outside')
  }
}
