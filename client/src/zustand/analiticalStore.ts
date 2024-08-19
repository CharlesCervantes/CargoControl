import { create } from 'zustand'
import type { IDriver, IIncident, ILocation, ITrailer, IVehicle, IVisitor } from '../interfaces'

interface IAnaliticsStore {
  driversInside: Array<IDriver>
  visitorsInside: Array<IVisitor>
  vehicleInside: Array<IVehicle>
  trailerInside: Array<ITrailer>
  incidentsInside: Array<IIncident>
  setDriversInside: (nDrivers: IDriver) => void
  setVisitorsInside: (nVisitors: IVisitor) => void
  setVehiclesInside: (nVehicles: IVehicle) => void
  setTrailersInside: (nTrailers: ITrailer) => void
  setIncidentsInside: (nIncidents: IIncident) => void
}

export const analiticStore = create<IAnaliticsStore>(set => ({
  driversInside: [],
  visitorsInside: [],
  vehicleInside: [],
  trailerInside: [],
  incidentsInside: [],
  setDriversInside: nDrivers => set({ driversInside: nDrivers }),
  setVisitorsInside: nVisitors => set({ visitorsInside: nVisitors }),
  setVehiclesInside: nVehicles => set({ vehicleInside: nVehicles }),
  setTrailersInside: nTrailers => set({ trailerInside: nTrailers }),
  setIncidentsInside: nIncidents => set({ incidentsInside: nIncidents }),
}))
