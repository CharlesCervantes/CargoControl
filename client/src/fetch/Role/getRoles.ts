// import { useNavigate } from 'react-router-dom'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export async function getRoles() {
  // const navigate = useNavigate()
  try {
    const response = await fetch(`${connection}/role/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
    })
    console.log('response:', response)
    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `Error en la solicitud: ${response.status} ${response.statusText} ${errorBody.msj}`
      throw new Error(errorMessage)
    }
    const data = await response.json()
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getVisitorsInside:', error.message)
    throw error
  }
}
