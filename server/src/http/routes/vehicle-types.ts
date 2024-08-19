import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createVehicleType, deleteVehicleType, getAllVehiclesTypes, getVehicleTypeById } from '../controllers/vehicles-types'

const router: Router = Router()

router.get('/', verifyJwt, getAllVehiclesTypes)
router.get('/:id', verifyJwt, getVehicleTypeById)
router.post('/', verifyJwt, createVehicleType)
router.delete('/:id', verifyJwt, deleteVehicleType)

export default router
