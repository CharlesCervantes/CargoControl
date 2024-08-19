import { prismaClient } from '../prisma/client'
import type { IResponse } from '../interfaces'

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.response.findMany({
    where: { organizationId },
    include: {
      Question: true,
    },
  })
  return result
}

export const create = async(data: IResponse) => {
  const response = await prismaClient.response.create({
    data: {
      checklistId: data.checklistId,
      questionId: data.questionId,
      response: data.response,
      identification: data.identification,
      organizationId: data.organizationId,
    },
  })

  return response
}
