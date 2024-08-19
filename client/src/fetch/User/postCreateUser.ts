import { toast } from 'react-hot-toast'

import { base64ToBlob } from '../../tools/base64ToPng'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
import type { IArrImages, IUser } from '../../interfaces'

// actualizado
export const createUser = async(data: IUser) => {
  console.log('1.1Data:', data)
  try {
    // const formData = new FormData()
    // const json = JSON.stringify(data)
    // formData.append('data', json)

    // const blobElement = base64ToBlob(image.base64)
    // const file = new File([blobElement], image.name, { type: 'image/png' })
    // formData.append('images', file)

    const response = await fetch(`${connection}/user/`, {
      method: 'POST',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `${errorBody.msj}`
      toast.error(errorMessage, {
        duration: 3000,
        position: 'bottom-right',
      })
      throw new Error(errorMessage)
    } else {
      toast.success('Usuario Creado Exitosamente!', {
        duration: 3000,
        position: 'bottom-right',
      })
    }
    const result = await response.json()

    return result
  } catch (error: unknown) {
    if (error instanceof Error)
      throw error
  }
}
