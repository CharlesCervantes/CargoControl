import { prismaClient } from '../prisma/client'
import type { IVisitorType } from '../interfaces'

export const create = async(data: IVisitorType, organizationId: string) => {
  const existingVisitorTypeWithStatusFalse = await prismaClient.visitorType.findFirst({
    where: {
      organizationId,
      name: data.name,
      status: false,
    },
  })
  const existingVisitorTypeWithStatusTrue = await prismaClient.visitorType.findFirst({
    where: {
      name: data.name,
      status: true,
      organizationId,
    },
  })
  if (existingVisitorTypeWithStatusFalse) {
    const result = await prismaClient.visitorType.update({
      where: {
        id: existingVisitorTypeWithStatusFalse.id,
      },
      data: {
        status: true,
        description: data.description,
      },
    })
    return result
  } else {
    if (existingVisitorTypeWithStatusTrue) {
      return existingVisitorTypeWithStatusTrue
    } else {
      const result = await prismaClient.visitorType.create({
        data: {
          name: data.name,
          description: data.description,
          status: true,
          organizationId,
        },
      })
      return result
    }
  }
  // const result = await prismaClient.visitorType.create({
  //   data: {
  //     name: data.name,
  //     description: data.description,
  //     organizationId,
  //   },
  // })

  // return result
}

export const getByName = async(name: string, organizationId: string) => {
  const result = await prismaClient.visitorType.findFirst({
    where: {
      name,
      organizationId,
    },
  })
  return result
}

export const getAll = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const result = await prismaClient.visitorType.findMany({
    take: pageSize,
    skip: skipAmout,
    where: {
      organizationId,
      status: true,
    },
  })

  const count = await prismaClient.visitorType.count(
    {
      where: {
        status: true,
      },
    },
  )
  return { result, count }
}

export const drop = async(id: string) => {
  const result = await prismaClient.visitorType.update({
    where: { id },
    data: {
      status: false,
    },
  })

  return result
}

export const update = async(id: string, data: IVisitorType) => {
  const result = await prismaClient.visitorType.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  })

  return result
}

export const edit = async(data: IVisitorType, visitorTypeFoundId: string) => {
  const visitorType = await prismaClient.visitorType.update({
    where: {
      id: visitorTypeFoundId,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  })
  return visitorType
}
// export const update = async(data: IVisitorType) => {
//   const result = await prismaClient.visitorType.update({
//     where: {
//       id: data.id,
//     },
//     data: {
//       name: data.name,
//       description: data.description,
//     },
//   })

//   return result
// }
export const getById = async(id: string, organizationId: string) => {
  const visitorType = await prismaClient.visitorType.findFirst({
    where: {
      id,
      organizationId,
    },
  })
  return visitorType
}

export const activeAndEditVisitorType = async(id: string, newData: IVisitorType) => {
  await prismaClient.visitorType.update({
    where: {
      id,
    },
    data: {
      name: newData.name,
      description: newData.description,
      status: true,
    },
  })
}

export const change = async(data: IVisitorType, foundVisitorTypeId: string, visitorTypeToEditId: string) => {
  await prismaClient.visitorType.update({
    where: {
      id: foundVisitorTypeId,
    },
    data: {
      name: data.name,
      description: data.description,
      status: true, // la que se econtro se activara
    },
  })

  await prismaClient.visitorType.update({
    where: {
      id: visitorTypeToEditId,
    },
    data: {
      status: false,
    },
  })
}

export const list = async(organizationId: string) => {
  const result = await prismaClient.visitorType.findMany({
    where: {
      organizationId,
      status: true,
    },
  })

  return result
}
