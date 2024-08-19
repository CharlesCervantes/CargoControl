import { create } from 'zustand'
import type { IResponse } from '../interfaces'

export interface IResponsesMajorState {
  responses: Array<IResponse>
  setMajorResponses: (responses: Array<IResponse>) => void
  addMajorResponse: (response: IResponse) => void
  deleteMajorResponse: (response: IResponse) => void
  resetMajorResponses: () => void
  changeMajorResponses: (response: Array<IResponse>) => void
  getMajorResponses: () => Array<IResponse>
}

export const responsesMajorStore = create<IResponsesMajorState>((set, get) => ({
  responses: [],
  setMajorResponses: data => set({ responses: data }),
  addMajorResponse: (response) => {
    set(state => ({
      responses: [...state.responses, response],
    }))
  },
  deleteMajorResponse: (response) => {
    set((state) => {
      const updatedResponses = state.responses.filter(r => r.id !== response.id)
      return { responses: updatedResponses }
    })
  },
  resetMajorResponses: () => {
    set({ responses: [] })
  },
  changeMajorResponses: (responses: Array<IResponse>) => {
    set({ responses })
  },
  getMajorResponses: () => {
    return get().responses
  },
}))
