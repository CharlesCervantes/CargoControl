import { create } from 'zustand'
import type { IUser } from '../interfaces'

interface IUserState {
  users: Array<IUser>
  setUsers: (users: Array<IUser>) => void
  addUser: (user: IUser) => void
  removeUser: (id: string) => void

  deleteSesionToken: (id: string) => void
}

export const userStore = create<IUserState>(set => ({
  users: [],
  setUsers: users => set({ users }),
  addUser: user =>
    set(state => ({
      users: [...state.users, user],
    })),
  removeUser: id => // Aquí definimos la función removeUser que toma un id como argumento
    set(state => ({
      users: state.users.filter(user => user.id !== id), // Filtramos los usuarios para eliminar el que tiene el id especificado
    })),
  deleteSesionToken: id => set(state => ({
    users: state.users.map((user) => {
      if (user.id === id)
        user.token = null

      return user
    }),
  })),
}))
