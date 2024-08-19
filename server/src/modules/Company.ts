import { prismaClient } from '../prisma/client'
import type { ICompany } from '../interfaces'

export const create = async(data: ICompany, organizationId: string) => {
  const existingCompanyWithStatusFalse = await prismaClient.company.findFirst({
    where: {
      organizationId,
      name: data.name,
      status: false,
    },
  })
  const existingCompanyWithStatusTrue = await prismaClient.company.findFirst({
    where: {
      name: data.name,
      status: true,
      organizationId,
    },
  })
  if (existingCompanyWithStatusFalse) {
    const result = await prismaClient.company.update({
      where: {
        id: existingCompanyWithStatusFalse.id,
      },
      data: {
        status: true,
        address: data.address,
      },
    })
    return result
  } else {
    if (existingCompanyWithStatusTrue) {
      return existingCompanyWithStatusTrue
    } else {
      const result = await prismaClient.company.create({
        data: {
          name: data.name,
          address: data.address,
          status: true,
          organizationId,
        },
      })
      return result
    }
  }
}

export const readByName = async(name: string, organizationId: string) => {
  const company = await prismaClient.company.findFirst({
    where: {
      name,
      organizationId,
    },
  })

  return company
}

export const readById = async(id: string, organizationId: string) => {
  const company = await prismaClient.company.findUnique({
    where: {
      id,
      organizationId,
    },
  })

  return company
}

export const readAll = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const result = await prismaClient.company.findMany({
    take: pageSize,
    skip: skipAmout,
    where: {
      organizationId,
      status: true,
    },
  })

  const count = await prismaClient.company.count(
    {
      where: {
        status: true,
      },
    },

  )

  return { result, count }
}

export const update = async(data: ICompany, companyFoundId: string) => {
  const company = await prismaClient.company.update({
    where: {
      id: companyFoundId,
    },
    data: {
      name: data.name,
      address: data.address,
      numberphone: data.numberphone,
      email: data.numberphone,
    },
  })
  return company
}

export const change = async(data: ICompany, foundCompanyId: string, companyToEditId: string) => {
  await prismaClient.company.update({
    where: {
      id: foundCompanyId,
    },
    data: {
      name: data.name,
      address: data.address,
      numberphone: data.numberphone,
      email: data.numberphone,
      status: true, // la que se econtro se activara
    },
  })

  await prismaClient.company.update({
    where: {
      id: companyToEditId,
    },
    data: {
      status: false,
    },
  })
}

export const activeAndEditCompany = async(id: string, newData: ICompany) => {
  await prismaClient.company.update({
    where: {
      id,
    },
    data: {
      name: newData.name,
      address: newData.address,
      numberphone: newData.numberphone,
      email: newData.email,
      status: true,
    },
  })
}

export const drop = async(id: string) => {
  const company = await prismaClient.company.update({
    where: {
      id,
    },
    data: {
      status: false,
    },
  })

  return company
}
