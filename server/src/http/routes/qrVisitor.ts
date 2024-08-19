import { Router } from 'express'
import { createPreEntranceVisitor, getAllQrVisitor } from '../controllers/qrVisitor'

const router: Router = Router()

// list
router.get('/', getAllQrVisitor)

// create
router.post('/', createPreEntranceVisitor)

export default router
