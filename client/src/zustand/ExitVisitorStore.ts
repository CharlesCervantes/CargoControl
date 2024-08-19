import { create } from 'zustand'
import type { IVehicleVisitor, IVisitor, IVisitorExit } from '../interfaces'

const emptyVisitorState: IVisitorExit = {
  organizationId: '',
  Visitors: [],
  locationId: '',
  VehicleVisitorArray: [],
}

interface IVisitorExitState {
  ExitVisitor: IVisitorExit
  setExit: (exit: IVisitorExit) => void
  setOrganizationId: (orgId: string) => void
  setlocationId: (localId: string) => void
  setVisitor: (visitor: IVisitor) => void
  deleteVisitor2: (visitorId: string) => void
  setVehicleVisitor: (vehicleVisitor: IVehicleVisitor) => void
  resetExitVisitor: () => void
  deleteVehicleVisitor2: () => void
}

export const ExitVisitorStore = create<IVisitorExitState>(set => ({
  ExitVisitor: emptyVisitorState,
  setExit: exitComplete => set({ ExitVisitor: exitComplete }),
  setOrganizationId: organizationId => set(state => ({ ExitVisitor: { ...state.ExitVisitor, organizationId } })),
  setlocationId: locationId => set(state => ({ ExitVisitor: { ...state.ExitVisitor, locationId } })),
  setVisitor: visitor => set(state => ({ ExitVisitor: { ...state.ExitVisitor, Visitors: [...state.ExitVisitor.Visitors, visitor] } })),
  deleteVisitor2: (visitorId: string) => set(state => ({ ExitVisitor: { ...state.ExitVisitor, Visitors: state.ExitVisitor.Visitors.filter(visitor => visitor.id !== visitorId) } })),
  setVehicleVisitor: vehicle => set(state => ({ ExitVisitor: { ...state.ExitVisitor, VehicleVisitor: vehicle } })),
  resetExitVisitor: () => set({ ExitVisitor: emptyVisitorState }),
  deleteVehicleVisitor2: () => set(state => ({ ExitVisitor: { ...state.ExitVisitor, VehicleVisitor: emptyVisitorState.VehicleVisitor } })),
}))
