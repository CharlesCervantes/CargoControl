import { create, getAll, getAllInside } from '../../modules/Vehicle'
import { create as companyCreate } from '../../modules/Company'
import type { ICompany, IVehicle } from '../../interfaces'
import type { Request, Response } from 'express'

export const createVehicle = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { plate, unitNumber, vehicleTypeId, vin, companyName } = req.body

  try {
    const companyData: ICompany = {
      name: companyName,
      organizationId,
    }
    const company = await companyCreate(companyData, organizationId)
    const vehicleData: IVehicle = {
      plate,
      unitNumber,
      vehicleTypeId,
      vin,
      companyId: company.id,
      organizationId,
      isInside: true,
    }

    const result = await create(vehicleData, organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Vehicle created' })
  } catch (error) {
    res.status(400).json({ ok: false, error, message: 'Vehicle not created' })
  }
}

export const getAllVehiclesInside = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAllInside(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Vehicles inside' })
  } catch (error) {
    res.status(400).json({ ok: false, error, message: `Vehicles not found ${error}` })
  }
}

export const getAllVehicles = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAll(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Vehicles' })
  } catch (error) {
    res.status(400).json({ ok: false, error, message: `Vehicles not found ${error}` })
  }
}
