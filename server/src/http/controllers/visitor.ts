import { create } from '../../modules/Visitor'
import { create as createPerson, getAllinside } from '../../modules/Person'
import { create as createCompany } from '../../modules/Company'
import type { IPerson, IVisitor } from '../../interfaces'
import type { Request, Response } from 'express'

export const createVisitor = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { person, visitor, company } = req.body

  try {
    const personData: IPerson = person
    const visitorData: IVisitor = visitor
    const companyData = company

    const savePerson = await createPerson(personData, organizationId)
    const saveCompany = await createCompany(companyData, organizationId)

    const newVisitor = await create(savePerson, saveCompany, organizationId, visitorData)
    res.status(200).json({ ok: true, messaje: 'Visitante creado', data: newVisitor })
  } catch (error) {
    res.status(400).json({ ok: false, messaje: `Error al crear el visitante: ${error}` })
  }
}

export const getAllVisitorInside = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const allInside = await getAllinside(organizationId)
    res.status(200).json({ ok: true, messaje: 'Visitantes dentro', data: allInside })
  } catch (error) {
    res.status(400).json({ ok: false, messaje: `Error al obtener los visitantes: ${error}` })
  }
}
