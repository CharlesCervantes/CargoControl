import { toast } from 'react-hot-toast'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IUser } from '../../interfaces'

// actualizado
export const deleteUser = async(data: IUser) => {
  console.log('1.1Data:', data)
  try {
    const response = await fetch(`${connection}/user/${data.id}`, {
      method: 'PATCH',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `${errorBody.msj}`
      toast.error(errorMessage, {
        duration: 3000,
        position: 'bottom-right',
      })
      throw new Error(errorMessage)
    } else {
      toast.success('Usuario Eliminado Exitosamente!', {
        duration: 3000,
        position: 'bottom-right',
      })
    }
    const result = await response.json()

    return result
  } catch (error: unknown) {
    if (error instanceof Error)
      throw error
  }
}
