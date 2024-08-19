import { create as createVehicle } from '../../../modules/Vehicle-visitor'
import type { IVehicleVisitor } from '../../../interfaces'

export const SaveVehicleVisitor = async(organizationId: string, vehicleVisitor?: IVehicleVisitor) => {
  if (!vehicleVisitor) {
    return undefined
  } else {
    const newVehicleVisitor = await createVehicle(vehicleVisitor, organizationId)
    return newVehicleVisitor
  }
}
