import { Router } from 'express'
import { List } from '../controllers/Organization'
import { verifyJwt } from '../middleware/verifyJwt'

const router: Router = Router()

router.get('/', verifyJwt, List)

export default router
