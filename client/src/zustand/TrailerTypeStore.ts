import { create } from 'zustand'
import type { IVehicleType } from '../interfaces'

interface ITrailerTypeState {
  trailerTypes: Array<IVehicleType>
  setTrailerTypes: (trailerTypes: Array<IVehicleType>) => void
  addTrailerTypes: (trailerType: IVehicleType) => void
  resetTrailerTypes: () => void
  fetchControl: Boolean
  setFetchControl: (control: Boolean) => void
}

export const trailerTypeStore = create<ITrailerTypeState>(
  set => ({
    trailerTypes: [],
    fetchControl: false,
    setFetchControl: control => set({ fetchControl: control }),
    setTrailerTypes: trailerType => set({ trailerTypes: trailerType }),
    addTrailerTypes: (trailerType: IVehicleType) => {
      set(state => ({ trailerTypes: [...state.trailerTypes, trailerType] }))
    },
    resetTrailerTypes: () => set({ trailerTypes: [] }),
  }))
