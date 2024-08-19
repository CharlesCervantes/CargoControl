import { Update, activeAndEditQuestion, change, create, deleteQuestion, getAll, getById, getByType, readByNameAndType, updateQuestion } from '../../modules/question'
import { update } from '../../modules/Triler-type-questions'
import { update as updateVehicle } from '../../modules/Vehicle-type-questions'
import type { IQuestion } from '../../interfaces'
import type { Request, Response } from 'express'

export const createQuestion = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { name, type, status } = req.body
  const questionData: IQuestion = {
    name,
    type,
    status,
    organizationId,
  }
  try {
    const searchQuestion = await readByNameAndType(name, type, organizationId) // buscamos si el nombre de la question ya existe en el tipo correspondiente
    if (searchQuestion) { // Verificamos si la pregunta existes
      if (searchQuestion.status) { // Si la pregunta existe,en el tipo correspondiente y tiene estatus "true"
        res.status(200).json({ ok: false, message: 'Ya existe una pregunta con este nombre' }) // regresamos solamente
      } else {
        if (!searchQuestion.status) { // si la pregunta  existe en el tipo de dato correspondiente y tiene status "false"
          const question = await activeAndEditQuestion(searchQuestion.id, questionData) // la activamos y la actualizamos
          res.status(200).json({ ok: true, message: 'Pregunta Creada Exitosamente!', data: question })
        }
      }
    } else {
      if (!searchQuestion) { // si no se encuentra una pregunta con este nombre
        const newQuestion = await create(questionData, organizationId) // solamente se crea la pregunta
        res.status(200).json({ ok: true, message: 'Pregunta creada exitosamente', data: newQuestion })
      }
    }
  } catch (error) {
    console.log(error)
  }
  // const organizationId = res.locals.org.organizationId
  // const { name, type, status } = req.body

  // try {
  //   const question: IQuestion = {
  //     name,
  //     type,
  //     status,
  //     organizationId,
  //   }

  //   const result = await create(question, organizationId)
  //   res.status(201).json({ ok: true, data: result })
  // } catch (error) {
  //   res.status(500).json({ ok: false, error })
  // }
}

export const getQuestions = async(req: Request, res: Response) => {
  const { pageSize, pageIndex } = req.params
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAll(organizationId, parseInt(pageSize), parseInt(pageIndex))
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(500).json({ ok: false, message: 'error obteniendo questions' })
  }
}

export const getQuestionById = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await getById(id)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(500).json({ ok: false, error })
  }
}

export const getQuestionsByType = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { type } = req.params

  try {
    const result = await getByType(type, organizationId)
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(500).json({ ok: false, error })
  }
}

export const updateTrailerQuestions = async(req: Request, res: Response) => {
  const { id, connect, disconnect } = req.body
  try {
    const result = await update({ id, connect, disconnect })
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(500).json({ ok: false, error })
  }
}

export const updateVehicleQuestions = async(req: Request, res: Response) => {
  const { id, connect, disconnect } = req.body
  try {
    const result = await updateVehicle({ id, connect, disconnect })
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(500).json({ ok: false, error })
  }
}

export const updateOneQuestion = async(req: Request, res: Response) => {
  const { id, name, type, status } = req.body
  const organizationId = res.locals.org.organizationId
  const questionData: IQuestion = {
    name,
    type,
    status,
    organizationId,
  }
  console.log('QuestionData')
  console.log(questionData)
  try {
    const searchQuestion = await readByNameAndType(name, type, organizationId) // buscamos la pregunta en si tipo correspondiente por medio del nombre
    if (searchQuestion) { // si la pregunta existe
      if (searchQuestion.status) { // , tiene status true
        if (id === searchQuestion.id) { // y el id de la pregunta encontrada es igual al id de la pregunta que queremos actualizar
          const question = await Update(questionData, searchQuestion.id) // le actualizamos el nombre
          res.status(200).json({ ok: true, message: 'Pregunta actualizada exitosamente', data: question })
        } else {
          res.status(200).json({ ok: false, message: 'Ya Existe una Pregunta con Este Nombre' }) // regresamos un error de que la pregunta existe
        }
      } else {
        if (!searchQuestion.status) { // y tiene status false
          const question = await change(questionData, searchQuestion.id, id) // la pregunta a editar se cambia a false, y la pregunta eliminada pasa a ser true pero con informacion actualizada
          res.status(200).json({ ok: true, message: 'Pregunta actualizada exitosamente', data: question })
        }
      }
    } else {
      if (!searchQuestion) { // si el nombre de la nueva pregunta es nuevo en su tipo
        const company = await Update(questionData, id) // simplemente se actualiza
        res.status(200).json({ ok: true, message: 'Pregunta actualizada exitosamente', data: company })
      }
    }
  } catch (error) {
    console.log(error)
  }
  // const { id, name, type, status } = req.body
  // const organizationId = res.locals.org.organizationId
  // try {
  //   const result = await updateQuestion({ id, name, type, status, organizationId })
  //   res.status(200).json({ ok: true, data: result })
  // } catch (error) {
  //   res.status(500).json({ ok: false, error })
  // }
}

export const deleteOneQuestion = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await deleteQuestion(id)
    res.status(200).json({ ok: true, message: 'Pregunta Eliminada Exitosamente!', data: result })
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error Inesperado al Eliminar la Pregunta', error })
  }
}
