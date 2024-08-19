import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { create as createUser, existUserByEmailOrUsernameOrPhone, getByEmail } from '../../modules/user'
import { env } from '../../env'
import { create, searchOrganizationByName } from '../../modules/Organization'
import { demoRegister } from '../../Mail/Templates'
import { getRoles } from '../../modules/Role'
import type { IUser } from '../../interfaces'
import type { Request, Response } from 'express'

export const logIn = async(req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const searchUser = await getByEmail(email)
    if (!searchUser)
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado' })

    // Verifica la contraseña
    const validPassword = await bcrypt.compare(password, searchUser.password || '')
    if (!validPassword)
      return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' })
    if (searchUser.token) {
      return res.status(400).json({ ok: false, message: 'La sesion ya esta siendo utilizada en otro dispositivo' })
    } else {
      const jwtToken = jwt.sign({ userId: searchUser.id, organizationId: searchUser.organizationId }, env.JWT_SECRET, { expiresIn: '30 days' })
      res.status(200).json({ ok: true, token: jwtToken, data: { user: searchUser } })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, message: `Error interno ${error}` })
  }
}

export const signUpDemo = async(req: Request, res: Response) => {
  const { organizationName, username, password, name, email, numberphone, lastname, terms } = req.body
  try {
    const existUser = await existUserByEmailOrUsernameOrPhone(email, username, numberphone)
    const existOrganization = await searchOrganizationByName(organizationName)
    const roles = await getRoles()

    if (!terms)
      return res.status(400).json({ ok: false, msj: 'Debe aceptar los términos y condiciones' })
    if (existUser.exist)
      return res.status(400).json({ ok: false, msj: `El ${existUser.msj} ya existe` })
    if (existOrganization)
      return res.status(400).json({ ok: false, msj: 'La organización ya existe porfavor escoja otro nombre' })
    // create organization
    const organization = await create({ name: organizationName })
    // create user
    const saltRounds = 10 // Puedes ajustar este valor según tus necesidades, pero 10 es un valor comúnmente recomendado
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const adminRole = roles.find(rol => rol.name === 'admin')

    if (adminRole) {
      const dataUser: IUser = {
        name,
        email,
        lastname,
        organizationId: organization.id,
        password: hashedPassword,
        roleId: adminRole.id,
        username,
        numberphone,
      }

      const newUser = await createUser(dataUser, organization.id)
      await demoRegister(newUser?.name, newUser.lastname || '', password, organization.name, organization.id, newUser?.email)
      res.status(200).json({ ok: true, data: { user: newUser, organization } })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, msj: `Error interno ${error}` })
  }
}

export const resetSession = async(req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const searchUser = await getByEmail(email)
    if (!searchUser)
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado' })

    // Verifica la contraseña
    const validPassword = await bcrypt.compare(password, searchUser.password || '')
    if (!validPassword)
      return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' })

    const jwtToken = jwt.sign({ userId: searchUser.id, organizationId: searchUser.organizationId }, env.JWT_SECRET, { expiresIn: '30 days' })

    res.status(200).json({ ok: true, token: jwtToken, data: { user: searchUser } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, message: `Error interno ${error}` })
  }
}
