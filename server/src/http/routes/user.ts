import { Router } from 'express'
import { closeUserSession, createUser, deleteTokenUser, deleteUser, getUserByToken, getUsersActive, updatePassword, updateToken } from '../controllers/user'
import { verifyJwt } from '../middleware/verifyJwt'

const router: Router = Router()

// create new user
router.post('/', verifyJwt, createUser)

// read all user
router.get('/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, getUsersActive)

// get user by token
router.get('/:token', getUserByToken)

// delete user
router.patch('/:id', deleteUser)

// updateUser
router.patch('/update/:id', verifyJwt, updatePassword)

// update user token
router.patch('/token/:id', updateToken)

// delete user token
// router.delete('/eraseToken', verifyJwt, deleteTokenUser)

router.post('/eraseToken/', verifyJwt, deleteTokenUser)

router.patch('/close-session/:id', closeUserSession)

export default router
