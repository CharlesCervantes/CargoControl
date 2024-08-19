import { toast } from 'react-hot-toast'
// import { noUserFound, userFound } from '../../components/Notifications/notifications'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { ILogin } from '../../interfaces'
// actualizado
export const LoginPost = async(data: ILogin) => {
  try {
    const response = await fetch(`${connection}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText} ${errorBody.message}`
      toast.error(errorBody.message)
      throw new Error(errorMessage)
    }

    const result = await response.json()
    // userFound(data.email)
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}

export const resetSession = async(data: ILogin) => {
  try {
    const response = await fetch(`${connection}/auth/resetSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText} ${errorBody.message}`
      toast.error(errorBody.message)
      throw new Error(errorMessage)
    }

    const result = await response.json()
    // userFound(data.email)
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
