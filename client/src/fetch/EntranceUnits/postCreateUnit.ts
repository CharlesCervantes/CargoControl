import { base64ToBlob } from '../../tools/base64ToPng'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IArrImages, IEntranceUnits } from '../../interfaces'

export const postCreateUnitEntrace = async(data: IEntranceUnits, images?: Array<IArrImages>) => {
  try {
    const formData = new FormData()
    const boundary = `-------------------------${Math.random().toString(36).substring(2)}`

    // Configura el encabezado Content-Type con el límite correcto
    formData.set('Content-Type', `multipart/form-data; boundary=${boundary}`)

    const json = JSON.stringify(data)
    formData.append('data', json)

    if (images && images.length > 0) {
      images.forEach((img) => {
        if (img.base64.length > 150) {
          const blobElement = base64ToBlob(img.base64)
          const file = new File([blobElement], img.name, { type: 'image/png' })
          formData.append('files', file)
        }
      })
    }
    const request = await fetch(`${connection}/entrance-units/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
      },
      body: formData,
    })

    if (!request.ok) {
      const errorBody = await request.json()
      const errorMessage = `Error en la solicitud: ${errorBody.message} ${request.statusText}`
      throw new Error(errorMessage)
    }

    const response = await request.json()
    return response
  } catch (error) {
    if (error instanceof Error)
      throw error
  }
}
