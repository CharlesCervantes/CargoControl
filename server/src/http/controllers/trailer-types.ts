import { create, deleteTrailer, getAll, getById } from '../../modules/Trailer-type'
import type { Request, Response } from 'express'

export const createTrailerType = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { name } = req.body
  try {
    const newTrailerType = await create(name, organizationId)
    res.status(200).json({ ok: true, data: newTrailerType })
  } catch (error) {
    res.status(400).json({ ok: false, msj: `Error ${error}, no se pudo crear el trailer type` })
  }
}

export const listTrailerType = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const request = await getAll(organizationId)
    res.status(200).json({ ok: true, data: request })
  } catch (error) {
    res.status(400).json({ ok: false, msj: `Error ${error}, no se pudo listar los trailer type` })
  }
}

export const getTrailerTypeById = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await getById(id)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, msj: `Error ${error}, no se pudo obtener el trailer type` })
  }
}

export const deleteTrailerType = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await deleteTrailer(id)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, msj: `Error ${error}, no se pudo eliminar el trailer type` })
  }
}
