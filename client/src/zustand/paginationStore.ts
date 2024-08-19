import { create } from 'zustand'
// import type { IDriver } from '../interfaces'

interface Pagination {
  pageSize: number // es la cantidad de elementos a mostrar
  pageIndex: number // es el indice de la pagina en la que nos encontramos
  pageCount: number // es el numero de paginas que vamos a tener
  count: number // es el total de elementos que traemos de la bd
  processing: boolean
  processed: boolean
  isLoading: boolean
  reset: () => void
  setIsLoading: (loading: boolean) => void
  setPageSize: (size: number) => void
  setPageIndex: (index: number) => void
  setPageCount: (count: number) => void
  setCount: (count: number) => void
  setProcessing: (process: boolean) => void
  setProcessed: (process: boolean) => void
}

export const paginationStore = create<Pagination>(set => ({
  pageSize: 10,
  pageIndex: 0,
  pageCount: 0,
  count: 0,
  processing: false,
  processed: false,
  isLoading: false,
  setIsLoading: loading => set({ isLoading: loading }),
  setPageSize: size => set({ pageSize: size }),
  setPageIndex: index => set({ pageIndex: index }),
  setPageCount: count => set({ pageCount: count }),
  setCount: count => set({ count }),
  setProcessing: loading => set({ processing: loading }),
  setProcessed: loading => set({ processing: loading }),
  reset: () => set({
    pageSize: 10,
    pageIndex: 0,
    pageCount: 0,
    count: 0,
    processing: true,
    processed: false,
  }),
}))
