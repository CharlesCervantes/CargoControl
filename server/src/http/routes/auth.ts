import { Router } from 'express'
import { logIn, resetSession, signUpDemo } from '../controllers/auth'

const router: Router = Router()

// login
router.post('/login', logIn)

// signup demo
router.post('/signup', signUpDemo)

router.post('/resetSession', resetSession)

export default router
