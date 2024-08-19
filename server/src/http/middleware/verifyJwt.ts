import jwt from 'jsonwebtoken'
import { env } from '../../env'
import { verifyToken } from '../helpers/user/verifyToken'
import type { JwtPayload } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'

export async function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(403).send('El token es requerido por la autenticacion')

  const token = authHeader.split(' ')[1] // Extraer el token del esquema Bearer

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    if (decoded && decoded.userId) {
      const tokenV = await verifyToken(decoded.userId, token)

      if (tokenV) { res.locals.org = decoded } else {
        return res.status(401).json({
          ok: false,
          message: 'La sesion es invalida, por favor cierra e inicia de nuevo',
        })
      }
    } else {
      // Si no existe, maneja el caso de error aquí (puedes personalizar el mensaje de error)
      return res.status(401).json({
        ok: false,
        message: 'Token invalido',
      })
    }
  } catch (error) {
    return res.status(401).send('Token no valido')
  }

  return next()
}
