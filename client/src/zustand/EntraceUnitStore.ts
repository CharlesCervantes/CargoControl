import { create } from 'zustand'
import type { IChecklist, IDriver, IEntranceUnits, ITrailer, IVehicle, IVisitor } from '../interfaces'

const emptyInitialState: IEntranceUnits = {
  organizationId: '',
  Driver: {
    organizationId: '',
    identification: undefined,
  },
  Vehicle: {
    plate: '',
    companyId: '',
    unitNumber: '',
    vehicleTypeId: '',
    isInside: false,
    organizationId: '',
  },
  locationId: '',
  Trailer: [],
  visitorId: '',
}

interface IEntranceUnitsState {
  entrance: IEntranceUnits

  setDriver: (driver: IDriver) => void
  removeDriver: () => void

  setVisitor: (visitor: IVisitor) => void
  removeVisitor: () => void

  setVehicle: (vehicle: IVehicle) => void
  removeVehicle: () => void
  setVehicleCheklist: (newCheklist: IChecklist) => void

  addTrailer: (trailer: ITrailer) => void
  removeTrailer: (id: string) => void
  setTraileCheklist: (newCheklist: IChecklist, trailerId: string) => void

  setLocationID: (id: string) => void
  resetEntrance: () => void
}

export const EntranceUnitStore = create<IEntranceUnitsState>(set => ({
  entrance: emptyInitialState,

  setDriver: newDriver => set(state => ({ entrance: { ...state.entrance, Driver: newDriver } })),
  removeDriver: () => set(state => ({ entrance: { ...state.entrance, Driver: emptyInitialState.Driver } })),

  setVisitor: newVisitor => set(state => ({ entrance: { ...state.entrance, Visitor: newVisitor } })),
  removeVisitor: () => set(state => ({ entrance: { ...state.entrance, Visitor: emptyInitialState.Visitor } })),

  setVehicle: newVehicle => set(state => ({
    entrance: {
      ...state.entrance,
      Vehicle: newVehicle,
    },
  })),
  removeVehicle: () => set(state => ({ entrance: { ...state.entrance, Vehicle: emptyInitialState.Vehicle } })),
  setVehicleCheklist: newCheklist => set((state) => {
    const updateEntrance = { ...state.entrance }
    const vehicleUpdate = { ...updateEntrance.Vehicle }

    vehicleUpdate.Checklist = [newCheklist]
    updateEntrance.Vehicle = vehicleUpdate

    return { entrance: updateEntrance }
  }),

  addTrailer: newTrailer => set(state => ({ entrance: { ...state.entrance, Trailer: [...state.entrance.Trailer ?? [], newTrailer] } })),
  removeTrailer: trailerId => set(state => ({
    entrance: {
      ...state.entrance,
      Trailer: state.entrance.Trailer?.filter(trailer => trailer.id !== trailerId) ?? [],
    },
  })),
  setTraileCheklist: (newChecklist: IChecklist, trailerId: string) => set((state) => {
  // Copia el estado actual
    const updatedEntrance = { ...state.entrance }

    // Comprueba si updatedEntrance.Trailer es undefined
    if (updatedEntrance.Trailer !== undefined) {
    // Encuentra el trailer al que deseas asignar el Checklist
      const trailerIndex = updatedEntrance.Trailer.findIndex(trailer => trailer.id === trailerId)

      if (trailerIndex !== -1) {
      // Clona el Trailer y asigna el nuevo Checklist
        const updatedTrailer = { ...updatedEntrance.Trailer[trailerIndex] }
        updatedTrailer.Checklist = [newChecklist] // Puedes sobrescribir el array Checklist o concatenar nuevos elementos según tus necesidades.

        // Actualiza el Trailer en el array de Trailer
        updatedEntrance.Trailer[trailerIndex] = updatedTrailer

        // Actualiza el estado completo con el nuevo Trailer
        return { entrance: updatedEntrance }
      }
    }

    // Si el trailer no se encuentra o updatedEntrance.Trailer es undefined, simplemente devuelve el estado actual sin cambios.
    return state
  }),

  setLocationID: id => set(state => ({ entrance: { ...state.entrance, locationId: id } })),

  resetEntrance: () => set({ entrance: emptyInitialState }),
}))
