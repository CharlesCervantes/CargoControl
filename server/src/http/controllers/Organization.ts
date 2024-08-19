import { getAll } from '../../modules/Organization'
import type { Request, Response } from 'express'

export const List = async(req: Request, res: Response) => {
  try {
    const request = await getAll()
    res.status(200).json({
      ok: true,
      message: 'Organizaciones optenidas correctamente',
      data: request,
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      messaje: 'Un error ocurrio en la peticion',
      data: error,
    })
  }
}
