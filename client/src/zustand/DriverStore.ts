import { create } from 'zustand'
import type { IDriver } from '../interfaces'

interface IDriverState {
  drivers: Array<IDriver>
  setDrivers: (drivers: Array<IDriver>) => void
  addDriver: (drivers: IDriver) => void
  resetDrivers: () => void
}

export const driverStore = create<IDriverState>(set => ({
  drivers: [],
  setDrivers: driver => set({ drivers: driver }),
  addDriver: (driver: IDriver) => {
    set(state => ({ drivers: [...state.drivers, driver] }))
  },
  resetDrivers: () => set({ drivers: [] }),
}))
