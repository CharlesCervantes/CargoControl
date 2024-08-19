import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import { createCompany, deleteCompany, getCompanies, updateCompany } from '../controllers/companies'

const router: Router = Router()

// create company ✔
router.post('/', verifyJwt, createCompany)

// get companies ✔
router.get('/pageSize/:pageSize/pageIndex/:pageIndex', verifyJwt, getCompanies)

// update companies
router.patch('/:id', verifyJwt, updateCompany)

// delete compani
router.patch('/delete/:id', verifyJwt, deleteCompany)
export default router
