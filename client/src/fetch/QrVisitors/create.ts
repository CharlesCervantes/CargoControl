import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IQrVisitor } from '../../interfaces'

// actualizado
export const postCreateQrVisitorPreEntrance = async(data: IQrVisitor) => {
  try {
    const formData = new FormData()
    const json = JSON.stringify(data)
    formData.append('data', json)

    const request = await fetch(`${connection}/qr-visitor/`, {
      method: 'POST',
      body: formData,
      headers: {
        ...getAuthorizationHeader(),
      },
    })

    if (!request.ok) {
      const errorMessage = `Error en la solicitud: ${request.status} ${request.statusText}`
      throw new Error(errorMessage)
    }

    const result = await request.json()
    return result
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en postCreateVisitorEntrance:', error.message)
    throw error
  }
}
