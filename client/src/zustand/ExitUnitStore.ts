import { create } from 'zustand'
import type { IChecklist, IDriver, IExitUnits, ITrailer, IVehicle, IVisitor } from '../interfaces'

const emptyInitalState: IExitUnits = {
  entranceUnitId: '',
  organizationId: '',
  locationId: '',
  vehicleId: '',
  Vehicle: {
    companyId: '',
    isInside: false,
    organizationId: '',
    plate: '',
    unitNumber: '',
    vehicleTypeId: '',
  },
  Trailer: [],
  driverId: '',
  visitorId: '',
}

interface IExitUnitStore {
  ExitUnit: IExitUnits

  setDriver: (newDriver: IDriver) => void
  setIdDriver: (newIdDriver: string) => void
  removeDriver2: () => void

  setVisitor: (newVisitor: IVisitor) => void
  setIdVisitor: (newIdVisitor: string) => void
  removeVisitor2: () => void

  setVehicle: (newVehicle: IVehicle) => void
  setIdVehicle: (newIdVehicle: string) => void
  removeVehicle2: () => void

  addTrailer: (newTrailer: ITrailer) => void
  removeTrailer2: (trailerId: string) => void

  setLocationID: (id: string) => void
  resetExitUnit: () => void

  addChecklistVechicle: (newCheklist: IChecklist) => void
  addCheklistToTrailer: (trailerIndex: number, newCheklist: IChecklist) => void
}
export const ExitUnitStore = create<IExitUnitStore>(set => ({
  ExitUnit: emptyInitalState,

  setDriver: newDriver => set(state => ({ ExitUnit: { ...state.ExitUnit, Driver: newDriver } })),
  setIdDriver: newIdDriver => set(state => ({ ExitUnit: { ...state.ExitUnit, driverId: newIdDriver } })),

  setVisitor: newVisitor => set(state => ({ ExitUnit: { ...state.ExitUnit, Visitor: newVisitor } })),
  setIdVisitor: newIdVisitor => set(state => ({ ExitUnit: { ...state.ExitUnit, driverId: newIdVisitor } })),

  setVehicle: newVheicle => set(state => ({ ExitUnit: { ...state.ExitUnit, Vehicle: newVheicle } })),
  setIdVehicle: newIdVehicle => set(state => ({ ExitUnit: { ...state.ExitUnit, vehicleId: newIdVehicle } })),

  addTrailer: newTrailer => set(state => ({ ExitUnit: { ...state.ExitUnit, Trailer: [...state.ExitUnit.Trailer || [], newTrailer] } })),
  removeTrailer: trailerId => set(state => ({ ExitUnit: { ...state.ExitUnit, Trailer: state.ExitUnit.Trailer?.filter(trailer => trailer.id !== trailerId) } })),

  setLocationID: id => set(state => ({ ExitUnit: { ...state.ExitUnit, locationId: id } })),
  resetExitUnit: () => set({ ExitUnit: emptyInitalState }),

  removeDriver2: () => set(state => ({ ExitUnit: { ...state.ExitUnit, Driver: emptyInitalState.Driver } })),
  removeVisitor2: () => set(state => ({ ExitUnit: { ...state.ExitUnit, Visitor: emptyInitalState.Visitor } })),
  removeVehicle2: () => set(state => ({ ExitUnit: { ...state.ExitUnit, Vehicle: emptyInitalState.Vehicle } })),
  removeTrailer2: trailerId => set(state => ({
    ExitUnit: {
      ...state.ExitUnit,
      Trailer: state.ExitUnit.Trailer?.filter(trailer => trailer.id !== trailerId) ?? [],
    },
  })),

  addChecklistVechicle: newCheklist => set((state) => {
    const updateExit = { ...state.ExitUnit }
    const vehicleUpdate = { ...updateExit.Vehicle }

    vehicleUpdate.Checklist = [newCheklist]
    updateExit.Vehicle = vehicleUpdate

    return { ExitUnit: updateExit }
  }),

  addCheklistToTrailer: (trailerIndex, newChecklist) => set((state) => {
    const updateExit = { ...state.ExitUnit }

    const updatedTrailers = [...(updateExit.Trailer || [])] // Copiar la matriz de remolques
    const updateTrailer = updatedTrailers[trailerIndex] // Obtener el remolque en el índice dado

    if (updateTrailer) {
    // Si se encontró el remolque en el índice dado
      updateTrailer.Checklist = [newChecklist] // Agregar la lista de verificación al remolque

      // Actualizar la matriz de remolques con el remolque modificado
      updatedTrailers[trailerIndex] = updateTrailer

      // Actualizar la propiedad Trailer en ExitUnit con la nueva matriz de remolques
      updateExit.Trailer = updatedTrailers

      return { ExitUnit: updateExit }
    }

    // Agregar un valor de retorno predeterminado
    return { ExitUnit: state.ExitUnit }
  }),

}))
