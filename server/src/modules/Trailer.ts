import { prismaClient } from '../prisma/client'
import type { ITrailer } from '../interfaces'

export const getAllInside = async(organizationId: string) => {
  const result = await prismaClient.trailer.findMany({
    where: { isInside: true, organizationId },
    include: { TrailerType: { include: { Question: true } } },
  })

  return result
}

export const create = async(data: ITrailer, organizationId: string) => {
  const searchTrailer = await prismaClient.trailer.findFirst({
    where: {
      organizationId,
      AND: [
        { plate: data.plate || undefined },
        { vin: data.vin || undefined },
        { number: data.number || undefined },
      ],
    },
  })

  if (searchTrailer) {
    const updateTrailer = await prismaClient.trailer.update({
      where: { id: searchTrailer.id },
      data: {
        seal: data.seal,
        locationId: data.locationId,
        isInside: data.isInside,
      },
    })
    return updateTrailer
  } else {
    const newTrailer = await prismaClient.trailer.create({
      data: {
        number: data.number,
        seal: data.seal,
        plate: data.plate,
        vin: data.vin,
        trailerTypeId: data.trailerTypeId,
        isInside: data.isInside,
        organizationId,
        companyId: data.companyId,
        locationId: data.locationId,
      },
    })

    return newTrailer
  }
}
