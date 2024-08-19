import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createVehicle, getAllVehicles, getAllVehiclesInside } from '../controllers/vehicle'

const router: Router = Router()

router.post('/', verifyJwt, createVehicle)

router.get('/inside', verifyJwt, getAllVehiclesInside)

router.get('/all', verifyJwt, getAllVehicles)

export default router
