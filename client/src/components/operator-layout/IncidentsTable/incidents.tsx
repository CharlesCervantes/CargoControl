import { useEffect, useState } from 'react'
import { Header } from '../../Common/Header/Header'
import { getIncidents } from '../../../fetch/Incidents/getIncidents'
import { inicidentsTableColumns } from '../../../table/TableColumns/incidentsTable/IncidentsTableColumns'
import { CreateTable } from '../../../table/CreateTable'
import { paginationStore } from '../../../zustand/paginationStore'
import * as styles from './Incidents.css'
import type { IncidentReport } from '../../../interfaces'

export function TableIncidentsInOperator() {
  const {
    pageSize,
    pageIndex,
    setIsLoading,
    setCount,
  } = paginationStore()

  const [tableData, setTableData] = useState <Array<IncidentReport>>([])
  const columns = inicidentsTableColumns()
  useEffect(() => {
    const fetchData = async() => {
      try {
        await getIncidents(pageSize, pageIndex + 1)
          .then((data) => {
            setTableData(data.data.result)
            setCount(data.data.count)
            setIsLoading(false)
          })
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [pageSize, pageIndex])
  return (
    <div className={styles.container}>
      <Header title="Incidencias" />
      <div className={styles.wrapper}>
        <CreateTable data={tableData} columns={columns} />
      </div>
    </div>
  )
}
