import { prismaClient } from '../prisma/client'
import type { IVehicle } from '~/interfaces'

export const create = async(data: IVehicle, organizationId: string) => {
  console.log('Data a guardar en el vehiculo:', data)
  const searchVehicle = await prismaClient.vehicle.findFirst({
    where: {
      organizationId,
      AND: [
        { unitNumber: data.unitNumber },
        { plate: data.plate || undefined },
        { vin: data.vin || undefined },
      ],
    },
  })

  if (searchVehicle) {
    const updateVehicle = await prismaClient.vehicle.update({
      where: { id: searchVehicle.id },
      data: {
        isInside: data.isInside,
        locationId: data.locationId,
        seal: data.seal,
      },
    })
    return updateVehicle
  } else {
    const newVehicle = await prismaClient.vehicle.create({
      data: {
        plate: data.plate,
        companyId: data.companyId,
        organizationId,
        vehicleTypeId: data.vehicleTypeId,
        isInside: true,
        locationId: data.locationId,
        seal: data.seal,
        vin: data.vin,
        unitNumber: data.unitNumber,
      },
      include: {
        Company: true,
      },
    })

    return newVehicle
  }
}

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.vehicle.findMany({
    include: { VehicleType: true },
    where: { organizationId },
  })
  return result
}

export const getAllInside = async(organizationId: string) => {
  const result = await prismaClient.vehicle.findMany({
    where: { isInside: true, organizationId },
    include: {
      VehicleType: {
        include: {
          Question: true,
        },
      },
      Company: true,
    },
  })

  return result
}
