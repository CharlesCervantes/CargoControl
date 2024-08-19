import { create } from 'zustand'
import type { IVehicleVisitor } from '../interfaces'

interface IVehicleVisitorStore {
  vehicleVisitor: IVehicleVisitor | null
  setVehicleVisitor: (vehicleVisitor: IVehicleVisitor) => void
  resetVehicleVisitor: () => void
  vehicleVisitors: Array<IVehicleVisitor>
  setVehicleVisitors: (vehicleVisitorList: Array<IVehicleVisitor>) => void
}

export const useVehicleVisitorStore = create<IVehicleVisitorStore>(set => ({
  vehicleVisitor: null,
  setVehicleVisitor: (vehicleVisitor: IVehicleVisitor) => set({ vehicleVisitor }),
  resetVehicleVisitor: () => set({ vehicleVisitor: null }),
  vehicleVisitors: [],
  setVehicleVisitors: data => set({ vehicleVisitors: data }),
}),
)
