import { useEffect, useState } from 'react'
import { Alert } from '@mantine/core'
import { paginationStore } from '../../../../zustand/paginationStore'
import { getUsersActive } from '../../../../fetch/User/getUsersActive'
import { Header } from '../../../Common/Header/Header'
import { userColumns } from '../../../../table/TableColumns/UserColumns'
import { CreateTable } from '../../../../table/CreateTable'
import { FILTER } from '../../../../global'
import { userStore } from '../../../../zustand/userStore'
import { CreateTableResponsive } from '../../../../table/CreateTableResponsive'
import * as styles from './Users.css'
import { AddUser } from './addUserModal/AddUser'

export function Users() {
  const {
    pageSize,
    pageIndex,
    setCount,
    setIsLoading,
  } = paginationStore()
  const { users, setUsers } = userStore()
  const [failFetch, setFailFetch] = useState<boolean>(false) // Cambié esta línea, estaba incorrecta anteriormente
  const columns = userColumns()

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      try {
        await getUsersActive(pageSize, pageIndex + 1)
          .then((data) => {
            console.log('dataInFetch:', data.data.count)
            setUsers(data.data.result)
            setCount(data.data.count)
            setIsLoading(false)
          })
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchData()
    // Función para cancelar la solicitud cuando el componente se desmonta
  }, [pageSize, pageIndex])

  return (
    <div className={styles.container}>
      <Header title="Usuarios" />
      <AddUser />
      <div className={styles.wrapper}>
        {failFetch
          ? (
            <Alert title="Error de petición" color="red">
              Conexión Perdida!!! 😐
            </Alert>
            )
          : (
            <CreateTable
              data={users}
              columns={columns}
              filterType={FILTER.USER}
              updateTableData={() => { }}
              tableType={FILTER.USER}
            />
            )}
      </div>
    </div>
  )
}
