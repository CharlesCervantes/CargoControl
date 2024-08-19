import { base64ToBlob } from '../../tools/base64ToPng'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IArrImages, IEntrance } from '../../interfaces'

// actualizado
export const create = async(data: IEntrance, images: Array<IArrImages>) => {
  console.log('creando entrada:', data, images)
  try {
    const formData = new FormData()
    const dataString = JSON.stringify(data)
    formData.append('data', dataString)

    images.forEach((file) => {
      const blobElement = base64ToBlob(file.base64)
      const newFile = new File([blobElement], file.name, { type: 'image/png' })
      formData.append('images', newFile)
    })

    const response = await fetch(`${connection}/entrance/`, {
      method: 'POST',
      body: formData,
      headers: {
        ...getAuthorizationHeader(),
      },
    })

    if (!response.ok) {
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error)
      console.error('Error en postCreateVisitorEntrance:', error.message)
    throw error
  }
}
