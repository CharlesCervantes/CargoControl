import { create } from 'zustand'

interface INewtworkStore {
  network: string
  addNetwork: (network: string) => void
}

export const networkStore = create<INewtworkStore>(set => ({
  network: '',
  addNetwork: (network: string) => set({ network }),
}))
