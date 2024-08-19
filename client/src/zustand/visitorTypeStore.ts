import { create } from 'zustand'
import type { IVisitorType } from '../interfaces'

interface IVisitorTypeState {
  visitorTypes: Array<IVisitorType>
  setVisitorTypes: (types: Array<IVisitorType>) => void
  addVisitorType: (visitorType: IVisitorType) => void
  getVisitorType: (id: string) => IVisitorType | undefined
  resetVisitorType: () => void
}

export const visitorTypeStore = create<IVisitorTypeState>(set => ({
  visitorTypes: [],
  setVisitorTypes: types => set({ visitorTypes: types }),
  addVisitorType: (visitorType: IVisitorType) => {
    set(state => ({ visitorTypes: [...state.visitorTypes, visitorType] }))
  },
  getVisitorType: (id: string) => {
    const state: any = visitorTypeStore.getState()
    const response = state.visitorTypes.find((type: IVisitorType) => type.id === id)
    return response
  },
  resetVisitorType: () => set({ visitorTypes: [] }),
}))
