import { create } from 'zustand'
import type { IVehicle } from '../interfaces'

interface IVehicleStore {
  Vehicle: Array<IVehicle>
  Vehicles: Array<IVehicle>

  setVehicle: (vehicle: Array<IVehicle>) => void
  setVehicles: (vehicle: Array<IVehicle>) => void

  addVehicle: (vehicle: IVehicle) => void

  resetVehicle: () => void
  resetVehicles: () => void
}

export const vehicleStore = create<IVehicleStore>(
  set => ({
    Vehicle: [],
    Vehicles: [],

    setVehicle: vehicle => set({ Vehicle: vehicle }),
    setVehicles: vehicles => set({ Vehicles: vehicles }),

    addVehicle: (vehicle: IVehicle) => {
      set(state => ({ Vehicle: [...state.Vehicle, vehicle] }))
    },

    resetVehicle: () => set({ Vehicle: [] }),
    resetVehicles: () => set({ Vehicles: [] }),
  }),
)
