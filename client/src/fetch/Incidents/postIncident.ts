import { createId } from '@paralleldrive/cuid2'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import { base64ToBlob } from '../../tools/base64ToPng'
import type { IArrImages, IIncident } from '../../interfaces'

export const CreateIncident = async(data: IIncident, images?: Array<IArrImages>) => {
  try {
    const createFileId = createId()
    const formData = new FormData()
    const boundary = `--------------------------${Math.random().toString(36).substring(2)}`

    formData.set('Content-Type', `multipart/form-data; boundary=${boundary}`)

    const dataString = JSON.stringify(data)
    formData.append('data', dataString)

    if (images && images.length > 0) {
      images.forEach((img) => {
        const blobElement = base64ToBlob(img.base64)
        const file = new File([blobElement], `${createFileId}_${img.name}`, { type: 'image/png' })
        formData.append('files', file)
      })
    }

    const response = await fetch(`${connection}/incident/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
      },
      body: formData,
    })
    if (!response.ok) {
      const errorBOdy = await response.json()
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
