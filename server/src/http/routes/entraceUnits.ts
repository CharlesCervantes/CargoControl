import { Router } from 'express'
import { uploadNewStorage } from '../middleware/express-fileupload'
import { verifyJwt } from '../middleware/verifyJwt'
import { createEntraceUnits, getEntraceUnitsById, listEntraceUnits, reportExcel } from '../controllers/entraceUnits'

const router: Router = Router()

// create
router.post('/', verifyJwt, uploadNewStorage.array('files'), createEntraceUnits)

// list
router.get('/', verifyJwt, listEntraceUnits)

// getbyID
router.post('/id', verifyJwt, getEntraceUnitsById)

// report Excel
router.get('/excel/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, reportExcel)

export default router
