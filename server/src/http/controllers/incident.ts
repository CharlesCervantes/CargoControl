
import { uploadFile } from '../../config/s3'
import { create, getAll, getIncidents } from '../../modules/Incident'
import { create as createFile } from '../../modules/File'
import type { IFile, IIncident } from '../../interfaces'
import type { Request, Response } from 'express'

export const createIncident = async(req: Request, res: Response) => {
  const files: Array<Express.Multer.File> = req.files as unknown as Array<Express.Multer.File>
  const json = req.body.data
  // const userId = res.locals.org.userId
  const organizationId = res.locals.org.organizationId
  try {
    const data: IIncident = await JSON.parse(json)

    const newIncident = await create(data, organizationId)
    console.log(newIncident)

    if (files && files.length > 0) {
      for (const file of files) {
        console.log(file.destination)
        await uploadFile(file.path, file.originalname)

        const newFile: IFile = {
          name: file.originalname,
          size: file.size,
          type: file.mimetype,
          url: `http://localhost:3000/image/${file.originalname}`,
          organizationId,
          incidentId: newIncident.id,
        }

        const saveFile = await createFile(newFile, organizationId)
        console.log(saveFile)
      }
    }

    res.status(201).json({ ok: true, data: newIncident, message: 'Incident created successfully' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ ok: false, message: `${error}` })
  }
}

export const listIncident = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { pageSize, pageIndex } = req.params
  try {
    const result = await getAll(organizationId, parseInt(pageSize), parseInt(pageIndex))
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    return res.status(400).json({ ok: false, message: `error al obtener los usuarios ${error}`, error })
  }
}

export const allIncidents = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getIncidents(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Getting Incidents' })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}
