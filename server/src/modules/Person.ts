import { prismaClient } from '../prisma/client'
import type { IPerson } from '../interfaces'

export const create = async(person: IPerson, organizationId: string) => {
  const existingPerson = await prismaClient.person.findFirst({
    where: {
      organizationId,
      AND: [
        { name: person.name },
        { lastname: person.lastname || undefined },
        { curp: person.curp || undefined },
      ],
    },
    include: {
      File: true,
    },
  })
  console.log('myExistingPerson')
  console.log(existingPerson)
  if (existingPerson) {
    const updatePerson = await prismaClient.person.update({
      where: { id: existingPerson.id },
      data: { isInside: true },
      include: {
        File: true,
      },
    })
    return updatePerson
  } else {
    const newPerson = await prismaClient.person.create({
      data: {
        name: person.name,
        lastname: person.lastname,
        curp: person.curp,
        organizationId,
        email: person.email,
        isInside: true,
        license: person.license, // Se agrego la creacion de licencia
        numberphone: person.numberphone,
        security_social_number: person.security_social_number,
        identificationFiles: person.identificationFiles,
      },
      include: {
        File: true,
      },
    })
    return newPerson
  }
}

export const getByCurp = async(curp: string, organizationId: string) => {
  const person = await prismaClient.person.findFirst({
    where: {
      curp,
      organizationId,
    },
  })

  return person
}

export const getAllinside = async(organizationId: string) => {
  const result = await prismaClient.visitor.findMany({
    where: {
      organizationId,
      isExit: false,
    },
    include: {
      VisitorType: true,
      Company: true,
      Person: true,
      VisitorEntrances: {
        include: {
          VehicleVisitor: true,
        },
        orderBy: {
          dateTime: 'desc', // Ordena por dateTime de manera descendente
        },
      },
    },
  })

  return result
}

export const updateStatus = async(id: string, isInside: boolean) => {
  const person = await prismaClient.person.update({
    where: {
      id,
    },
    data: {
      isInside,
    },
  })

  return person
}

export const getPersonById = async(id: string) => {
  const request = await prismaClient.person.findUnique({
    where: { id },
  })

  return request
}
