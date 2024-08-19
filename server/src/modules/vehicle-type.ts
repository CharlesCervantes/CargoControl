import { prismaClient } from '../prisma/client'

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.vehicleType.findMany({
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
  const existingVehicleWithStatusTrue = await prismaClient.vehicleType.findFirst({
    where: {
      name,
      status: true,
      organizationId,
    },
  })

  const existingVehicleWithStatusFalse = await prismaClient.vehicleType.findFirst({
    where: {
      name,
      status: false,
      organizationId,
    },
  })

  if (existingVehicleWithStatusFalse) {
    const result = await prismaClient.vehicleType.update({
      where: {
        id: existingVehicleWithStatusFalse.id,
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
    if (existingVehicleWithStatusTrue) {
      return { statusCode: 400, message: 'ya existe el elemento que se quiere crear' }
    } else {
      const result = await prismaClient.vehicleType.create({
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

export const getbyId = async(id: string) => {
  const result = await prismaClient.vehicleType.findUnique({
    where: { id },
    include: { Question: true },
  })
  return result
}

export const deleteVehicle = async(id: string) => {
  const result = await prismaClient.vehicleType.update({
    where: {
      id,
    },
    data: {
      status: false,
    },
  })

  return result
}
