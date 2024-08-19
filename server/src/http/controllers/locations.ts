import { activeAndEditLocation, change, create, edit, erase, getAll, getByName, getEveryLocation } from '../../modules/Locations'
import type { ILocation } from '../../interfaces'
import type { Request, Response } from 'express'

export const createLocation = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  const { name, capacity, status } = req.body
  const companyData: ILocation = {
    name,
    capacity,
    status,
    organizationId,
  }
  try {
    const searchLocation = await getByName(name, organizationId) // buscamos si el nombre de la compañia ya existe
    if (searchLocation) {
      if (searchLocation.status) {
        res.status(200).json({ ok: false, message: 'Ya existe una localizacion con este nombre' })
      } else {
        if (!searchLocation.status) {
          const company = await activeAndEditLocation(searchLocation.id, companyData)
          res.status(200).json({ ok: true, message: 'Localizacion Creada Exitosamente!', data: company })
        }
      }
    } else {
      if (!searchLocation) {
        const newLocation = await create(companyData, organizationId)
        res.status(200).json({ ok: true, message: 'Localizacion creada exitosamente', data: newLocation })
      }
    }
  } catch (error) {
    console.log(error)
  }
  // const organizationId = res.locals.org.organizationId
  // const { name, capacity, status } = req.body
  // try {
  //   const searchLocation = await getByName(name, organizationId)
  //   if (searchLocation)
  //     return res.status(400).json({ ok: false, message: 'Ya existe una localizacion con el mismo nombre' })

  //   const data: ILocation = {
  //     name,
  //     capacity,
  //     status,
  //     organizationId,
  //   }

  //   const newLocation = await create(data, organizationId)
  //   res.status(200).json({ ok: true, message: 'location created', data: newLocation })
  // } catch (error) {
  //   res.status(400).json({ ok: false, message: `${error}` })
  // }
}

// Get all locations to Table
export const getLocations = async(req: Request, res: Response) => {
  const { pageSize, pageIndex } = req.params
  const organizationId = res.locals.org.organizationId
  try {
    const locations = await getAll(organizationId, parseInt(pageSize), parseInt(pageIndex))
    res.status(200).json({ ok: true, message: 'locations found', data: locations })
  } catch (error) {
    res.status(400).json({ ok: false, message: `${error}` })
  }
}

export const updateLocation = async(req: Request, res: Response) => {
  const { id } = req.params
  const { name, capacity, status } = req.body
  const organizationId = res.locals.org.organizationId
  const locationData: ILocation = {
    name,
    capacity,
    status,
    organizationId,
  }
  try {
    const searchLocation = await getByName(name, organizationId)
    if (searchLocation) {
      if (searchLocation.status) {
        if (id === searchLocation.id) {
          const company = await edit(locationData, searchLocation.id)
          res.status(200).json({ ok: true, message: 'Localizacion actualizada exitosamente', data: company })
        } else {
          res.status(200).json({ ok: false, message: 'Ya Existe una Localizacion con Este Nombre' })
        }
      } else {
        if (!searchLocation.status) {
          const company = await change(locationData, searchLocation.id, id)
          res.status(200).json({ ok: true, message: 'Localizacion actualizada exitosamente', data: company })
        }
      }
    } else {
      if (!searchLocation) {
        const company = await edit(locationData, id)
        res.status(200).json({ ok: true, message: 'Localizacion actualizada exitosamente', data: company })
      }
    }
  } catch (error) {
    console.log(error)
  }
  // const id = req.params.id
  // const { name, capacity, status } = req.body
  // const organizationId = res.locals.org.organizationId
  // console.log('mylogs')
  // console.log(name, capacity, status, organizationId)
  // try {
  //   const searchLocation = await getByName(name, organizationId)
  //   console.log('searchLocation')
  //   console.log(searchLocation)
  //   if (searchLocation) {
  //     const data: ILocation = {
  //       name,
  //       capacity,
  //       status,
  //       organizationId,
  //     }
  //     const location = await edit(id, data, searchLocation.status)
  //     res.status(200).json({ ok: true, message: 'Localizacion Actualizada Correctamente!', data: location })
  //   }
  // } catch (error) {
  //   res.status(400).json({ ok: false, message: `${error}` })
  // }
}

export const deleteLocation = async(req: Request, res: Response) => {
  const id = req.params.id
  try {
    const deleteLocation = await erase(id)
    res.status(200).json({ ok: true, message: 'Localizacion eliminada!', data: deleteLocation })
  } catch (error) {
    res.status(400).json({ ok: false, message: `${error}` })
  }
}

export const getAllLocations = async(req: Request, res: Response) => {
  const organizationId = res.locals.org.organizationId
  try {
    const result = await getEveryLocation(organizationId)
    res.status(200).json({ ok: true, data: result, message: 'Localizaciones optenidas correctamente' })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: `Error en la peticion: ${error}`,
      data: error,
    })
  }
}
