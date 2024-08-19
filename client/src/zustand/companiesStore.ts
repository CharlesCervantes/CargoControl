import { create } from 'zustand'
import type { ICompany } from '../interfaces'

interface ICompanyState {
  companies: Array<ICompany>
  setCompanies: (companies: Array<ICompany>) => void
  addCompany: (company: ICompany) => void
  deleteCompany: (id: string) => void
  updateCompany: (company: ICompany) => void
}

export const companyStore = create<ICompanyState>(set => ({
  companies: [],
  setCompanies: company => set({ companies: company }),
  addCompany: (company: ICompany) => {
    set(state => ({ companies: [...state.companies, company] }))
  },
  deleteCompany: id => set(state => ({ companies: state.companies.filter(company => company.id !== id) })),
  updateCompany: newComapany => set(state => ({
    companies: state.companies.map((oldCompany) => {
      if (oldCompany.id === newComapany.id)
        return newComapany
      else
        return oldCompany
    }),
  })),
}))
