import { prismaClient } from '../prisma/client'
import type { IFile } from '../interfaces'

export const createVisitorFIle = async(id: string, data: IFile, organizationId: string) => {
  const result = await prismaClient.file.create({
    data: {
      name: data.name,
      size: data.size,
      type: data.type,
      url: data.url,
      organizationId,
      Visitors: { connect: { id } },
    },
  })

  return result
}

export const createUserFile = async(userId: string, data: IFile, organizationId: string) => {
  const result = await prismaClient.file.create({
    data: {
      name: data.name,
      size: data.size,
      type: data.type,
      url: data.url,
      organizationId,
      User: { connect: { id: userId } },
    },
  })

  return result
}

export const createDriverFile = async(driverId: string, data: IFile, organizationId: string) => {
  const result = await prismaClient.file.create({
    data: {
      name: data.name,
      size: data.size,
      type: data.type,
      url: data.url,
      organizationId,
      driverId,
    },
  })

  return result
}

export const createResponseFile = async(responseId: string, data: IFile, organizationId: string) => {
  const result = await prismaClient.file.create({
    data: {
      name: data.name,
      size: data.size,
      type: data.type,
      url: data.url,
      organizationId,
      responseId,
    },
  })

  return result
}

export const createChecklistSignatureFile = async(checklistId: string, data: IFile, organizationId: string) => {
  const result = await prismaClient.file.create({
    data: {
      name: data.name,
      size: data.size,
      type: data.type,
      url: data.url,
      organizationId,
      checklistId,
    },
  })

  return result
}

export const create = async(data: IFile, organizationId: string) => {
  const newFile = await prismaClient.file.create({
    data: {
      name: data.name,
      size: data.size,
      type: data.type,
      url: data.url,
      personId: data.personId,
      incidentId: data.incidentId,
      checklistId: data.checklistId,
      responseId: data.responseId,
      organizationId,
    },
    include: {
      Person: true,
    },
  })

  return newFile
}

// export const create = async(data: IFile, organizationId: string) => {
//   const newFile = await prismaClient.file.create({
//     data: {
//       name: data.name,
//       url: data.url,
//       checklistId: data.checklistId,
//       responseId: data.responseId,
//       organizationId,
//       size: data.size,
//       type: data.type,
//       personId: data.personId,
//     },
//   })

//   return newFile
// }

// Pablo creo estos dos
export const getFilesByDriverId = async(data: string, organizationId: string) => {
  const result = await prismaClient.file.findMany({
    where: {
      driverId: data,
      organizationId,
    },
  })
  return result
}

export const removeFileById = async(data: string) => {
  const result = await prismaClient.file.delete({
    where: {
      id: data,
    },
  })
  return result
}
////////////
