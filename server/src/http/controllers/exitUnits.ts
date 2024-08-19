/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TrailerExitConnection, create, list } from '../../modules/ExitUnits'
import { createChecklist } from '../../modules/Checklist'
import { create as createResponse } from '../../modules/Reponse'
import { getLastUnitEntranceByDriverId } from '../../modules/EntraceUnits'
import type { IChecklist, IExitUnits, IResponse } from '../../interfaces'
import type { Request, Response } from 'express'

export const createExitUnit = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const userId = res.locals.org.userId
  const newExit: IExitUnits = JSON.parse(req.body.data)

  // const newExit = req.body.data

  console.log('oid ', organizationId)
  console.log('uid', userId)
  console.log('reqbd', newExit)

  try {
    // const dataString: IExitUnits = JSON.parse(newExit)
    // dataString.organizationId = organizationId
    newExit.organizationId = organizationId
    newExit.userId = userId

    // id de la ultima entrada
    const lastEntrance = await getLastUnitEntranceByDriverId(newExit.Driver?.id || '')
    console.log('Last Etrance:', lastEntrance)
    newExit.entranceUnitId = lastEntrance?.id || ''

    // creacion de la salida
    const Exit = await create(newExit)

    // Creación del checklist
    const vehicleChecklist: IChecklist | undefined = newExit.Vehicle?.Checklist?.[0]
    if (vehicleChecklist) {
      vehicleChecklist.exitUnitId = Exit.id
      vehicleChecklist.vehicleId = Exit.vehicleId || ''
      vehicleChecklist.organizationId = Exit.organizationId
      console.log('Vehicle CL:', vehicleChecklist)
      const createVehicleChecklist = await createChecklist(vehicleChecklist)

      if (vehicleChecklist.Responses) {
        for (let i = 0; i < vehicleChecklist.Responses.length; i++) {
          const newResponse = vehicleChecklist.Responses[i]
          newResponse.checklistId = createVehicleChecklist.id
          newResponse.organizationId = organizationId
          const response = await createResponse(newResponse)
        }
      }
    } else {
      res.status(400).json({ ok: false, message: 'El cheklist del vehiculo no se realizo' })
    }

    // Conexion de trailers a la salida creada anteriormente
    if (newExit.Trailer && newExit.Trailer.length > 0) {
      for (let i = 0; i < newExit.Trailer.length; i++) {
        const trailer = newExit.Trailer[i]
        console.log('Trailer ID:', trailer.id)
        console.log('Trailer var:', trailer)
        console.log('Exit Prev Trailer:', Exit)
        const trailerConnected = await TrailerExitConnection(trailer, Exit.id)

        if (trailer.Checklist) {
          const trailerCheklist = trailer.Checklist[0]
          trailerCheklist.exitUnitId = Exit.id
          trailerCheklist.trailerId = trailer.id
          trailerCheklist.organizationId = organizationId
          const saveTrailerCheklist = await createChecklist(trailerCheklist)

          if (trailerCheklist.Responses && trailerCheklist.Responses.length > 0) {
            for (let j = 0; j < trailerCheklist.Responses.length; j++) {
              const newResponse = trailerCheklist.Responses[j]
              newResponse.checklistId = saveTrailerCheklist.id
              newResponse.organizationId = organizationId
              const saveResponse = await createResponse(newResponse)
            }
          }
        }
      }
    }

    res.status(200).json({ ok: true, data: Exit })
  } catch (error) {
    console.log('error:')
    console.log(error)
    res.status(400).json({ ok: false, error })
  }
}

export const listExitUnits = async(req: Request, res: Response) => {
  // const result = await list()

  // res.json(result)
}
