import { Router } from 'express'
import { createVisitorType, deleteVisitorType, getAllVisitorTypes, getVisitorTypeList, updateVisitorType } from '../controllers/visitor-type'
import { verifyJwt } from '../middleware/verifyJwt'

const router: Router = Router()

// actualizado
router.get('/', verifyJwt, getVisitorTypeList)

router.post('/', verifyJwt, createVisitorType)

router.get('/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, getAllVisitorTypes)

router.patch('/:id', verifyJwt, deleteVisitorType)

router.patch('/', verifyJwt, updateVisitorType)

export default router
