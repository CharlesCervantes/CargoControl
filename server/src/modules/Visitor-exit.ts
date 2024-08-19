/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaClient } from '../prisma/client'
import type { IIdArray, IVisitorExit } from '../interfaces'

export const create = async(data: IVisitorExit, organizationId: string) => {
  // console.log('')
  // console.log('---- PARAMATRO DATA DE CREATE VISITOR EXIT: -------')
  // console.log(data)

  const result = await prismaClient.visitorExit.create({
    data: {
      idEntrance: data.idEntrance,
      idVehicleVisitor: data.idVehicleVisitor,
      locationId: data.locationId,
      organizationId,
      Visitors: {
        connect: data.Visitors.map(visitor => ({ id: visitor.id })),
      },
    },
    include: {
      Visitors: {
        include: {
          Person: true,
        },
      },
      VehicleVisitor: true,
    },
  })

  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  // console.log('entrada Guardada:')
  // console.log(result)
  return result
}

export const list = async(organizationId: string) => {
  const result = await prismaClient.visitorExit.findMany({
    where: { organizationId },
  })

  return result
}
