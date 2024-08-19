import { create, getAll } from '../../modules/QrVisitor'
import type { IQrVisitor } from '../../interfaces'
import type { Request, Response } from 'express'

export const createPreEntranceVisitor = async(req: Request, res: Response) => {
//   try {
//     const json: IQrVisitor = JSON.parse(req.body.data)

  //     const data: IQrVisitor = {
  //       Visitor: json.Visitor,
  //       vehicleId: json.vehicleId,
  //       start: json.start,
  //       end: json.end,
  //       numVisitors: json.numVisitors,
  //       email: json.email,
  //       subject: json.subject,
  //       company: json.company,
  //       badge: json.badge,
  //     }

  //     console.log(data)

  //     const preEntrance = await create(data)

  //     res.status(200).json(preEntrance)
  //   } catch (error) {
  //     res.status(400).json(error)
  //   }
}

export const getAllQrVisitor = async(req: Request, res: Response) => {
//   try {
//     const result = await getAll()
//     res.status(200).json(result || [])
//   } catch (error) {
//     res.status(400).json(error)
//   }
}
