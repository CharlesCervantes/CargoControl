import { create } from 'zustand'
import type { ILocation } from '../interfaces'

const emptyLocation: ILocation = {
  id: 'notFound',
  name: 'Sin localizacion',
  capacity: 0,
  organizationId: '',
  status: false,
}
interface ILocationState {
  locations: Array<ILocation> | []
  setLocations: (locations: Array<ILocation>) => void
  addLocation: (location: ILocation) => void
  deviceLocation: ILocation
  setDeviceLocation: (location: ILocation) => void
  deleteDeviceLocation: () => void

  deleteLocation: (id: string) => void
  updateLocation: (location: ILocation) => void
}

export const locationStore = create<ILocationState>(set => ({
  locations: [],
  setLocations: location => set({ locations: location }),
  addLocation: (location: ILocation) => {
    set(state => ({ locations: [...state.locations, location] }))
  },
  deviceLocation: emptyLocation,
  setDeviceLocation: location => set({ deviceLocation: location }),
  deleteDeviceLocation: () => set({ deviceLocation: emptyLocation }),

  deleteLocation: id => set(state => ({ locations: state.locations.filter(location => location.id !== id) })),
  updateLocation: newLocation => set(state => ({
    locations: state.locations.map((oldLocation) => {
      if (oldLocation.id === newLocation.id)
        return newLocation
      else
        return oldLocation
    }),
  })),
}))
