import { create, getAll } from '../../modules/Reponse'
import type { IResponse } from '../../interfaces'
import type { Request, Response } from 'express'

export const getAllReponses = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const responses = await getAll(organizationId)
    res.status(200).json({ ok: true, data: responses })
  } catch (error) {
    res.status(400).json({ ok: false, message: `${error}` })
  }
}

export const createNewResponse = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { checklistId, questionId, response, identification } = req.body
  try {
    const dataResponse: IResponse = {
      checklistId,
      questionId,
      response,
      identification,
      organizationId,
    }

    const newResponse = await create(dataResponse)
    res.status(201).json({ ok: true, data: newResponse, message: 'Response created successfully' })
  } catch (error) {
    res.status(400).json({ ok: false, message: `${error}` })
  }
}
