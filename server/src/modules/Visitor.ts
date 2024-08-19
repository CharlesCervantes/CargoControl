/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaClient } from '../prisma/client'
import { updateStatus as updateStatusPerson } from './Person'
import type { Company, Person } from '@prisma/client'
import type { ICompany, IPerson, IVisitor } from '../interfaces'

export const create = async(person: Person, company: Company, organizationId: string, visitor: IVisitor) => {
  const newVisitor = await prismaClient.visitor.create({
    data: {
      badge: visitor.badge,
      companyId: company.id,
      personId: person.id,
      organizationId,
      subject: visitor.subject,
      visitorTypeId: visitor.visitorTypeId,
    },
    include: {
      Company: true,
      Person: true,
      VisitorType: true,
      Organization: true,
    },
  })

  await updateStatusPerson(person.id, true)

  return newVisitor
}

export const updateStatus = async(visitorID: string, isExit: boolean) => {
  const updated = await prismaClient.visitor.update({
    where: { id: visitorID },
    data: { isExit },
  })

  return updated
}
