import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { allIncidents, createIncident, listIncident } from '../controllers/incident'
import { uploadNewStorage } from '../middleware/express-fileupload'

const router: Router = Router()

// create new incident
router.post('/', verifyJwt, uploadNewStorage.array('files'), createIncident)

// get all incidents by page
router.get('/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, listIncident)

// get all incidents
router.get('/', verifyJwt, allIncidents)

export default router
