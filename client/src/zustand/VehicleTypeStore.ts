import { create } from 'zustand'
import type { IVehicleType, VehicleTypeEntity } from '../interfaces'

interface IVehicleTypeState {
  vehicleTypes: Array<VehicleTypeEntity>
  realVehicleTypes: Array<IVehicleType>
  fetchControl: Boolean
  setFetchControl: (control: Boolean) => void
  setVehicleTypes: (vehicleTypes: Array<VehicleTypeEntity>) => void
  setRealVehicleTypes: (data: Array<IVehicleType>) => void
  addVehicleType: (vehicleType: VehicleTypeEntity) => void
  addRealVehicleType: (data: IVehicleType) => void
  resetVehicleType: () => void
  resetRealVehicleType: () => void

}

export const vehicleTypeStore = create<IVehicleTypeState>(
  set => ({
    vehicleTypes: [],
    realVehicleTypes: [],
    fetchControl: false,
    setFetchControl: control => set({ fetchControl: control }),
    setVehicleTypes: vehicleType => set({ vehicleTypes: vehicleType }),
    setRealVehicleTypes: (data: Array<IVehicleType>) => set({ realVehicleTypes: data }),
    addVehicleType: (vehicleType: VehicleTypeEntity) => {
      set(state => ({ vehicleTypes: [...state.vehicleTypes, vehicleType] }))
    },
    addRealVehicleType: data => set(state => ({ realVehicleTypes: [...state.realVehicleTypes, data] })),
    resetVehicleType: () => set({ vehicleTypes: [] }),
    resetRealVehicleType: () => set({ realVehicleTypes: [] }),
  }),
)
