/* eslint-disable @typescript-eslint/no-unused-vars */
import { create, list } from '../../modules/Visitor-exit'
import { getLastVisitorEntranceByVisiotrId } from '../../modules/Visitor-entrance'
import { getById } from '../../modules/Locations'
import { UpdateVisitorStatusHelper } from '../helpers/ExitVisitor/UpdateVisitorStatus'
import { updateVehicleVisitorStatusHelper } from '../helpers/ExitVisitor/UpdateVehicleVisitor'
import type { IVisitorExit } from '../../interfaces'
import type { Request, Response } from 'express'

export const createExitVisitor = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const userId = res.locals.org.userId

  const { VehicleVisitor, Visitors, locationId } = req.body
  try {
    const findLocation = await getById(locationId)

    if (findLocation) {
      const newEntrance: IVisitorExit = {
        organizationId,
        VehicleVisitor,
        Visitors,
        locationId: findLocation.id,
      }

      const visitorkey = newEntrance.Visitors[0]
      const entraceId = await getLastVisitorEntranceByVisiotrId(visitorkey.id || '', organizationId)

      if (entraceId) {
        newEntrance.idEntrance = entraceId.id
        newEntrance.idVehicleVisitor = newEntrance.VehicleVisitor?.id

        const result = await create(newEntrance, organizationId)

        await UpdateVisitorStatusHelper(result.Visitors)

        if (result.idVehicleVisitor)
          await updateVehicleVisitorStatusHelper(result.idVehicleVisitor)

        res.status(200).json({ ok: true, message: 'Entrada creada correctamente', data: result })
      }
    } else {
      res.status(400).json({ ok: false, message: 'Localizacion no existe' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ ok: false, message: 'Error al crear el registro' })
  }
}

export const listExitVisitor = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const userId = res.locals.org.userId
  try {
    const result = await list(organizationId)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}
