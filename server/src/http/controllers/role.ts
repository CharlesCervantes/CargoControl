import { getRoleById as getRole } from '~/modules/Role'
import type { Request, Response } from 'express'

export const getRoleById = async(req: Request, res: Response) => {
  const { id } = req.params

  const result = await getRole(id)
  res.json(result)
}
