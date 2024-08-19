import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createQuestion, deleteOneQuestion, getQuestionById, getQuestions, getQuestionsByType, updateOneQuestion, updateTrailerQuestions, updateVehicleQuestions } from '../controllers/questions'

const router: Router = Router()

// create router
router.post('/', verifyJwt, createQuestion)

// list of questions
router.get('/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, getQuestions)

// // get question by id
router.post('/:id', verifyJwt, getQuestionById)

// // get question by "vehicle" type
router.get('/by-type/:type', verifyJwt, getQuestionsByType)

// // actualizar questions de triler
router.patch('/trailer-types', verifyJwt, updateTrailerQuestions)

// actualizar questions de vehicle
router.patch('/vehicle-types', verifyJwt, updateVehicleQuestions)

// actualizar una pregunta
router.put('/', verifyJwt, updateOneQuestion)

// eliminar pregunta
router.delete('/:id', deleteOneQuestion)

export default router
