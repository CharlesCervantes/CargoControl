import { create, deleteVehicle, getAll, getbyId } from '../../modules/vehicle-type'
import type { Request, Response } from 'express'

export const getAllVehiclesTypes = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAll(organizationId)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const getVehicleTypeById = async(req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await getbyId(id)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const createVehicleType = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { name } = req.body
  try {
    const result = await create(name, organizationId)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const deleteVehicleType = async(req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await deleteVehicle(id)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}
