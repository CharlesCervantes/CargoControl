
import { getPersonById } from '../../modules/Person'
import { uploadFile } from '../../config/s3'
import { create, getAll } from '../../modules/Visitor-entrance'
import { saveVisitor } from '../helpers/EntranceVisitor/SaveVisitor'
import { SaveVehicleVisitor } from '../helpers/EntranceVisitor/SaveVehicleVisitor'
import { create as createFile } from '../../modules/File'
import { env } from '../../env'
import type { IFile, IVisitorEntrance } from '../../interfaces'
import type { Request, Response } from 'express'

export const createVisitorEnter = async(req: Request, res: Response) => {
  const files: Array<Express.Multer.File> = req.files as unknown as Array<Express.Multer.File>
  const json = req.body.data
  const organizationId = res.locals.org.organizationId
  // const userId = res.locals.org.userId

  try {
    const data: IVisitorEntrance = await JSON.parse(json)
    const { Visitors, VehicleVisitor, locationId } = data

    const visitors = await saveVisitor(Visitors, organizationId)
    const vehicleVisitor = await SaveVehicleVisitor(organizationId, VehicleVisitor)
    const newEntrance = await create(locationId, organizationId, visitors, vehicleVisitor?.id)

    if (files && files.length > 0) {
      for (const file of files) {
        await uploadFile(file.path, file.originalname)

        const idFile = file.originalname.split('_')[0]
        const personId = newEntrance.Visitors.find(visitor => visitor.Person?.identificationFiles === idFile)

        if (personId?.Person) {
          console.log(personId)
          const person = await getPersonById(personId.Person?.id)
          const newFile: IFile = {
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            url: `${env.URLBASE}/image/${file.originalname}`,
            organizationId,
            personId: person?.id,
          }

          const saveFile = await createFile(newFile, organizationId)
          console.log(saveFile)
        }
      }
    }

    res.status(200).json({ ok: true, message: 'Entrada Guardada exitosamente', data: newEntrance })
  } catch (error) {
    console.log(error)
    res.status(400).json({ ok: false, message: 'Error creating entrance', error })
  }
}

export const getAllEntranceVisitor = async(req: Request, res: Response) => {
  const { pageSize, pageIndex } = req.params
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAll(organizationId, parseInt(pageSize), parseInt(pageIndex))
    res.status(200).json({ ok: true, message: 'Entradas encontradas', data: result })
  } catch (error) {
    res.status(400).json({ ok: false, message: `Error al crear el error, ${error}`, error })
  }
}
