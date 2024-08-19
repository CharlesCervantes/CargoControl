import { create } from 'zustand'
import type { IDriver, IIncident, ITrailer, IVehicle, IVisitor } from '../interfaces'

const initialState: IIncident = {
  locationId: '',
  report: '',
  subject: '',
  organizationId: '',
  Driver: [],
  Trailer: [],
  Vehicle: [],
  Visitor: [],
  VehicleVisitor: [],
}

interface IIncidentStore {
  Incident: IIncident
  resetIncident: () => void
  setLocationId: (nLocations: string) => void
  removeLocation: () => void
  //
  setReport: (nReports: string) => void
  removeReport: () => void
  //
  setSubject: (nSubjets: string) => void
  removeSubject: () => void
  //
  addDriverIncident: (nDrivers: IDriver) => void
  removeDrivers: (id: string) => void
  //
  addTrailersIncident: (nTrailers: ITrailer) => void
  removeTrailers: (id: string) => void
  //
  addVehiclesIncident: (nVehicles: IVehicle) => void
  removeVehicle: (id: string) => void
  //
  addVisitorsIncident: (nVisitors: IVisitor) => void
  removeVisitors: (id: string) => void
}

export const IncidentStore = create<IIncidentStore>(set => ({
  Incident: initialState,
  resetIncident: () => set({ Incident: initialState }),
  setLocationId: location => set(state => ({ Incident: { ...state.Incident, locationId: location } })),
  removeLocation: () => set(state => ({ ...state, Incident: { ...state.Incident, locationId: '' } })),
  //
  setReport: report => set(state => ({ ...state, Incident: { ...state.Incident, report } })),
  removeReport: () => set(state => ({ ...state, Incident: { ...state.Incident, report: '' } })),
  //
  setSubject: subject => set(state => ({ ...state, subject: { ...state.Incident, subject } })),
  removeSubject: () => set(state => ({ ...state, subject: { ...state.Incident, subject: '' } })),
  //
  addDriverIncident: driver => set(state => ({ ...state, Incident: { ...state.Incident, Driver: [...state.Incident.Driver || [], driver] } })),
  removeDrivers: id => set(state => ({ ...state, Incident: { ...state.Incident, Driver: state.Incident.Driver?.filter(driver => driver.id !== id) } })),
  //
  addTrailersIncident: trailer => set(state => ({ ...state, Incident: { ...state.Incident, Trailer: [...state.Incident.Trailer || [], trailer] } })),
  removeTrailers: id => set(state => ({ ...state, Incident: { ...state.Incident, Trailer: state.Incident.Trailer?.filter(trailer => trailer.id !== id) } })),
  //
  addVehiclesIncident: vehicle => set(state => ({ ...state, Incident: { ...state.Incident, Vehicle: [...state.Incident.Vehicle || [], vehicle] } })),
  removeVehicle: id => set(state => ({ ...state, Incident: { ...state.Incident, Vehicle: state.Incident.Vehicle?.filter(vehicle => vehicle.id !== id) } })),
  //
  addVisitorsIncident: visitor => set(state => ({ ...state, Incident: { ...state.Incident, Visitor: [...state.Incident.Visitor || [], visitor] } })),
  removeVisitors: id => set(state => ({ ...state, Incident: { ...state.Incident, Visitor: state.Incident.Visitor?.filter(visitor => visitor.id !== id) } })),
}))
