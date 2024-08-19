import { prismaClient } from '../prisma/client'
import type { IQuestion } from '../interfaces'

export const getAll = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const result = await prismaClient.question.findMany({
    take: pageSize,
    skip: skipAmout,
    where: {
      status: true,
      organizationId,
    },
  })
  const count = await prismaClient.question.count({
    where: {
      status: true,
    },
  })
  return { result, count }
}
 
export const getById = async(id: string) => {
  const result = await prismaClient.question.findFirst({
    where: { id },
  })
  return result
}

export const getByType = async(type: string, organizationId: string): Promise<Array<IQuestion>> => {
  const result = await prismaClient.question.findMany({
    where: {
      status: true,
      type,
      organizationId,
    },
  })

  return result
}

export const create = async(data: IQuestion, organizationId: string) => {
  console.log('dataToCreate:')
  console.log(data)
  const create = await prismaClient.question.create({
    data: {
      name: data.name,
      type: data.type,
      organizationId,
      status: true
      
    }
  })
return create
  // const existingQuestionWithStatusFalse = await prismaClient.question.findFirst({
  //   where: {
  //     organizationId,
  //     name: data.name,
  //     status: false,
  //     type: data.type,
  //   },
  // })
  // const existingQuestionWithStatusTrue = await prismaClient.question.findFirst({
  //   where: {
  //     name: data.name,
  //     status: true,
  //     organizationId,
  //     type: data.type,
  //   },
  // })
  // if (existingQuestionWithStatusFalse) {
  //   const result = await prismaClient.question.update({
  //     where: {
  //       id: existingQuestionWithStatusFalse.id,
  //     },
  //     data: {
  //       status: true,
  //       // type: data.type,
  //       // address: data.address,
  //     },
  //   })
  //   return result
  // } else {
  //   if (existingQuestionWithStatusTrue) {
  //     return existingQuestionWithStatusTrue
  //   } else {
  //     const result = await prismaClient.question.create({
  //       data: {
  //         name: data.name,
  //         type: data.type,
  //         // address: data.address,
  //         status: true,
  //         organizationId,
  //       },
  //     })
  //     return result
  //   }
  // }

  ////////////////////////////////////////////////////////
  // const result = await prismaClient.question.create({
  //   data: {
  //     name: data.name,
  //     type: data.type,
  //     status: true,
  //     organizationId,
  //   },
  // })
  // return result
}

export const updateQuestion = async(data: IQuestion) => {
  const result = await prismaClient.question.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
    },
  })
  return result
}

export const deleteQuestion = async(id: string) => {
  const result = await prismaClient.question.update({
    where: {
      id,
    },
    data: {
      status: false,
    },
  })

  return result
}

export const readByNameAndType = async(name: string, type: string, organizationId: string) => {
  const question = await prismaClient.question.findFirst({
    where: {
      name,
      organizationId,
      type,
    },
  })

  return question
}

export const activeAndEditQuestion = async(id: string, newData: IQuestion) => {
  await prismaClient.question.update({
    where: {
      id,
    },
    data: {
      name: newData.name,
      // type: newData.type,
      status: true, // activamos la pregunta y le damos la nueva informacion
    },
  })
}

export const Update = async(data: IQuestion, questionFoundId: string) => {
  const question = await prismaClient.question.update({
    where: {
      id: questionFoundId,
    },
    data: {
      name: data.name,
    },
  })
  return question
}

export const change = async (data: IQuestion, foundQuestionId: string, questionToEditId: string) => {
  console.log("Data:")
  console.log(data)
  await prismaClient.question.update({
    where: {
      id: foundQuestionId,
    },
    data: {
      name: data.name,
      type: data.type,
      status: true, // la que se econtro se activara
    },
  })
  await prismaClient.question.update({
    where: {
      id: questionToEditId,
    },
    data: {
      status: false,
    },
  })
}
