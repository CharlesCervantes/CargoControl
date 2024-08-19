import { base64ToBlob } from '../../tools/base64ToPng'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IArrImages, IVisitorEntrance } from '../../interfaces'

// actualizado
export const postCreateVisitorEntrance = async(data: IVisitorEntrance, imagesToSend: Array<IArrImages>) => {
  try {
    const formData = new FormData()

    const json = JSON.stringify(data)
    formData.append('data', json)

    imagesToSend.forEach((element) => {
      const blobElement = base64ToBlob(element.base64)
      const file = new File([blobElement], element.name, { type: 'image/png' })
      formData.append('images', file)
    })

    const response = await fetch(`${connection}/visitor-entrance/`, {
      method: 'POST',
      body: formData,
      headers: {
        ...getAuthorizationHeader(),
      },
    })

    console.log('Response: ', response)

    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en postCreateVisitorEntrance:', error.message)
    throw error
  }
}
