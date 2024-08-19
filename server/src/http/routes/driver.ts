import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createDriver, getDriverById, getDriversInside, getDriversOutside, listDriver, updateDriver } from '../controllers/driver'

const router: Router = Router()

// create driver ✔
router.post('/', verifyJwt, createDriver)

// driver list ✔
router.get('/', verifyJwt, listDriver)

// get by id ✔
router.post('/:id', verifyJwt, getDriverById)

router.get('/inside', verifyJwt, getDriversInside)

// edit
router.patch('/:id', verifyJwt, updateDriver)

// get outside
router.get('/outside', verifyJwt, getDriversOutside)

export default router
