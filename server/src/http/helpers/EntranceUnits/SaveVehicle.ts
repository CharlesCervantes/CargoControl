import { create as createCompany } from '../../../modules/Company'
import { create as createVehicle } from '../../../modules/Vehicle'
import type { Company } from '@prisma/client'
import type { IVehicle } from '../../../interfaces'

export const saveVehicle = async(vehicleData?: IVehicle, organizationId?: string, locationID?: string) => {
  let getCompany: Company
  console.log('InSaveVehicle:', vehicleData, 'LocationID:', locationID)
  if (!vehicleData?.Company)
    throw new Error('No se ha enviado informacion de la empresa')
  else
    getCompany = await createCompany(vehicleData.Company, organizationId || '')
  console.log('Pase CreateCompany:', getCompany)

  const newVehicle: IVehicle = {
    organizationId: organizationId || '',
    companyId: getCompany.id,
    isInside: vehicleData.isInside,
    plate: vehicleData.plate,
    unitNumber: vehicleData.unitNumber,
    vehicleTypeId: vehicleData.vehicleTypeId,
    vin: vehicleData.vin,
    locationId: locationID || '',
    seal: vehicleData.seal,
  }

  const newVehicleCreated = await createVehicle(newVehicle, organizationId || '')
  console.log('Pase CreateVehicle:', newVehicleCreated)

  return newVehicleCreated
}
