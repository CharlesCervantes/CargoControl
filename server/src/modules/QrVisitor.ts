/* eslint-disable @typescript-eslint/no-unused-vars */
import { createId } from '@paralleldrive/cuid2'
import { prismaClient } from '../prisma/client'
import type { IQrVisitor, IVisitor } from '../interfaces'

export const create = async(data: IQrVisitor) => {
  // const visitorsConnect = data.Visitor?.map((v: IVisitor) => ({
  //   where: { curp: v.curp },
  //   create: {
  //     name: v.name,
  //     subject: v.subject,
  //     badge: v.badge,
  //     company: v.company,
  //     curp: v.curp,
  //     identification_url: v.identification_url,
  //     picture_url: v.picture_url,
  //     visitorTypeId: v.visitorTypeId,
  //     identification: v.identification,
  //   },
  // }))

  // const vehicleConnect = data.vehicle
  //   ? {
  //       connectOrCreate: {
  //         where: { plates: data.vehicle.plates },
  //         create: {
  //           plates: data.vehicle.plates,
  //           brand: data.vehicle.brand,
  //           model: data.vehicle.model,
  //           color: data.vehicle.color,
  //         },
  //       },
  //     }
  //   : undefined

  // const result = await prismaClient.qrVisitor.create({
  //   data: {
  //     id: createId(),
  //     dateTime: new Date(),
  //     dateTime_updated_at: new Date(),
  //     start: data.start,
  //     end: data.end,
  //     numVisitors: data.numVisitors,
  //     Visitor: { connectOrCreate: visitorsConnect },
  //     email: data.email,
  //     subject: data.subject,
  //     company: data.company,
  //     badge: data.badge,
  //     vehicleId: vehicleConnect ? vehicleConnect.connectOrCreate.create.plates : null,
  //   },
  // })

  // return result
}

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.qrVisitor.findMany({
    where: { organizationId },
  })
  return result
}
