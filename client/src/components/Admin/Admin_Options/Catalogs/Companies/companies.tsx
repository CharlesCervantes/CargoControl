import { useEffect } from 'react'
import { companiesTableColumns } from '../../../../../table/TableColumns/CompaniesTable/CompaniesTable'
import { CreateTable } from '../../../../../table/CreateTable'
import { Header } from '../../../../Common/Header/Header'
import { getCompanies } from '../../../../../fetch/Companies/getCompanies'
import { companyStore } from '../../../../../zustand/companiesStore' // Importa tu tienda
import { paginationStore } from '../../../../../zustand/paginationStore'
import { FILTER } from '../../../../../global'
import * as styles from './companies.css'
import { CreateCompanies } from './CreateCompany'

export function Companies() {
  const {
    pageSize,
    pageIndex,
    setCount,
    setIsLoading,
  } = paginationStore()

  const companies = companyStore(state => state.companies) // Obtiene las compañías de la tienda
  const setCompanies = companyStore(state => state.setCompanies) // Obtiene la función setCompanies de la tienda
  const columns = companiesTableColumns()

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      try {
        await getCompanies(pageSize, pageIndex + 1)
          .then((data) => {
            setCompanies(data.data.result)
            setCount(data.data.count)
            setIsLoading(false)
          })
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [pageSize, pageIndex]) // Agrega setCompanies a las dependencias del efecto

  return (
    <div className={styles.container}>
      <Header title="Compañías" />
      <CreateCompanies />
      <CreateTable
        columns={columns}
        data={companies}
        filterType={FILTER.COMPANIES}
        tableType={FILTER.COMPANIES}
      />
    </div>
  )
}
