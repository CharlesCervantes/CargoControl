import { create, getAll, getAllInside, getAllOutside, getById, update } from '../../modules/Driver'
import { create as companyCreate } from '../../modules/Company'
import { create as personCreate } from '../../modules/Person'
import type { ICompany, IDriver, IPerson } from '../../interfaces'
import type { Request, Response } from 'express'

export const createDriver = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { companyName, name, lastname, curp, security_social_number, numberphone, email, license } = req.body

  try {
    const company: ICompany = { name: companyName, organizationId }
    const createCompany = await companyCreate(company, organizationId)

    const person: IPerson = { name, lastname, curp, security_social_number, numberphone, email, isInside: true, organizationId, license }
    const createPerson = await personCreate(person, organizationId)

    const driver: IDriver = { companyId: createCompany.id, personId: createPerson.id, organizationId }
    const result = await create(driver, organizationId)

    res.status(200).json({ ok: true, data: result, message: 'Driver created' })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const listDriver = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAll(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Drivers listed' })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const getDriverById = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await getById(id)
    res.status(200).json({ ok: true, data: result, message: 'Driver listed' })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const getDriversInside = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAllInside(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Drivers listed' })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const getDriversOutside = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAllOutside(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Drivers listed' })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const updateDriver = async(req: Request, res: Response) => {
  const { driver } = req.body
  try {
    const updateDriver: IDriver = driver
    const result = await update(updateDriver)
    res.status(200).json({ ok: true, data: result, message: 'Driver updated' })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}
