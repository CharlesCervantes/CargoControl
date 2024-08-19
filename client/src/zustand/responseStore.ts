import { create } from 'zustand'
import type { IResponse } from '../interfaces'

export interface IResponseState {
  responses: Array<IResponse>
  setResponses: (responses: Array<IResponse>) => void
  addResponse: (response: IResponse) => void
  deleteResponse: (response: IResponse) => void
  resetResponses: () => void
  changeResponses: (response: Array<IResponse>) => void
  getResponses: () => Array<IResponse>
}

export const responseStore = create<IResponseState>((set, get) => ({
  responses: [],
  setResponses: data => set({ responses: data }),
  addResponse: (response) => {
    set(state => ({
      responses: [...state.responses, response],
    }))
  },
  deleteResponse: (response) => {
    set((state) => {
      const updatedResponses = state.responses.filter(r => r.id !== response.id)
      return { responses: updatedResponses }
    })
  },
  resetResponses: () => {
    set({ responses: [] })
  },
  changeResponses: (responses: Array<IResponse>) => {
    set({ responses })
  },
  getResponses: () => {
    return get().responses
  },
}))
