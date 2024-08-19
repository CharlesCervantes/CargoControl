import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createVisitor, getAllVisitorInside } from '../controllers/visitor'

const router: Router = Router()

// create new visitor
router.post('/', verifyJwt, createVisitor)

// get all inside
router.get('/inside', verifyJwt, getAllVisitorInside)

export default router
