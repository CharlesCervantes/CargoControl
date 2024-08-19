import { activeAndEditCompany, change, create, drop, readAll, readById, readByName, update } from '../../modules/Company'
// import { update } from '../../modules/Triler-type-questions'
// import { update as updateVehicle } from '../../modules/Vehicle-type-questions'
import type { ICompany } from '../../interfaces'
import type { Request, Response } from 'express'

export const createCompany = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { name, address, numberphone, email } = req.body
  const companyData: ICompany = {
    name,
    address,
    numberphone,
    email,
  }
  try {
    const searchCompany = await readByName(name, organizationId) // buscamos si el nombre de la compañia ya existe
    if (searchCompany) {
      if (searchCompany.status) {
        res.status(200).json({ ok: false, message: 'Ya existe una compañia con este nombre' })
      } else {
        if (!searchCompany.status) {
          const company = await activeAndEditCompany(searchCompany.id, companyData)
          res.status(200).json({ ok: true, message: 'Compañia Creada Exitosamente!', data: company })
        }
      }
    } else {
      if (!searchCompany) {
        const newCompany = await create(companyData, organizationId)
        res.status(200).json({ ok: true, message: 'Compañia creada exitosamente', data: newCompany })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateCompany = async(req: Request, res: Response) => {
  const { id } = req.params
  const { name, address, numberphone, email } = req.body
  const organizationId = res.locals.org.organizationId
  const companyData: ICompany = {
    name,
    address,
    numberphone,
    email,
  }
  try {
    const searchCompany = await readByName(name, organizationId)
    if (searchCompany) {
      if (searchCompany.status) {
        if (id === searchCompany.id) {
          const company = await update(companyData, searchCompany.id)
          res.status(200).json({ ok: true, message: 'Compañia actualizada exitosamente', data: company })
        } else {
          res.status(200).json({ ok: false, message: 'Ya Existe una Compañia con Este Nombre' })
        }
      } else {
        if (!searchCompany.status) {
          const company = await change(companyData, searchCompany.id, id)
          res.status(200).json({ ok: true, message: 'Compañia actualizada exitosamente', data: company })
        }
      }
    } else {
      if (!searchCompany) {
        const company = await update(companyData, id)
        res.status(200).json({ ok: true, message: 'Compañia actualizada exitosamente', data: company })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCompanies = async(req: Request, res: Response) => {
  const { pageSize, pageIndex } = req.params
  const organizationId = res.locals.org.organizationId
  const userId = res.locals.org.userId
  try {
    const companies = await readAll(organizationId, parseInt(pageSize), parseInt(pageIndex))
    console.log(userId)
    res.status(200).json({ ok: true, message: 'Compañias', data: companies })
  } catch (error) {
    res.status(400).json({ ok: false, message: `${error}` })
  }
}

export const deleteCompany = async(req: Request, res: Response) => {
  const { id } = req.params
  const organizationId = res.locals.org.organizationId

  try {
    const searchCompany = await readById(id, organizationId)
    if (!searchCompany)
      return res.status(400).json({ ok: false, message: 'La compañia no existe' })

    const company = await drop(id)
    res.status(200).json({ ok: true, message: 'Compañia eliminada', data: company })
  } catch (error) {
    res.status(400).json({ ok: false, message: `${error}` })
  }
}
