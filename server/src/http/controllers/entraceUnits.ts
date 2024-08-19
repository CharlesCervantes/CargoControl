/* eslint-disable @typescript-eslint/no-unused-vars */
import { Driver, Trailer, Vehicle } from '@prisma/client'
import { saveDriver } from '../helpers/EntranceUnits/SaveDriver'
import { saveVehicle } from '../helpers/EntranceUnits/SaveVehicle'
import { saveTrailer } from '../helpers/EntranceUnits/SaveTrailer'
import { create as createEntranceUnits, report } from '../../modules/EntraceUnits'
import { uploadFile } from '../../config/s3'
import { getCheklistByentranceId } from '../../modules/Checklist'
import { env } from '../../env'
import { create } from '../../modules/File'
import type { Request, Response } from 'express'
import type { IEntranceUnits, IFile, ITrailer } from '../../interfaces'

export const createEntraceUnits = async(req: Request, res: Response) => {
  const files: Array<Express.Multer.File> = req.files as unknown as Array<Express.Multer.File>
  const organizationId = res.locals.org.organizationId
  const json = req.body.data
  const userId = res.locals.org.userId

  try {
    const data: IEntranceUnits = await JSON.parse(json)
    const { Driver, Vehicle, Trailer, locationId } = data
    console.log('MyEntranceData:', data)

    const getDriver = await saveDriver(Driver, organizationId) // si esto no nos regresa ninguna fotografia, significa que el driver es nuevo
    console.log('1.18PasamosGetDriver', getDriver)
    const getVehicle = await saveVehicle(Vehicle, organizationId, locationId) //
    console.log('1.18PasamosGetVehicle', getVehicle)
    const getTrailer = await saveTrailer(Trailer, organizationId, locationId)
    console.log('1.18PasamosGetTrailer', getTrailer)

    const newEntrance: IEntranceUnits = {
      organizationId,
      locationId,
      Driver: {
        organizationId,
        personId: getDriver.id,
        id: getDriver.id,
      },
      Vehicle: {
        id: getVehicle.id,
        plate: getVehicle.plate,
        companyId: getVehicle.companyId || '', // Usar un valor predeterminado si es nulo
        unitNumber: getVehicle.unitNumber || '',
        vehicleTypeId: getVehicle.vehicleTypeId,
        organizationId,
        isInside: getVehicle.isInside || true,
        Checklist: Vehicle?.Checklist,
      },
      Trailer: getTrailer.map(trailer => ({
        number: trailer.number,
        companyId: trailer.companyId || '', // Usar un valor predeterminado si es nulo
        isInside: trailer.isInside,
        organizationId,
        trailerTypeId: trailer.trailerTypeId, // Usar un valor predeterminado si es nulo
        id: trailer.id,
      })),
    }

    newEntrance.Trailer?.forEach((savedTrailer) => {
      const findCheklist = Trailer?.find((element: ITrailer) => element.number === savedTrailer.number)
      savedTrailer.Checklist = findCheklist?.Checklist
    })

    // console.log(' ')
    // console.log('objeto de entrada para guardado de datos:')
    // console.log(newEntrance)
    console.log('NewEntrance:', newEntrance)
    const newEntranceSaved = await createEntranceUnits(newEntrance)
    // console.log(newEntranceSaved)

    if (files && files.length > 0) {
      const cheklistList = await getCheklistByentranceId(newEntranceSaved.id)

      for (const file of files) {
        await uploadFile(file.path, file.originalname)
        console.log('uploadFile:', file)
        const idFile = file.originalname.split('_')[0]
        console.log('IdFile:', idFile)
        console.log('DriverFiles:', getDriver.Person.File)
        const personID = Driver?.Person?.identificationFiles
        if (personID === idFile) {
          const newFile: IFile = {
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            url: `${env.URLBASE}/image/${file.originalname}`,
            organizationId,
            personId: getDriver.personId,
          }
          const saveFile = await create(newFile, organizationId)
        } else {
          cheklistList.forEach(async(ch) => {
            const cheklistId = ch.id
            const cheklistIdentificationFiles = ch.identification

            if (cheklistIdentificationFiles === idFile) {
              const newFile: IFile = {
                name: file.originalname,
                size: file.size,
                type: file.mimetype,
                url: `${env.URLBASE}/image/${file.originalname}`,
                organizationId,
                checklistId: cheklistId,
              }

              const saveFile = await create(newFile, organizationId)

              console.log(saveFile)
            } else {
              ch.Responses.forEach(async(resp) => {
                const responseID = resp.id
                const responseIdentificationFiles = resp.identification

                if (responseIdentificationFiles === idFile) {
                  const newFile: IFile = {
                    name: file.originalname,
                    size: file.size,
                    type: file.mimetype,
                    url: `${env.URLBASE}/image/${file.originalname}`,
                    organizationId,
                    responseId: responseID,
                  }

                  const saveFile = await create(newFile, organizationId)

                  console.log(saveFile)
                }
              })
            }
          })
        }
      }
    }

    // // Checklist de vehiculo
    res.status(200).json({
      ok: true,
      message: 'Entrada guardada correctamente',
      data: newEntranceSaved,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: true, message: 'Error al guardar los datos', data: error })
  }
}

export const listEntraceUnits = async(req: Request, res: Response) => {
  // const result = await list()
  // res.json(result)
}

export const getEntraceUnitsById = async(req: Request, res: Response) => {
  // const { id } = req.body
  // const result = await getById(id)
  // res.json(result)
}

export const reportExcel = async(req: Request, res: Response) => {
  const { pageSize, pageIndex } = req.params
  const organizationId = res.locals.org.organizationId
  try {
    const result = await report(organizationId, parseInt(pageSize), parseInt(pageIndex))
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}
