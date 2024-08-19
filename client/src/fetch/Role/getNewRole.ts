import { connection } from '../../env'

// actualizado
export async function getRoles() {
  try {
    const response = await fetch(`${connection}/role/list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
