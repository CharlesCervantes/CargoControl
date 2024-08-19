import { create } from 'zustand'
import type { IChecklist } from '../interfaces'

interface IChecklistState {
  Checklists: Array<IChecklist>
  setChecklist: (checklists: Array<IChecklist>) => void
  addChecklist: (checklist: IChecklist) => void
  updateChecklist: (checklist: IChecklist) => void
  deleteChecklist: (checklist: IChecklist) => void
  getChecklists: () => Array<IChecklist>
}

export const ChecklistStore = create<IChecklistState>(
  (set, get) => ({
    Checklists: [],
    setChecklist: checklist => set({ Checklists: checklist }),
    addChecklist: (checklist: IChecklist) => {
      set(state => ({ Checklists: [...state.Checklists, checklist] }))
    },
    updateChecklist: (updatedChecklist: IChecklist) => {
      set(state => ({
        Checklists: state.Checklists.map(checklist =>
          checklist.id === updatedChecklist.id ? updatedChecklist : checklist,
        ),
      }))
    },
    deleteChecklist: (deletedChecklist: IChecklist) => {
      set(state => ({
        Checklists: state.Checklists.filter(checklist =>
          checklist.id !== deletedChecklist.id),
      }))
    },
    getChecklists: (): Array<IChecklist> => {
      return get().Checklists
    },
  }),
)
