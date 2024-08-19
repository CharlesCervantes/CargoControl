import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IExitUnits } from '../../interfaces'

export const postCreateUnitExit = async(data: IExitUnits) => {
  try {
    const formData = new FormData()
    const boundary = `-------------------------${Math.random().toString(36).substring(2)}`

    formData.set('Content-Type', `multipart/form-data; boundary=${boundary}`)

    const json = JSON.stringify(data)
    formData.append('data', json)

    const response = await fetch(`${connection}/exit-units/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
      },
      body: formData,
    })
    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
