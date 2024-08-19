import { create } from 'zustand'
import type { IVisitor } from '../interfaces'

interface IVisitorStore {
  visitors: Array<IVisitor>
  setVisitors: (visitors: Array<IVisitor>) => void
  addVisitor: (visitor: IVisitor) => void
  resetVisitor: () => void
}

export const visitorStore = create<IVisitorStore>(set => ({
  visitors: [],
  setVisitors: visitor => set({ visitors: visitor }),
  resetVisitor: () => set({ visitors: [] }),
  addVisitor: (visitor: IVisitor) => {
    set(state => ({ visitors: [...state.visitors, visitor] }))
  },
}))
