import { prismaClient } from '../prisma/client'

export const readResponseByIdentification = async(identification: string, organizationId: string) => {
  const request = await prismaClient.response.findFirst({
    where: { identification, organizationId },
  })

  return request
}

export const getAllResposesByChecklistId = async(checklistId: string, organizationId: string) => {
  const request = await prismaClient.response.findMany({
    where: { checklistId, organizationId },
  })
  return request
}
