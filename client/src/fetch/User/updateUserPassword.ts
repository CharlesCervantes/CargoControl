import { toast } from 'react-hot-toast'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
// actulizado
export const updateUserPassword = async(id: string, password: string) => {
  try {
    const data = {
      password,
    }
    const request = await fetch(`${connection}/user/update/${id}`, {
      method: 'PATCH',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseBody = await request.json()
    if (responseBody.ok) {
      toast.success(responseBody.message, {
        duration: 3000,
        position: 'top-center',
      })
    } else {
      toast.error(responseBody.message, {
        duration: 3000,
        position: 'top-center',
      })
    }
    return responseBody
  } catch (error) {
    console.log('Error:', error)
  }
}
