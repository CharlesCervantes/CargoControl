/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from '../../env'
import type { NextFunction, Request, Response } from 'express'

export const imageUpload = async(req: Request, res: Response) => {
  if (req.file) {
    const uploadedFile = req.file
    const baseUrl = `${env.URLBASE}`
    const imageUrl = `${baseUrl}/static/${uploadedFile.filename}`
    res.status(200).json({ message: 'Imagen subida correctamente', file: uploadedFile, url: imageUrl })
  } else {
    res.status(400).json({ error: 'No se pudo cargar la imagen' })
  }
}

export const testaws = async(req: Request, res: Response) => {
  res.status(200).json({ message: 'Hola mundo' })
}
