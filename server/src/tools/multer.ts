import fs from 'fs'
import multer from 'multer'
import type { StorageEngine } from 'multer'
import type { RequestHandler } from 'express'

const storage: StorageEngine = multer.diskStorage({
  destination(req, file, cb) {
    const dir = './src/docs/img'
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

export const upload: RequestHandler = multer({ storage }).array('images', 10)
