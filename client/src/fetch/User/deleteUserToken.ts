import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
// actulizado
export const deleteUserToken = async() => {
  try {
    const request = await fetch(`${connection}/user/eraseToken/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const errorBody = await request.json()
      const erroMessage = `Error: ${errorBody.message}`
      throw new Error(erroMessage)
    }

    const responseBody = await request.json()
    return responseBody
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return error
    }
  }
}

export const closeUserSession = async(id: string) => {
  try {
    const request = await fetch(`${connection}/user/close-session/${id}`, {
      method: 'PATCH',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!request.ok) {
      const errorBody = await request.json()
      const erroMessage = `Error: ${errorBody.message}`
      throw new Error(erroMessage)
    }

    const responseBody = await request.json()
    return responseBody
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return error
    }
  }
}
