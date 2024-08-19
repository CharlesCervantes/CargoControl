// import { useNavigate } from 'react-router-dom'
import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

// actualizado
export async function getRoleById(id: string) {
  // const navigate = useNavigate()
  try {
    const response = await fetch(`${connection}/role/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
    })

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

export async function getRoles() {
  try {
    const request = await fetch(`${connection}/role/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
    })

    if (!request.ok) {
      const errorBody = await request.json()
      const errorMessage = `Error en la solicitud: ${request.status} ${request.statusText} ${errorBody.msj}`
      throw new Error(errorMessage)
    }
    const data = await request.json()
    return data
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error en getRoles:', error.message)
    throw error
  }
}
