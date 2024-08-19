import { create } from 'zustand'
import type { IVehicleVisitor, IVisitor, IVisitorEntrance } from '../interfaces'

const emptyVisitorEntrance: IVisitorEntrance = {
  locationId: '',
  organizationId: '',
  Visitors: [],
  // VehicleVisitor: {
  //   id: '',
  //   plates: '',
  //   model: '',
  //   color: '',
  //   brand: '',
  //   isInside: true,
  //   organizationId: '',
  // },
  VehicleVisitorArray: [],
}

interface IVisitorEnterStore {
  entrance: IVisitorEntrance
  setLocationId: (locationId: string) => void
  setVisitor: (visitor: IVisitor) => void
  editVisitor: (visitor: IVisitor) => void
  deleteVisitor: (visitorId: string) => void
  setVehicleVisitor: (vehicleVisitor: IVehicleVisitor) => void
  editVehicleVisitor: (vehicleVisitor: IVehicleVisitor) => void
  deleteVehicleVisitor: () => void
}

export const useVisitorEnterStore = create<IVisitorEnterStore>(set => ({
  entrance: emptyVisitorEntrance,
  setLocationId: (locationId: string) => set({ entrance: { ...emptyVisitorEntrance, locationId } }),
  setVisitor: (visitor: IVisitor) => set(state => ({ entrance: { ...state.entrance, Visitors: [...state.entrance.Visitors, visitor] } })),
  editVisitor: (visitor: IVisitor) => set(state => ({ entrance: { ...state.entrance, Visitors: state.entrance.Visitors.map(v => v.id === visitor.id ? visitor : v) } })),
  deleteVisitor: (visitorId: string) => set(state => ({ entrance: { ...state.entrance, Visitors: state.entrance.Visitors.filter(visitor => visitor.id !== visitorId) } })),
  setVehicleVisitor: (vehicleVisitor: IVehicleVisitor) => set(state => ({ entrance: { ...state.entrance, VehicleVisitor: vehicleVisitor } })),
  editVehicleVisitor: (vehicleVisitor: IVehicleVisitor) => set(state => ({ entrance: { ...state.entrance, VehicleVisitor: vehicleVisitor } })),
  deleteVehicleVisitor: () => set(state => ({ entrance: { ...state.entrance, VehicleVisitor: emptyVisitorEntrance.VehicleVisitor } })),
}))
