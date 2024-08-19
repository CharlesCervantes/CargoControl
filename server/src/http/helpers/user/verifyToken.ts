import { prismaClient } from '../../../prisma/client'

export const verifyToken = async(userId: string, token: string) => {
  try {
    const result = await prismaClient.user.findUnique({
      where: { id: userId },
    })

    if (result?.token) {
      if (result.token === token)
        return true
      else
        return false
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}
