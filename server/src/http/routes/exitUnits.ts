import { Router } from 'express'
import { uploadNewStorage } from '../middleware/express-fileupload'
import { verifyJwt } from '../middleware/verifyJwt'
import { createExitUnit, listExitUnits } from '../controllers/exitUnits'

const router: Router = Router()

// create
router.post('/', verifyJwt, uploadNewStorage.array('files'), createExitUnit)

// list
router.get('/', listExitUnits)

export default router
