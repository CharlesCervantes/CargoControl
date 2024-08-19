import type { Request, Response } from 'express'

export const getOwnIpAddress = async(req: Request, res: Response) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    res.status(200).json(ip)
  } catch (error) {
    res.status(400).json(error)
  }
}
