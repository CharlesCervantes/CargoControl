import { prismaClient } from '../prisma/client'
import type { Visitor } from '@prisma/client'

export const create = async(locationId: string, organizationId: string, visitors: Array<Visitor>, vehicleVisitorId?: string) => {
  const newVisitorEntrance = await prismaClient.visitorEntrance.create({
    data: {
      locationId,
      organizationId,
      vehicleVisitorId: vehicleVisitorId || undefined,
      Visitors: {
        connect: visitors.map((visitor) => {
          return { id: visitor.id }
        }),
      },
    },
    include: {
      Visitors: {
        include: {
          Person: true,
        },
      },
      VehicleVisitor: true,
      Location: true,
    },
  })

  return newVisitorEntrance
}

export const getAll = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const result = await prismaClient.visitorEntrance.findMany({
    take: pageSize,
    skip: skipAmout,
    where: { organizationId },
    include: {
      VehicleVisitor: true,
      Visitors: {
        include: {
          Files: true,
          Incident: true,
          VisitorType: true,
          Person: true,
          Company: true,
        },
      },
      VisitorExit: {
        include: {
          VehicleVisitor: true,
          Visitors: {
            include: {
              Files: true,
              Incident: true,
              VisitorType: true,
              Person: true,
            },
          },
        },
      },
    },
  })
  const count = await prismaClient.visitorEntrance.count()

  return { result, count }
}

export const entraceWithVisitorsAndVehicle = async(organizationId: string) => {
  const entraceVisitor = await prismaClient.visitorEntrance.findMany({
    where: {
      organizationId,
      Visitors: {
        some: {
          Person: {
            isInside: true,
          },
        },
      },
    },
    include: {
      Visitors: {
        include: {
          VisitorType: true,
        },
      },
      VehicleVisitor: true,
    },
  })

  // const result: Array<Array<{ visitor: IVisitor, vehicle: IVehicleVisitor | null }>>
  //   = entraceVisitor.map((entrance) => {
  //     return entrance.Visitors.map((visitor) => {
  //       return {
  //         visitor,
  //         vehicle: entrance.VehicleVisitor,
  //       }
  //     })
  //   })

  // return ([] as Array<{ visitor: IVisitor, vehicle: IVehicleVisitor | null }>).concat(...result)
  return entraceVisitor
}

export const getLastVisitorEntranceByVisiotrId = async(visitorId: string, organizationId: string) => {
  const result = await prismaClient.visitorEntrance.findFirst({
    where: {
      organizationId,
      Visitors: {
        some: {
          id: visitorId,
        },
      },
    },
    orderBy: {
      dateTime: 'desc',
    },
    include: {
      Visitors: {
        include: {
          VisitorType: true,
        },
      },
      VehicleVisitor: true,
    },
  })

  return result
}
