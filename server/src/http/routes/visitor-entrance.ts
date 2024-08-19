import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { uploadNewStorage } from '../middleware/express-fileupload'
import { createVisitorEnter, getAllEntranceVisitor } from '../controllers/visiotr-entrance'

const router: Router = Router()

router.post('/', verifyJwt, uploadNewStorage.array('files'), createVisitorEnter)
router.get('/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, getAllEntranceVisitor)

export default router
