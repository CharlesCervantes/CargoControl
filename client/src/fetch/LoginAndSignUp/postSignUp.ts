import toast from 'react-hot-toast'
// import { itemSuccessfullyRemoved } from '../../components/Notifications/notifications'
import { connection } from '..//../env'
import { getAuthorizationHeader } from '../Token'
import type { ICompany } from '../../interfaces'

// actualizado
export const CreateOrganization = async(data: ICompany) => {
  try {
    const response = await fetch(`${connection}/auth/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `${errorBody.msj}`
      toast.error(errorMessage, {
        duration: 3000,
      })
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}

export const createDemo = async(data: { organizationName: string, username: string, password: string, name: string, email: string, numberphone: string, lastname: string, terms: boolean }) => {
  console.log('data:', data)
  try {
    const response = await fetch(`${connection}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `${errorBody.msj}`
      toast.error(errorMessage, {
        duration: 3000,
      })
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
