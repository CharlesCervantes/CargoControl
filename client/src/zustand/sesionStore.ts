import { create } from 'zustand'
import type { IUser } from '../interfaces'

const emptyUser: IUser = {
  email: '',
  lastname: '',
  name: '',
  password: '',
  roleId: '',
  username: '',

}

interface ISesionStore {
  user: IUser
  sessionToken: string
  setSessionToken: (token: string) => void
  setUser: (user: IUser) => void
}

export const sesionStore = create<ISesionStore>(set => ({
  user: emptyUser,
  // sessionToken: '',
  setUser: newUser => set({ user: newUser }),
  // setSessionToken: token => set({ sessionToken: token }),
}))
