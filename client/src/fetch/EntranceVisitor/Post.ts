// import { base64ToBlob } from '../../tools/base64ToPng'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import { base64ToBlob } from '../../tools/base64ToPng'
import type { IArrImages, IVisitorEntrance } from '../../interfaces'

export const CreateVisitorEntrance = async(data: IVisitorEntrance, images?: Array<IArrImages>) => {
  try {
    const formData = new FormData()
    const boundary = `-------------------------${Math.random().toString(36).substring(2)}`

    // Configura el encabezado Content-Type con el límite correcto
    formData.set('Content-Type', `multipart/form-data; boundary=${boundary}`)

    // Agrega los datos JSON al formulario
    const dataString = JSON.stringify(data)
    formData.append('data', dataString)

    if (images && images.length > 0) {
      images.forEach((img) => {
        const blobElement = base64ToBlob(img.base64)
        const file = new File([blobElement], img.name, { type: 'image/png' }) // Corregí 'image/pmg' a 'image/png'

        // Agrega cada archivo al formulario
        formData.append('files', file)
      })
    }

    const response = await fetch(`${connection}/visitor-entrance/`, {
      method: 'POST',
      body: formData,
      headers: {
        ...getAuthorizationHeader(),
      },
    })

    if (!response.ok) {
      const errorBOdy = await response.json()
      const errorMessage = `Error en la solicitud: ${response.status}: ${errorBOdy.message}`
      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error: unknown) {
    if (error instanceof Error) throw error
  }
}
