import { prismaClient } from '../prisma/client'
// import type { IVehicleTypes } from '../interfaces'

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.trailerType.findMany({
    where: {
      status: true,
      organizationId,
    },
    include: {
      Question: true,
    },
  })
  return result
}

export const create = async(name: string, organizationId: string) => {
  // in this case send error message, the trailer is already active
  const existingTrailerWithStatusTrue = await prismaClient.trailerType.findFirst({
    where: {
      name,
      status: true,
      organizationId,
    },
  })

  // in this case active the trailer
  const existingTrailerWithStatusFalse = await prismaClient.trailerType.findFirst({
    where: {
      name,
      status: false,
      organizationId,
    },
  })

  if (existingTrailerWithStatusFalse) {
    const result = await prismaClient.trailerType.update({
      where: {
        id: existingTrailerWithStatusFalse.id,
      },
      data: {
        status: true,
      },
      include: {
        Question: true,
      },
    })
    return result
  } else {
    if (existingTrailerWithStatusTrue) {
      return { statusCode: 400, message: 'ya existe el elemento que se quiere crear' }
    } else {
      const result = await prismaClient.trailerType.create({
        data: {
          name,
          status: true,
          organizationId,
        },
        include: {
          Question: true,
        },
      })
      return result
    }
  }
}

export const getById = async(id: string) => {
  const result = await prismaClient.trailerType.findFirst({
    where: {
      id,
    },
    include: { Question: true },
  })
  return result
}

export const deleteTrailer = async(id: string) => {
  const result = await prismaClient.trailerType.update({
    where: {
      id,
    },
    data: {
      status: false,
    },
  })

  return result
}
