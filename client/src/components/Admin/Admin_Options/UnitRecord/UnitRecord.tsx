import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  createColumnHelper,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Header } from '../../../Common/Header/Header'
import { CreateTable } from '../../../../table/CreateTable'
import * as styles from '../UnitRecord/UnitRecord.css'
import { fetchUserRole } from '../../../../fetch/User/getUsersRoleByToken'
import { FILTER, USERINFO } from '../../../../global'
import { columnsForOperator } from '../../../../table/TableColumns/operator'
import { columnsForAdmin } from '../../../../table/TableColumns/admin'
import { getUnitReport } from '../../../../fetch/Report/getUnitRepor'
import { paginationStore } from '../../../../zustand/paginationStore'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'
import type {
  ColumnDef,
} from '@tanstack/react-table'

// Componente Principal
export function UnitRecord() {
  const [tableData, setTableData] = useState<Array<EntranceUnits>>([])
  const [role, setRole] = useState('')
  const [columns, setColumns] = useState<Array<ColumnDef<EntranceUnits, any>>>([])
  const {
    pageSize,
    pageIndex,
    setCount,
    setIsLoading,
  } = paginationStore()

  // Obtenemos la informacion que le vamos a enviar a la Tabla
  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      try {
        await getUnitReport(pageSize, pageIndex + 1)
          .then((data) => {
            console.log('myEntrance:', data.data.result)
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

  // Obtenemos el rol del usuario que tiene la sesion iniciada
  useEffect(() => {
    async function fetchUser() {
      const response = await fetchUserRole()
      if (response) {
        if (response.ok === true)
          setRole(response.data.user.Role.name)
      }
    }
    fetchUser()
  }, [])

  // Dependiendo de si el usuario es Admin o Operador, la tabla mostrara diferentes columnas
  useEffect(() => {
    console.log('role is:', role)
    if (role === USERINFO.admin) {
      const columns = columnsForAdmin() // Si se desea cambias las columnas del admin se debe ir a la definicion de esta funcion
      setColumns(columns)
    } else {
      if (role === USERINFO.operator) {
        const columns = columnsForOperator()// Si se desea cambias las columnas del Operador se debe ir a la definicion de esta funcion
        setColumns(columns)
      }
    }
  }, [role])

  return (
    <div className={styles.container}>
      <Header title="Registros" />
      <div className={styles.wrapper}>
        {/* <ExcelReport /> */}
        {/* <TableAdm data={tableData} columns={columns} filterType={FILTER.REGISTERS} /> */}
        <CreateTable
          data={tableData}
          columns={columns}
          updateTableData={() => { }}
          filterType={FILTER.REGISTERS}
          tableType={FILTER.REGISTERS}
        />
      </div>
    </div>
  )
}
