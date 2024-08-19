import { prismaClient } from '../prisma/client'
import type { IOrganization } from '../interfaces'

// Funciones
export const searchOrganizationByName = async(name: string) => {
  const result = await prismaClient.organization.findFirst({
    where: { name },
  })
  return result
}

export const create = async(data: IOrganization) => {
  const result = await prismaClient.organization.create({
    data: {
      name: data.name,
    },
  })

  return result
}

export const getAll = async() => {
  const result = await prismaClient.organization.findMany({
    include: {
      User: true,
      Locations: true,
    },
  })

  return result
}
