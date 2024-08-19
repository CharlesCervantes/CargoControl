
import { create as createPerson } from '../../../modules/Person'
import { create as createCompany } from '../../../modules/Company'
import { create as createDriver } from '../../../modules/Driver'
import type { Company, Person } from '@prisma/client'
import type { IDriver } from '../../../interfaces'

export const saveDriver = async(driverData?: IDriver, organizationId?: string) => {
  let getPerson: Person
  let getCompany: Company
  // console.log("----------------- inside saveDriver helper ----------------")

  if (!driverData?.Person)
    throw new Error('No se ha enviado informacion del conductor')
  else
    getPerson = await createPerson(driverData.Person, organizationId || '')

  if (!driverData.Company)
    throw new Error('No se ha enviado informacion de la empresa')
  else
    getCompany = await createCompany(driverData.Company, organizationId || '')

  const newDriver: IDriver = {
    organizationId: organizationId || '',
    personId: getPerson?.id,
    companyId: getCompany?.id,

  }

  // console.log(newDriver)

  const newDriverCreated = await createDriver(newDriver, organizationId || '')

  return newDriverCreated
}
