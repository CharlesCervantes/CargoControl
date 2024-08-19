import { Router } from 'express'
import { getOwnIpAddress } from '../controllers/network'

const router: Router = Router()

// get my ip address
router.get('/', getOwnIpAddress)

export default router
