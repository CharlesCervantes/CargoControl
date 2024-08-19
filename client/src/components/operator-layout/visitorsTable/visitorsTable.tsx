import { useEffect, useState } from 'react'
import { Header } from '../../Common/Header/Header'
import { CreateTable } from '../../../table/CreateTable'
import { visitorsTableColumns } from '../../../table/TableColumns/visitantsTable/VisitorsTableColumns'
import { getVisitors } from '../../../fetch/Visitor/getVisitors'
import * as styles from '../../Admin/Admin_Options/Visitors/Visitor.css'
import { paginationStore } from '../../../zustand/paginationStore'
import type { VisitantsTable } from '../../../interfaces'

export function VisitorsTable() {
  const {
    pageSize,
    pageIndex,
    setCount,
    setIsLoading,
  } = paginationStore()
  const [visitors, setVisitors] = useState<Array<VisitantsTable>>([])
  const columns = visitorsTableColumns()

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      try {
        await getVisitors(pageSize, pageIndex + 1)
          .then((data) => {
            setVisitors(data.data.result)
            console.log('myVisitors', data.data.result)
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
      <Header title="Accesos" />
      <div className={styles.wrapper}>
        <CreateTable columns={columns} data={visitors} />
      </div>
    </div>
  )
}
