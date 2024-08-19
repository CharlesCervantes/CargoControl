import { create } from 'zustand'
import type { IFile } from '../interfaces'

interface ISignatureState {
  signature: IFile
  setSiganture: (signature: IFile) => void
  dropSignature: () => void
}

export const SignatureStore = create<ISignatureState>(set => ({
  signature: {
    name: '',
    size: 0,
    type: '',
    url: '',
    organizationId: '',
  },
  setSiganture: signature => set({ signature }),
  dropSignature: () => set({
    signature: {
      name: '',
      size: 0,
      type: '',
      url: '',
      organizationId: '',
    },
  }),
}))
