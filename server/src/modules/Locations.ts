import { prismaClient } from '../prisma/client'
import type { ILocation } from '../interfaces'

export const create = async(data: ILocation, organizationId: string) => {
  const existingLocationWithStatusFalse = await prismaClient.location.findFirst({
    where: {
      name: data.name,
      status: false,
      organizationId,
    },
  })

  if (existingLocationWithStatusFalse) {
    const result = await prismaClient.location.update({
      where: {
        id: existingLocationWithStatusFalse.id,
      },
      data: {
        status: true,
        capacity: data.capacity,
      },
    })
    return result
  } else {
    const result = await prismaClient.location.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        status: true,
        organizationId,
      },
    })
    return result
  }
}

// this module is to data prepared for the table
export const getAll = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const result = await prismaClient.location.findMany({
    take: pageSize,
    skip: skipAmout,
    where: {
      status: true,
      organizationId,
    },
  })

  const count = await prismaClient.location.count({
    where: {
      status: true,
    },
  })
  return { result, count }
}

export const edit = async(data: ILocation, locationFoundId: string) => {
  const company = await prismaClient.location.update({
    where: {
      id: locationFoundId,
    },
    data: {
      name: data.name,
      capacity: data.capacity,
    },
  })
  return company
  // if (locationStatus) {
  //   console.log('entre a true')
  //   const location = await prismaClient.location.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       name: data.name,
  //       capacity: data.capacity,
  //     },
  //   })
  //   return location
  // } else {
  //   if (!locationStatus) {
  //     console.log('entre a false')
  //     const location = await prismaClient.location.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         name: data.name,
  //         capacity: data.capacity,
  //         status: true, // la activamos y la actualizamos
  //       },
  //     })
  //     return location
  //   }
  // }
}

export const change = async(data: ILocation, foundLocationId: string, locationToEditId: string) => {
  await prismaClient.location.update({
    where: {
      id: foundLocationId,
    },
    data: {
      name: data.name,
      capacity: data.capacity,
      status: true, // la que se econtro se activara
    },
  })

  await prismaClient.location.update({
    where: {
      id: locationToEditId,
    },
    data: {
      status: false,
    },
  })
}

export const erase = async(id: string) => {
  const result = await prismaClient.location.update({
    where: {
      id,
    },
    data: {
      status: false,
    },
  })
  return result
}

export const getByName = async(name: string, organizationId: string) => {
  const search = await prismaClient.location.findFirst({
    where: {
      name,
      organizationId,
      // status: true,
    },
  })

  return search
}

export const getEveryLocation = async(organizationId: string) => {
  const result = await prismaClient.location.findMany({
    where: { organizationId, status: true },
  })

  return result
}

export const activeAndEditLocation = async(id: string, newData: ILocation) => {
  await prismaClient.location.update({
    where: {
      id,
    },
    data: {
      name: newData.name,
      capacity: newData.capacity,
      status: true,
    },
  })
}

export const getById = async(id: string) => {
  const result = await prismaClient.location.findUnique({
    where: { id },
  })

  return result
}
