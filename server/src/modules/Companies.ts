
import { prismaClient } from '../prisma/client'
import type { ICompany } from '../interfaces'

export const create = async(data: ICompany, organizationId: string) => {
  const existingCompanyWithStatusFalse = await prismaClient.companies.findFirst({
    where: {
      name: data.name,
      status: false,
      organizationId,
    },
  })
  const existingCompanyWithStatusTrue = await prismaClient.companies.findFirst({
    where: {
      name: data.name,
      status: true,
      organizationId,
    },
  })

  if (existingCompanyWithStatusFalse) {
    const result = await prismaClient.companies.update({
      where: {
        id: existingCompanyWithStatusFalse.id,
      },
      data: {
        status: true,
        location: data.name,
      },
    })
    return result
  } else {
    if (existingCompanyWithStatusTrue) {
      return { statusCode: 400, message: 'ya existe el elemento que se quiere crear' }
    } else {
      const result = await prismaClient.companies.create({
        data: {
          name: data.name,
          organizationId,
          status: true,
        },
      })
      return result
    }
  }
}

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.companies.findMany({
    where: {
      status: true,
      organizationId,
    },
  })
  return result
}

export const edit = async(data: ICompany, organizationId: string) => {
  const searchCompany = await prismaClient.companies.findFirst({
    where: {
      name: data.name,
      organizationId,
    },
  })

  if (searchCompany && searchCompany.status === false) {
    // mostramos y actualizamos el oculto
    await prismaClient.companies.update({
      where: {
        id: searchCompany.id,
      },
      data: {
        status: true,
      },
    })
    // ocultamos el activo
    const result = await prismaClient.companies.update({
      where: {
        id: data.id,
      },
      data: {
        status: false,
      },
    })
    return result
  } else {
    if (searchCompany && searchCompany.status === true) {
      return { statusCode: 400, message: 'ya existe el elemento que se quiere crear' }
    } else if (!searchCompany) {
      // Aquí manejas el caso cuando no se encontró la ubicación
      const result = await prismaClient.companies.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
        },
      })
      return result
    }
  }
}

export const erase = async(data: ICompany) => {
  const result = await prismaClient.companies.update({
    where: {
      id: data.id,
    },
    data: {
      status: false,
    },
  })
  return result
}
