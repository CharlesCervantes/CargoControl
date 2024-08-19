import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
// import type { ColumnsForUnitRecordTable } from '../../../../../interfaces'

// actualizado
export const getTrailerById = async(id: string) => {
  try {
    const response = await fetch(`${connection}/trailer-types/${id}`, {
      headers: {
        ...getAuthorizationHeader(),
      },
    })
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
