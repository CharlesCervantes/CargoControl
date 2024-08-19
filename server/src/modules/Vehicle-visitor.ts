import { prismaClient } from '../prisma/client'
import type { IVehicleVisitor } from '../interfaces'

export const create = async(data: IVehicleVisitor, organizationId: string) => {
  const existVehicle = await prismaClient.vehicleVisitor.findFirst({
    where: {
      organizationId,
      AND: [
        { plates: data.plates },
      ],
    },
  })

  if (existVehicle) {
    const vehicle = await prismaClient.vehicleVisitor.update({
      where: { id: existVehicle.id },
      data: {
        isInside: true,
      },
    })
    return vehicle
  } else {
    const newVehicle = await prismaClient.vehicleVisitor.create({
      data: {
        plates: data.plates,
        color: data.color,
        brand: data.brand,
        model: data.model,
        isInside: data.isInside,
        organizationId,
      },
    })

    return newVehicle
  }
}

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.vehicleVisitor.findMany({
    where: { organizationId },
  })
  return result
}

export const getAllInside = async(organizationId: string) => {
  const result = await prismaClient.vehicleVisitor.findMany({
    where: { isInside: true, organizationId },
  })

  return result
}

export const updateStatus = async(id: string, status: boolean) => {
  const result = await prismaClient.vehicleVisitor.update({
    where: { id },
    data: { isInside: status },
  })

  return result
}
