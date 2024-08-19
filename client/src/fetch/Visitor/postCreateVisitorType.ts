import { toast } from 'react-hot-toast'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IVisitorType } from '../../interfaces'

// actualizado
export const postCreateVisitorType = async(data: IVisitorType) => {
  try {
    const response = await fetch(`${connection}/visitor-type/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log('myResponse:', response)
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `${errorBody.message}`
      throw new Error(errorMessage)
    }
    const result = await response.json()
    return result
  } catch (error: unknown) {
    if (error instanceof Error)
      throw error
  }
}
