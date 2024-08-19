import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
// import type { ColumnsForUnitRecordTable } from '../../../../../interfaces'

export const getVehicleById = async(id: string) => {
  try {
    const response = await fetch(`${connection}/vehicle-types/${id}`, {
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
