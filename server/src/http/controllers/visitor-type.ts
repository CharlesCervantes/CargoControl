import { activeAndEditVisitorType, change, create, drop, edit, getAll, getById, getByName, list } from '../../modules/Visitor-type'
import type { IVisitorType } from '../../interfaces'
import type { Request, Response } from 'express'

export const createVisitorType = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { name, description } = req.body
  const companyData: IVisitorType = {
    name,
    organizationId,
    description,
    status: true,
  }
  try {
    const searchVisitorType = await getByName(name, organizationId) // buscamos si el nombre de la compañia ya existe
    if (searchVisitorType) {
      if (searchVisitorType.status) {
        res.status(200).json({ ok: false, message: 'Ya existe un tipo de visitante con este nombre' })
      } else {
        if (!searchVisitorType.status) {
          const company = await activeAndEditVisitorType(searchVisitorType.id, companyData)
          res.status(200).json({ ok: true, message: 'Tipo de Visitante Creado Exitosamente!', data: company })
        }
      }
    } else {
      if (!searchVisitorType) {
        const newVisitorType = await create(companyData, organizationId)
        res.status(200).json({ ok: true, message: 'Tipo de Visitante creada exitosamente', data: newVisitorType })
      }
    }
  } catch (error) {
    console.log(error)
  }
  // const organizationId = res.locals.org.organizationId
  // const { name, description } = req.body

  // try {
  //   const existVisitorType = await getByName(name, organizationId)
  //   if (existVisitorType)
  //     return res.status(400).json({ ok: false, message: 'Ya existe un tipo de visitante con ese nombre' })

  //   const data: IVisitorType = {
  //     name,
  //     organizationId,
  //     description,
  //     status: true,
  //   }

  //   const newVisitorType = await create(data, organizationId)
  //   res.status(200).json({ ok: true, message: 'Tipo de visitante creado', data: newVisitorType })
  // } catch (error) {
  //   res.status(400).json({ ok: false, message: error })
  // }
}

export const getAllVisitorTypes = async(req: Request, res: Response) => {
  const { pageIndex, pageSize } = req.params
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getAll(organizationId, parseInt(pageSize), parseInt(pageIndex))
    res.status(200).json({ ok: true, data: result })
  } catch (error) {
    res.status(400).json({ ok: false, message: error })
  }
}

export const deleteVisitorType = async(req: Request, res: Response) => {
  const { id } = req.params
  const organizationId = res.locals.org.organizationId

  try {
    const searchVisitorType = await getById(id, organizationId)
    if (!searchVisitorType)
      return res.status(400).json({ ok: false, message: 'El tipo de visitante no existe' })

    const company = await drop(id)
    res.status(200).json({ ok: true, message: 'Tipo de Visitante Eliminado', data: company })
  } catch (error) {
    res.status(400).json({ ok: false, message: `${error}` })
  }
}

export const updateVisitorType = async(req: Request, res: Response) => {
  const { id, name, description, status } = req.body
  const organizationId = res.locals.org.organizationId
  const visitorTypeData: IVisitorType = {
    name,
    description,
    status,
    organizationId,
  }
  try {
    const searchVisitorType = await getByName(name, organizationId)
    if (searchVisitorType) {
      if (searchVisitorType.status) {
        if (id === searchVisitorType.id) {
          const visitorType = await edit(visitorTypeData, searchVisitorType.id)
          res.status(200).json({ ok: true, message: 'Tipo de Visitante Actualizado Correctamente', data: visitorType })
        } else {
          res.status(200).json({ ok: false, message: 'Ya Existe una Tipo de Visitante con Este Nombre' })
        }
      } else {
        if (!searchVisitorType.status) {
          const visitorType = await change(visitorTypeData, searchVisitorType.id, id)
          res.status(200).json({ ok: true, message: 'Tipo de Visitante Actualizado Correctamente', data: visitorType })
        }
      }
    } else {
      if (!searchVisitorType) {
        const visitorType = await edit(visitorTypeData, id)
        res.status(200).json({ ok: true, message: 'Tipo de Visitante Actualizado Correctamente', data: visitorType })
      }
    }
  } catch (error) {
    console.log(error)
  }
  // const { id, name, description, status } = req.body
  // const organizationId = res.locals.org.organizationId
  // try {
  //   const searchVisitorType = await getByName(name, organizationId)
  //   console.log('searchLocation')
  //   console.log(searchVisitorType)
  //   if (searchVisitorType) {
  //     const data: IVisitorType = {
  //       name,
  //       description,
  //       status,
  //       organizationId,
  //     }
  //     const location = await edit(id, data, searchVisitorType.status)
  //     res.status(200).json({ ok: true, message: 'Tipo de Visitante Actualizado Correctamente!', data: location })
  //   }
  // } catch (error) {
  //   res.status(400).json({ ok: false, message: `${error}` })
  // }
}

export const getVisitorTypeList = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await list(organizationId)
    res.status(200).json({
      ok: true,
      message: 'Tipo de visitantes optenidos correctamente',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      ok: true,
      message: 'Error al obtener los tipo de visitantes',
      data: error,
    })
  }
}
