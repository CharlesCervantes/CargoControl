import { create as createPerson } from '../../../modules/Person'
import { create as createCompany } from '../../../modules/Company'
import { create as createVisitor } from '../../../modules/Visitor'
import type { Company, Person, Visitor } from '@prisma/client'
import type { IVisitor } from '../../../interfaces'

export const saveVisitor = async(visitorData: Array<IVisitor>, organizationId: string) => {
  const Visitors: Array<Visitor> = []

  if (visitorData && visitorData.length < 1) {
    return Visitors
  } else {
    // Usamos map para crear un array de promesas
    const promises = visitorData.map(async(visitor) => {
      let getCompany: Company
      let getPerson: Person

      if (visitor.Company)
        getCompany = await createCompany(visitor.Company, organizationId)
      else
        throw new Error('No se ha enviado información de la empresa')

      if (visitor.Person)
        getPerson = await createPerson(visitor.Person, organizationId)
      else
        throw new Error('No se ha enviado información de la persona')

      const newVisitor = await createVisitor(getPerson, getCompany, organizationId, visitor)
      Visitors.push(newVisitor)
    })

    // Usamos Promise.all para esperar a que todas las promesas se completen
    await Promise.all(promises)
    return Visitors
  }
}
