import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createExitVisitor, listExitVisitor } from '../controllers/visitor-exit'

const router: Router = Router()

router.post('/', verifyJwt, createExitVisitor)

router.get('/', verifyJwt, listExitVisitor)

export default router
