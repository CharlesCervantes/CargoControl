import { useEffect } from 'react'
import { locationsTableColumns } from '../../../../../table/TableColumns/LocationsTable/LocationsTable'
import { CreateTable } from '../../../../../table/CreateTable'
import { Header } from '../../../../Common/Header/Header'
import { getLocations } from '../../../../../fetch/Locations/getLocations'
import { locationStore } from '../../../../../zustand/locationsStore' // Importa tu tienda
import * as styles from '../Companies/companies.css'
import { paginationStore } from '../../../../../zustand/paginationStore'
import { FILTER } from '../../../../../global'
import { CreateLocation } from './CreateLocation'

export function Locations() {
  const {
    pageSize,
    pageIndex,
    setCount,
    setIsLoading,
  } = paginationStore()
  const { locations, setLocations } = locationStore()
  const columns = locationsTableColumns()

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      try {
        await getLocations(pageSize, pageIndex + 1)
          .then((data) => {
            setLocations(data.data.result)
            setCount(data.data.count)
            setIsLoading(false)
          })
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [pageSize, pageIndex])

  return (
    <div className={styles.container}>
      <Header title="Ubicaciones" />
      <CreateLocation />
      <CreateTable
        columns={columns}
        data={locations}
        filterType={FILTER.LOCATIONS}
        updateTableData={() => { }}
        tableType={FILTER.LOCATIONS}
      />
    </div>
  )
}
