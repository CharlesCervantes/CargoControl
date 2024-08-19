import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createTrailerType, deleteTrailerType, getTrailerTypeById, listTrailerType } from '../controllers/trailer-types'

export const router: Router = Router()

// get a list of trailer types
router.get('/', verifyJwt, listTrailerType)

// create a trailer type
router.post('/', verifyJwt, createTrailerType)

// get a trailer
router.get('/:id', verifyJwt, getTrailerTypeById)

// eliminar trailer
router.delete('/:id', verifyJwt, deleteTrailerType)

export default router
