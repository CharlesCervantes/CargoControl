import { useEffect, useState } from 'react'
import { Header } from '../../../Common/Header/Header'
import { CreateTable } from '../../../../table/CreateTable'
import { visitorsTableColumns } from '../../../../table/TableColumns/visitantsTable/VisitorsTableColumns'
import { getVisitors } from '../../../../fetch/Visitor/getVisitors'
import { paginationStore } from '../../../../zustand/paginationStore'
import * as styles from './Visitor.css'
import type { VisitantsTable } from '../../../../interfaces'

export function Visitors() {
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
            console.log("MYVISITORS:",data)
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
        <CreateTable
          columns={columns}
          updateTableData={() => { }}
          data={visitors}
        />
      </div>
    </div>
  )
}
