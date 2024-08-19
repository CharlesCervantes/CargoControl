import { create } from 'zustand'
import type { IArrImages } from '../interfaces'

interface IImagesState {
  images: Array<IArrImages>
  setImages: (images: Array<IArrImages>) => void
  addImage: (image: IArrImages) => void
  deleteImage: (imageName: string) => void
  resetImages: () => void
}

export const imagesStore = create<IImagesState>(set => ({
  images: [],
  setImages: images => set({ images }),
  addImage: (image: IArrImages) => {
    set(state => ({ images: [...state.images, image] }))
  },
  deleteImage: (imageName: string) => {
    set(state => ({ images: state.images.filter(image => image.name !== imageName) }))
  },
  resetImages: () => {
    set({ images: [] })
  },
}))
