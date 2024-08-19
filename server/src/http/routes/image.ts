import fs from 'fs'
import path from 'path'
import { Router } from 'express'
import { downloadFile } from '../../config/s3'
import type { Request, Response } from 'express'

const router: Router = Router()

router.get('/:filename', async(req: Request, res: Response) => {
  const directory = './public'
  const { filename } = req.params
  const file = path.join(directory, filename)

  try {
    console.log(filename)
    // Verificar si el archivo existe de forma sincrónica
    if (!fs.existsSync(file)) {
      // El archivo no existe localmente, intenta descargarlo de Amazon S3
      console.log(filename)
      await downloadFile(filename)

      if (!fs.existsSync(file)) {
        // Si aún no existe después de la descarga, devuelve un error 404
        console.error(`El archivo '${filename}' no existe en el directorio.`)
        res.status(404).json({ error: 'Archivo no encontrado' })
        return
      }
    }

    // // El archivo existe, envíalo como respuesta
    const File = path.resolve('./public/', req.params.filename)
    res.sendFile(File)
    console.log(`El archivo '${filename}' existe en el directorio.`)
  } catch (error) {
    console.error('Error en la descarga o envío del archivo: ', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

export default router
