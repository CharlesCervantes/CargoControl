import { create } from 'zustand'
import type { ITrailer } from '../interfaces'

interface ITrailerStore {
  Trailer: Array<ITrailer>
  setTrailer: (trailer: Array<ITrailer>) => void
  addTrailer: (trailer: ITrailer) => void
  resetTrailer: () => void
}

export const trailerStore = create<ITrailerStore>(
  set => ({
    Trailer: [],
    setTrailer: trailer => set({ Trailer: trailer }),
    addTrailer: (trailer: ITrailer) => {
      set(state => ({ Trailer: [...state.Trailer, trailer] }))
    },
    resetTrailer: () => set({ Trailer: [] }),
  }),
)
