import { updateStatus } from '../../../modules/Vehicle-visitor'

export const updateVehicleVisitorStatusHelper = async(id: string) => {
  const updateVehicle = await updateStatus(id, false)
  console.log('Vehiculo actualizado -----------------')
  console.log(updateVehicle)
}
