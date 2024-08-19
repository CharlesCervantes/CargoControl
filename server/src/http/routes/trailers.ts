import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { getAllTrailersInside } from '../controllers/trailer'

const router: Router = Router()

router.get('/inside', verifyJwt, getAllTrailersInside)

export default router
