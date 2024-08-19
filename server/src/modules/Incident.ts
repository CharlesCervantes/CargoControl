
import { prismaClient } from '../prisma/client'
import type { IIncident } from '../interfaces'

export const create = async(data: IIncident, organizationId: string) => {
  const result = await prismaClient.incident.create({
    data: {
      locationId: data.locationId,
      organizationId,
      report: data.report,
      subject: data.subject,
      Driver: {
        connect: data.Driver?.map(driver => ({ id: driver.id })),
      },
      Trailer: {
        connect: data.Trailer?.map(trailer => ({ id: trailer.id })),
      },
      Vehicle: {
        connect: data.Vehicle?.map(vehicle => ({ id: vehicle.id })),
      },
      Visitor: {
        connect: data.Visitor?.map(visitor => ({ id: visitor.id })),
      },
      VehicleVisitor: {
        connect: data.VehicleVisitor?.map(vehicleVisitor => ({ id: vehicleVisitor.id })),
      },
    },
  })

  return result
}

export const getIncidents = async(organizationId: string) => {
  const result = await prismaClient.incident.findMany({
    where: {
      organizationId,
    },
  })
  return result
}

export const getAll = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const result = await prismaClient.incident.findMany({
    take: pageSize,
    skip: skipAmout,
    where: { organizationId },
    include: {
      Driver: true,
      Trailer: true,
      Vehicle: true,
      Visitor: true,
      VehicleVisitor: true,
    },
  })
  const count = await prismaClient.incident.count()

  return { result, count }
}
