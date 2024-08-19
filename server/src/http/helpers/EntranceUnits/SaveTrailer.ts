import { create as createCompany } from '../../../modules/Company'
import { create as createTrailer } from '../../../modules/Trailer'
import type { Company, Trailer } from '@prisma/client'
import type { ITrailer } from '../../../interfaces'

export const saveTrailer = async(trailerData?: Array<ITrailer>, organizationId?: string, locationID?: string) => {
  const Trailers: Array<Trailer> = []

  // console.log(' ')
  // console.log('---------------- function save trailer -------------------')
  // console.log('trailer params: ')
  // console.log(trailerData.length)

  if (trailerData && trailerData.length < 1) {
    return Trailers
  } else {
    // console.log("I worked")

    for (const trailer of trailerData || []) {
      let getCompany: Company

      // console.log("I Have inside the trailers loop")
      // console.log("trailer:")
      // console.log(trailer)

      if (!trailer.Company)
        throw new Error('No se ha enviado informacion de la empresa')
      else
        getCompany = await createCompany(trailer.Company, organizationId || '')

      // console.log("Company info:")
      // console.log(getCompany)

      const newTrailer: ITrailer = {
        companyId: getCompany.id,
        isInside: true,
        organizationId: organizationId || '',
        trailerTypeId: trailer.trailerTypeId,
        locationId: locationID || '',
        number: trailer.number,
        plate: trailer.plate,
        seal: trailer.seal,
        vin: trailer.vin,
      }

      const newCreatedTrailer = await createTrailer(newTrailer, organizationId || '')

      Trailers.push(newCreatedTrailer)

      // console.log("")
      // console.log("Trailer created or pushed:")
      // console.log(Trailers)
    }

    // console.log("Final section")
    // console.log(Trailers)

    return Trailers
  }
}
