import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { getVisitorTypes } from '../../../../../fetch/Visitor/getVisitorTypes'
import { CreateTable } from '../../../../../table/CreateTable'
import { Header } from '../../../../Common/Header/Header'
import * as styles from '../Companies/companies.css'
import { fetchUserRole } from '../../../../../fetch/User/getUsersRoleByToken'
import { FILTER, USERINFO } from '../../../../../global'
import { columnsVisitorType } from '../../../../../table/TableColumns/operator'
import { visitorTypeStore } from '../../../../../zustand/visitorTypeStore'
import { paginationStore } from '../../../../../zustand/paginationStore'
import { sesionStore } from '../../../../../zustand/sesionStore'
import { Add } from './AddVisitorType/AddVisitorType'
import type { ColumnDef } from '@tanstack/react-table'

import type { IVisitorType } from '../../../../../interfaces'

function VisitorType() {
  const { visitorTypes, setVisitorTypes } = visitorTypeStore()
  const [role, setRole] = useState('')
  const [columns, setColumns] = useState<Array<ColumnDef<IVisitorType, any>>>([])
  const {
    pageIndex,
    pageSize,
    setIsLoading,
    setCount,
  } = paginationStore()

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      try {
        await getVisitorTypes(pageSize, pageIndex + 1)
          .then((data) => {
            setVisitorTypes(data.data.result)
            setCount(data.data.count)
            setIsLoading(false)
          })
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [pageIndex, pageSize])

  // // Vaslidamos que el usuario este autenticado
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
    if (role === USERINFO.admin) {
      const columns = columnsVisitorType() // Si se desea cambias las columnas del admin se debe ir a la definicion de esta funcion
      setColumns(columns)
    } else {
      if (role === USERINFO.operator) {
        const columns = columnsVisitorType()// Si se desea cambias las columnas del Operador se debe ir a la definicion de esta funcion
        setColumns(columns)
      }
    }
  }, [role])

  return (
    <div className={styles.container}>
      <Header title="Tipos de visitantes" />
      <div className={styles.main}>
        {role === USERINFO.admin
          ? (<Add />)
          : (null)
        }
        <div>
          <CreateTable
            data={visitorTypes}
            columns={columns}
            updateTableData={() => { }}
            filterType={FILTER.COMPANIES}
            tableType={FILTER.COMPANIES}
          />
        </div>
      </div>
    </div>
  )
}

export default VisitorType
