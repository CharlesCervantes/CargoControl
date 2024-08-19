/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaClient } from '../prisma/client'
import type { IUser } from '../interfaces'

// Funciones

// modificado para funcionar son status
export const create = async(data: IUser, organizationId: string) => {
  const existingUser = await prismaClient.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username },
      ],
    },
  })

  if (existingUser) {
    // Actualizamos el usuario si existe
    const updateUser = await prismaClient.user.update({
      where: { id: existingUser.id },
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        numberphone: data.numberphone,
        password: data.password,
        username: data.username,
        roleId: data.roleId,
        organizationId,
        status: true,
      },
      include: {
        Role: true,
      },
    })
    return updateUser
  } else {
    // Creamos un nuevo usuario si no existe
    const result = await prismaClient.user.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        numberphone: data.numberphone,
        password: data.password,
        username: data.username,
        roleId: data.roleId,
        organizationId,
        status: true,
      },
      include: {
        Role: true,
      },
    })
    return result
  }
}

export const createNewAccount = async(data: IUser) => {
  const result = await prismaClient.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      username: data.username,
      lastname: data.lastname,
      numberphone: data.numberphone,
      organizationId: data.organizationId,
      roleId: data.roleId,
      status: true,
    },
  })

  return result
}

export const getUserById = async(id: string) => {
  const userData = await prismaClient.user.findUnique({
    where: { id },
    select: {
      status: true,
      password: true, // Obtén el campo 'status'
      email: true,
      username: true,
    },
  })

  const userWithRole = await prismaClient.user.findUnique({
    where: { id },
    include: {
      Role: true, // Incluye la relación 'Role'
    },
  })

  // Combina los resultados en un objeto único
  const result = {
    ...userData,
    Role: userWithRole?.Role, // Agrega la relación 'Role'
  }

  return result
}

export const getUserByToken = async(token: string) => {
  const response = await prismaClient.user.findUnique({
    where: {
      token,
    },
    include: {
      Role: true,
    },
  })
  return response
}

// modificado para funcionar son status
export const getAllActive = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const result = await prismaClient.user.findMany({
    take: pageSize,
    skip: skipAmout,
    where: {
      organizationId,
      status: true,
    },
    include: {
      Role: true,
    },
  })

  const count = await prismaClient.user.count(
    {
      where: {
        status: true,
        organizationId,
      },
    },
  )
  console.log('count is: ')
  console.log(count)
  return { result, count }
}

// modificado para funcionar son status
export const getByEmail = async(email: string) => {
  const result = await prismaClient.user.findFirst({
    where: {
      email,
      status: true,
    },
    include: {
      Role: true,
      Organization: true,
    },
  })
  return result
}
// modificado para funcionar son status
export const getRole = async(email: string, organizationId: string) => {
  const result = await prismaClient.user.findFirst({
    where: {
      email,
      organizationId,
      status: true,
    },
    select: {
      roleId: true,
    },
  })
  return result?.roleId
}

export const erase = async(id: string) => {
  const result = await prismaClient.user.update({
    where: { id },
    data: {
      status: false,
    },
  })
  return result
}

// modificado para funcionar son status
export const existUserByEmailOrUsernameOrPhone = async(email: string, username: string, numberphone: string) => {
  const searchEmail = await prismaClient.user.findFirst({
    where: {
      email,
      status: true,
    },
  })

  const searchUsername = await prismaClient.user.findFirst({
    where: {
      username,
      status: true,
    },
  })

  // const searhUserPhone = await prismaClient.user.findFirst({
  //   where: { numberphone },
  // })

  if (searchEmail)
    return ({ exist: true, msj: 'correo' })
  else if (searchUsername)
    return ({ exist: true, msj: 'nombre de usuario' })
  else return ({ exist: false, msj: '' })
}

export const updateUserPassword = async(id: string, password: string) => {
  console.log('id and Password')
  console.log(id, password)
  const user = await prismaClient.user.findFirst({
    where: {
      AND: [
        { id },
        { password },
      ],
    },
  })

  if (user) {
    return ({ ok: false, message: 'Ingresa Otra Contraseña' })
  } else {
    const result = await prismaClient.user.update({
      where: { id },
      data: {
        password,
      },
    })
    return result
  }
}

export const updateUserToken = async(id: string, token: string) => {
  const result = await prismaClient.user.update({
    where: { id },
    data: {
      token,
    },
  })
  return result
}

export const deleteUserToken = async(userId: string) => {
  const result = await prismaClient.user.update({
    where: { id: userId },
    data: {
      token: null,
    },
  })
  return result
}
