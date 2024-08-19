
import { prismaClient } from '../prisma/client'
import type { IExitUnits, ITrailer } from '../interfaces'

export const create = async(data: IExitUnits) => { // creacion de la entrada
  console.log('data:', data)

  const result = await prismaClient.exitUnits.create({
    data: {
      driverId: data.Driver?.id,
      vehicleId: data.Vehicle?.id,
      entranceUnitId: data.entranceUnitId,
      organizationId: data.organizationId,
      locationId: data.locationId,
      userId: data.userId,
    },
  })
  console.log('result:', result)

  // // Si Trailer no está definido, regresar un error o manejarlo adecuadamente.
  // if (!data.Trailer)
  //   throw new Error('Trailer data is not provided.')

  // // Asegurarse de que siempre trabajamos con un array
  // const trailerPromises = (data.Trailer || []).map(async(trailer: ITrailer) => {
  //   const searchTrailer = await prismaClient.trailer.findFirst({
  //     where: {
  //       organizationId,
  //       number: trailer.number,
  //     },
  //   })

  //   if (searchTrailer) {
  //     return { id: searchTrailer.id }
  //   } else {
  //     const newTrailer = await prismaClient.trailer.create({
  //       data: {
  //         number: trailer.number,
  //         seal: trailer.seal,
  //         plate: trailer.plate,
  //         vin: trailer.vin,
  //         trailerTypeId: trailer.trailerTypeId,
  //         companyId: trailer.companyId,
  //         isInside: true,
  //         organizationId,
  //       },
  //     })

  //     return { id: newTrailer.id }
  //   }
  // })

  // // Usamos Promise.all para asegurarnos de que todas las promesas se resuelvan
  // const trailerData = await Promise.all(trailerPromises)

  // // Asegurarse de que trailerData es del tipo correcto o manejar si no lo es.
  // if (!Array.isArray(trailerData) || trailerData.some(data => typeof data.id !== 'string'))
  //   throw new Error('Error processing trailer data.')

  // const result = await prismaClient.exitUnits.create({
  //   data: {
  //     driverId: data.driverId,
  //     entranceUnitId: data.entranceUnitId,
  //     vehicleId: data.vehicleId,
  //     Trailer: {
  //       connect: trailerData,
  //     },
  //   },
  // })

  // // Update Driver, Vehicle, and Trailer status
  // await prismaClient.driver.update({
  //   where: { id: data.driverId },
  //   data: { isInside: false },
  // })

  // await prismaClient.vehicle.update({
  //   where: { id: data.vehicleId },
  //   data: { isInside: false },
  // })

  // if (data.Trailer) {
  //   for (const trailer of data.Trailer) {
  //     await prismaClient.trailer.update({
  //       where: { vin: trailer.vin },
  //       data: { isInside: false },
  //     })
  //   }
  // }

  return result
}

export const list = async() => {
  const result = await prismaClient.exitUnits.findMany({
    include: {
      Driver: true,
      _count: true,
      EntranceUnits: {
        include: {
          _count: true,
          Driver: true,
          Vehicle: true,
          Trailer: true,
        },
      },
      Vehicle: true,
      Trailer: {
        include: {
          TrailerType: true,
        },
      },
    },
  })

  return result
}

export const TrailerExitConnection = async(trailer: ITrailer, idExitUnit: string) => {
  const query = await prismaClient.exitUnits.update({
    where: { id: idExitUnit },
    data: {
      Trailer: {
        connect: { id: trailer.id },
      },
    },
    include: {
      Trailer: true,
    },
  })

  return query
}
