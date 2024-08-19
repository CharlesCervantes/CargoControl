import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createLocation, deleteLocation, getAllLocations, getLocations, updateLocation } from '../controllers/locations'

const router: Router = Router()

// Get all locations
router.get('/', verifyJwt, getAllLocations)

// create location ✔
router.post('/', verifyJwt, createLocation)

// get locations to table✔
router.get('/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, getLocations)

// update location
router.patch('/:id', verifyJwt, updateLocation)

// delete location
router.patch('/delete/:id', verifyJwt, deleteLocation)
export default router
