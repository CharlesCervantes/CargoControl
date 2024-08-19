import { getAllInside } from '../../modules/Trailer'
import type { Request, Response } from 'express'

export const getAllTrailersInside = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAllInside(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Trailers inside' })
  } catch (error) {
    res.status(500).json({ ok: false, message: `Error al obtener los trailers ${error}` })
  }
}
