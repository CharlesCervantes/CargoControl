/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt'
import { sendNewPassword, sendUserCredentials } from '../../Mail/Templates'
import { create, deleteUserToken, erase, existUserByEmailOrUsernameOrPhone, getAllActive, getByEmail, getUserById, getUserByToken as gubt, updateUserPassword, updateUserToken } from '../../modules/user'
import type { IUser } from '../../interfaces'
import type { Request, Response } from 'express'

export const createUser = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const user: IUser = req.body
    const existUser = await existUserByEmailOrUsernameOrPhone(user.email, user.username, user.numberphone || '')

    if (existUser.exist)
      return res.status(400).json({ ok: false, msj: `El ${existUser.msj} ya existe` })

    const saltRounds = 10 // Puedes ajustar este valor según tus necesidades, pero 10 es un valor comúnmente recomendado
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    const dataNewUser: IUser = {
      email: user.email,
      name: user.name,
      organizationId,
      password: hashedPassword,
      roleId: user.roleId,
      username: user.username,
      lastname: user.lastname,
      numberphone: user.numberphone,
    }

    const newUser = await create(dataNewUser, organizationId)
    sendUserCredentials(user.email, user.password, user.username)

    res.status(200).json({ ok: true, data: newUser })
  } catch (error) {
    return res.status(400).json({ ok: false, msj: `error al crear el usuario ${error}`, error })
  }
}

export const getUsersActive = async(req: Request, res: Response) => {
  const { pageSize, pageIndex } = req.params
  const organizationId = res.locals.org.organizationId
  console.log('elementsPerPage is:')
  console.log(pageSize)
  console.log('pageNumber is:')
  console.log(pageIndex)
  try {
    const result = await getAllActive(organizationId, parseInt(pageSize), parseInt(pageIndex))
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    return res.status(400).json({ ok: false, msj: `error al obtener los usuarios ${error}`, error })
  }
}

export const getUserByToken = async(req: Request, res: Response) => {
  const { token } = req.params
  console.log('tokenRecibido:')
  console.log(token)

  try {
    const getUser = await gubt(token)// getUserByToken
    if (!getUser)
      return res.status(400).json({ ok: false, msj: 'el usuario no existe' })

    res.status(200).json({ ok: true, data: { user: getUser } })
  } catch (error) {
    // return res.status(400).json({ ok: false, msj: `error al obtener el rol del usuario ${error}`, error })
  }
}

export const deleteUser = async(req: Request, res: Response) => {
  console.log('in delete user')
  const { id } = req.params

  try {
    const deleteUser = await erase(id)
    if (deleteUser)
      return res.status(200).json({ ok: true })
    else
      return res.status(200).json({ ok: false })
  } catch (error) {
    return res.status(400).json({ ok: false, msj: 'Error eliminando al usuario', error })
  }
}

export const updatePassword = async(req: Request, res: Response) => {
  const { password } = req.body
  const { id } = req.params

  const searchUser = await getUserById(id)
  // comparamos el password con el password del usuario
  const validPassword = await bcrypt.compare(password, searchUser.password || '')
  if (validPassword) {
    return res.status(200).json({ ok: false, message: 'Ingresa una Contraseña Diferente' })
  } else {
    const saltRounds = 10 // Puedes ajustar este valor según tus necesidades, pero 10 es un valor comúnmente recomendado
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await updateUserPassword(id, hashedPassword)
    // await sendNewPassword(searchUser.email, password, searchUser.username)
    return res.status(200).json({ ok: true, message: 'Contraseña Actualizada Correctamente!' })
  }
}
export const updateToken = async(req: Request, res: Response) => {
  const { id } = req.params
  const { token } = req.body
  await updateUserToken(id, token)
  return res.status(200).json({ ok: true, message: 'Token Actualizado' })
}

export const deleteTokenUser = async(req: Request, res: Response) => {
  console.log('in delete Token')
  const userId = res.locals.org.userId
  await deleteUserToken(userId).then(result => console.log(result))
  return res.status(200).json({ ok: true, message: 'Token Eliminado' })
}

export const deleteTokenUserByEmail = async(req: Request, res: Response) => {
  const { email } = req.body
  try {
    const user = await getByEmail(email)

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'Usuario no encontrado',
      })
    }

    const deleteToken = await deleteUserToken(user.id)
    res.status(200).json({
      ok: true,
      message: 'Token eliminado correctamente',
    })
  } catch (error) {
    console.log('')
    console.log('A error appears on delete token user by email')
    console.log(error)
    res.status(400).json({
      ok: false,
      message: 'Error ocurrido',
      error,
    })
  }
}

export const closeUserSession = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    console.log('')
    console.log('close user token')
    console.log('params:', id)
    const existUser = await getUserById(id)

    if (!existUser) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
      })
    } else {
      const updateToken = await deleteUserToken(id)
      res.status(200).json({
        ok: true,
        message: 'Sesion cerrada correctamente',
        data: updateToken,
      })
    }
  } catch (error) {
    console.log('')
    console.log('Ocurrio un error en la funcion de close user session:')
    console.log(error)

    res.status(400).json({
      ok: false,
      message: 'Un error ocurrio en la peticion',
      error,
    })
  }
}
