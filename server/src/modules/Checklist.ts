import { prismaClient } from '../prisma/client'
import type { IChecklist } from '~/interfaces'
// agregar a todo el rganizationId

export const selectChecklistByEntranceUnitIdAndVehicle = async(entranceId: string, vehicleId: string, organizationId: string) => {
  const result = await prismaClient.checklist.findFirst({
    where: {
      entraceUnitId: entranceId,
      vehicleId,
      organizationId,
    },
    include: {
      Responses: true,
    },
  })

  return result
}

export const selectChecklistByEntranceUnitIdAndTrailerId = async(entranceId: string, trailerId: string, organizationId: string) => {
  const result = await prismaClient.checklist.findFirst({
    where: {
      entraceUnitId: entranceId,
      trailerId,
      organizationId,
    },
    include: {
      Responses: true,
    },
  })

  return result
}

export const getCheklistByentranceId = async(entranceId: string) => {
  const result = await prismaClient.checklist.findMany({
    where: { entraceUnitId: entranceId },
    include: {
      Responses: true,
    },
  })

  return result
}

export const createChecklist = async(newCheklist: IChecklist) => {
  const query = await prismaClient.checklist.create({
    data: {
      entraceUnitId: newCheklist.entraceUnitId,
      exitUnitId: newCheklist.exitUnitId,
      vehicleId: newCheklist.vehicleId,
      trailerId: newCheklist.trailerId,
      isSign: newCheklist.isSigned,
      identification: newCheklist.identification,
      organizationId: newCheklist.organizationId,
    },
  })
  return query
}
