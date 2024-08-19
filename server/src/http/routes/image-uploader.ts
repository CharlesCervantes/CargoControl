import path from 'path'
import { Router } from 'express'
import { upload } from '../middleware/multer'
import type { Request, Response } from 'express'

const router: Router = Router()

router.post('/upload', (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    try {
      if (err) {
      // Error al procesar la carga de archivos
        return res.status(500).json({ error: 'Error al cargar las imágenes', details: err.message })
      }

      // Obtener el array de imágenes del campo 'images'
      const images = req.files as unknown as Array<Express.Multer.File>

      // Realizar acciones con el array de imágenes

      // Enviar una respuesta adecuada
      return res.json({ images })
    } catch (error: any) {
      return res.status(500).json({ error: 'Error inesperado en el servidor', details: error.message })
    }
  })
})

router.get('/:filename', (req: Request, res: Response) => {
  const filePath = path.resolve('./src/docs/img/', req.params.filename)
  res.sendFile(filePath)
})

export default router
