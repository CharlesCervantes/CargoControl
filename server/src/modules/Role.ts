import { prismaClient } from '../prisma/client'
import type { IRole } from '../interfaces'

export const createRole = async(data: IRole) => {
  const result = await prismaClient.role.create({
    data: {
      name: data.name,
    },
  })

  return result
}

export const getRoleByName = async(name: string) => {
  const result = await prismaClient.role.findFirst({
    where: { name },
  })

  return result
}

export const getRoles = async() => {
  const result = await prismaClient.role.findMany()
  return result
}

export const getRoleById = async(data: string) => {
  const result = await prismaClient.role.findFirst({
    where: { id: data },
  })
  return result
}

export const saveManyRoles = async(roles: Array<IRole>) => {
  const result = await prismaClient.role.createMany({
    data: roles,
  })

  return result
}
