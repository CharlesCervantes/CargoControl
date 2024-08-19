import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createNewResponse, getAllReponses } from '../controllers/respnse'

const router: Router = Router()

// root route getAll
router.get('/', verifyJwt, getAllReponses)

// create a response
router.post('/', verifyJwt, createNewResponse)

export default router
