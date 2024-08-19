import { connection } from '../../env'
import { getAuthorizationHeader } from '../Token'

export const postQuestionByType = async(type: string, data: any) => {
  try {
    const response = await fetch(`${connection}/question/${type}-types`, {
      method: 'PATCH',
      headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorBody = await response.json()
      const errorMessage = `Error al crear la pregunta: ${errorBody.message}`
      throw new Error(errorMessage)
    }

    const newQuestion = await response.json()
    return newQuestion
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error al guardar la pregunta:', error.message)
    throw error
  }
}
