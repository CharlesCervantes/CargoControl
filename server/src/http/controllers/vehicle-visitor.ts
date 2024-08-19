import { create, getAll, getAllInside } from '../../modules/Vehicle-visitor'
import type { IVehicleVisitor } from '../../interfaces'
import type { Request, Response } from 'express'

export const createVehicleVisitor = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { plates, brand, model, color } = req.body

  try {
    const vehicleData: IVehicleVisitor = {
      plates,
      brand,
      model,
      color,
      isInside: false,
      organizationId,
    }

    const newVehicle = await create(vehicleData, organizationId)
    res.status(200).json({ ok: true, messaje: 'Vehiculo creado', data: newVehicle })
  } catch (error) {
    res.status(400).json({ ok: false, messaje: 'Error al crear el vehiculo', error })
  }
}

export const getAllVisitorVehicle = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAll(organizationId)
    res.status(200).json({ ok: true, messaje: 'Vehiculos obtenidos', data: result })
  } catch (error) {
    res.status(400).json({ ok: false, messaje: 'Error al obtener los vehiculos', error })
  }
}

export const getAllVehicleVisitorInside = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAllInside(organizationId)
    res.status(200).json({ ok: true, messaje: 'Vehiculos obtenidos', data: result })
  } catch (error) {
    res.status(400).json({ ok: false, messaje: 'Error al obtener los vehiculos', error })
  }
}
