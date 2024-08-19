import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'
// import type { ColumnsForUnitRecordTable } from '../../../../../interfaces'

// actualizado
export const fetchUnitEntranceData = async() => {
  try {
    const response = await fetch(`${connection}/entrance/`, {
      headers: {
        ...getAuthorizationHeader(),
      },
    })
    // All data from database
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}
