import fs from 'fs'
import multer from 'multer' // Importa Multer
import type { Multer, StorageEngine } from 'multer'

const storage: StorageEngine = multer.diskStorage({
  destination(req, file, cb) {
    const dir = './src/docs/img'
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}`)
  },
})

const uploadNewStorage: Multer = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }) // No uses .any() aquí

export { uploadNewStorage }
