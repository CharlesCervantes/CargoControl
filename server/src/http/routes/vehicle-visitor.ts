import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createVehicleVisitor, getAllVehicleVisitorInside, getAllVisitorVehicle } from '../controllers/vehicle-visitor'

const router: Router = Router()

// create
router.post('/', verifyJwt, createVehicleVisitor)

// get All
router.get('/', verifyJwt, getAllVisitorVehicle)

router.get('/inside', verifyJwt, getAllVehicleVisitorInside)

export default router
