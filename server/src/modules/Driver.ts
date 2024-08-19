import { prismaClient } from '../prisma/client'
import type { IDriver } from '../interfaces'

export const create = async(data: IDriver, organizationId: string) => {
  const existDriver = await prismaClient.driver.findFirst({
    where: {
      personId: data.personId,
      organizationId,
    },
  })

  if (existDriver) {
    const updateDriver = await prismaClient.driver.update({
      where: { id: existDriver.id },
      data: {
        Person: {
          update: {
            isInside: true,
          },
        },
      },
      include: {
        Person: {
          include: {
            File: true,
          },
        },
      },
    })
    console.log('myUpdateDriver')
    console.log(updateDriver)
    return updateDriver
  } else {
    const newDriver = await prismaClient.driver.create({
      data: {
        companyId: data.companyId,
        personId: data.personId,
        organizationId,
      },
      include: {
        Person: {
          include: {
            File: true,
          },
        },
        Company: true,
        Organization: true,
      },
    })

    return newDriver
  }
}

export const getAll = async(organizationId: string) => {
  const result = await prismaClient.driver.findMany({
    where: {
      organizationId,
    },
    include: {
      Person: {
        include: {
          File: true,
        },
      },
    },
  })
  return result
}

export const getById = async(id: string) => {
  const result = await prismaClient.driver.findUnique({
    where: {
      id,
    },
    include: {
      Files: true,
      Person: true,
      Company: true,
    },
  })

  return result
}

export const getAllInside = async(organizationId: string) => {
  const result = await prismaClient.driver.findMany({
    where: {
      organizationId,
      Person: {
        isInside: true,
      },
    },
    include: {
      Person: true,
      Company: true,
      EntranceUnits: {
        include: {
          Vehicle: {
            include: {
              VehicleType: {
                include: { Question: true },
              },
            },
          },
        },
        orderBy: {
          dateTime: 'desc',
        },
      },
    },
  })

  return result
}

export const getAllOutside = async(organizationId: string) => {
  const result = await prismaClient.driver.findMany({
    where: {
      organizationId,
      Person: {
        isInside: false,
      },
    },
  })
  return result
}

export const update = async(data: IDriver) => {
  const result = await prismaClient.driver.update({
    where: {
      id: data.id,
    },
    data: {
      Person: {
        update: {
          name: data.Person?.name,
          curp: data.Person?.curp,
          license: data.Person?.license,
          security_social_number: data.Person?.security_social_number,
          email: data.Person?.email,
          lastname: data.Person?.lastname,
          isInside: data.Person?.isInside,
          numberphone: data.Person?.numberphone,
        },
      },
    },
  })
  return result
}
