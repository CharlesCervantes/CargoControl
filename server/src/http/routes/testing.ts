import { Router } from 'express'
import { uploadNewStorage } from '../middleware/express-fileupload'
import { downloadFile, getFile, getFileURL, listFiles, uploadFile } from '../../config/s3'
import type { Request, Response } from 'express'

const router: Router = Router()

router.post('/', uploadNewStorage.any(), async(req: Request, res: Response) => {
  const files: any = req.files // Tratar los archivos como 'any'

  if (files) {
    // Ahora puedes iterar a través de los archivos
    files.forEach(async(file: any) => {
      console.log('File name:', file.originalname)
      console.log('File size:', file.size)
      // ... otros campos que necesites
      // Cargar el archivo a AWS S3
      await uploadFile(file.path, file.originalname) // Usar la ruta del archivo
    })
  }

  res.send('ok')
})

router.get('/files', async(req: Request, res: Response) => {
  const result = await listFiles()
  res.send(result)
})

router.get('/:filename', async(req: Request, res: Response) => {
  const { filename } = req.params
  const result = await getFile(filename)
  res.json(result.$metadata)
})

router.get('/dowload-from-s3/:filename', async(req: Request, res: Response) => {
  const { filename } = req.params
  try {
    console.log(filename)
    await downloadFile(filename)

    res.status(200).json({ ok: true, message: 'archivo descargado correctamente' })
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Hubo un error en la desvarga del archivo', error })
  }
})

router.get('/presigned/:filename', async(req: Request, resp: Response) => {
  const { filename } = req.params
  try {
    const result = await getFileURL(filename)

    resp.status(200).json({ ok: true, message: 'imagen enviada correctamente', data: result })
  } catch (error) {
    resp.status(400).json({
      ok: false, message: 'Ocurrio un error', error,
    })
  }
})

router.post('/entrance-visitor', uploadNewStorage.array('files'), async(req: Request, res: Response) => {
  const files: Array<Express.Multer.File> = req.files as unknown as Array<Express.Multer.File>
  const json = req.body.data

  // const data = await JSON.parse(json)
  console.log(json)

  if (files && files.length > 0) {
    for (const file of files) {
      console.log('Nombre del archivo:', file.originalname)
      console.log('Tamaño del archivo:', file.size)
      console.log(file.stream)
    }
  }

  res.json({ ok: true, message: 'si funciono' })
})

export default router
