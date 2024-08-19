// no va necesitar token
import { Router } from 'express'
import { createRole, getRoleById, getRoleByName, getRoles, saveManyRoles } from '../../modules/Role'
import type { IRole } from '../../interfaces'
import type { Request, Response } from 'express'

const router: Router = Router()

// list of roles
router.get('/list', async(req: Request, res: Response) => {
  try {
    const roles = await getRoles()
    res.status(200).json({ ok: true, roles })
  } catch (error) {
    res.status(500).json({ ok: false, msj: `Error interno ${error}` })
  }
})

// create role
router.post('/', async(req: Request, res: Response) => {
  const { name } = req.body
  try {
    const existRole = await getRoleByName(name)
    if (existRole)
      return res.status(400).json({ ok: false, msj: 'El rol ya existe' })
    const data: IRole = {
      name,
    }
    const newRole = await createRole(data)
    res.status(200).json({ ok: true, data: newRole })
  } catch (error) {
    res.status(500).json({ ok: false, msj: `Error interno ${error}` })
  }
})

// list of roles
router.get('/', async(req: Request, res: Response) => {
  try {
    const roles = await getRoles()
    res.status(200).json({ ok: true, roles })
  } catch (error) {
    res.status(500).json({ ok: false, msj: `Error interno ${error}` })
  }
})

// get role by id
router.get('/:id', async(req: Request, res: Response) => {
  try {
    const role = await getRoleById(req.params.id)
    res.json(role)
  } catch (error) {
    res.status(500).json({ ok: false, msj: `Error interno ${error}` })
  }
})

// initial roles
router.get('/init/roles', async(req: Request, res: Response) => {
  try {
    const roles: Array<IRole> = [
      { name: 'admin' },
      { name: 'user' },
    ]

    const createRoles = await saveManyRoles(roles)

    res.json(createRoles)
  } catch (e) {
    console.log('Error al crear los roles inciales')
    console.log(e)

    res.json({ ok: false, error: e })
  }
})

export default router
