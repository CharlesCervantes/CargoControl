/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import { paginationStore } from '../zustand/paginationStore'
import { getTrailerTypes } from '../fetch/TrailerTypes/getTrailerTypes'
import { getVehicleTypes } from '../fetch/VehicleTypes/getVehicleTypes'
import { ExcelReport } from '../components/Common/Excel/Excel'
import { FILTER } from '../global'
import * as styles from './TableStyles.css'
import { AdvancedSearch } from './TableColumns/AdvancedSearch/AdvancedSearch'
import type { ColumnsForUnitRecordTable, EntranceUnits, Trailer, TrailerEntity, VehicleTypeEntity } from '../interfaces'
import type {
  Column,
  ColumnDef,
  Table as ReactTable,
} from '@tanstack/react-table'

/// Table Component
export function CreateTableResponsive(
  {
    data,
    columns,
    updateTableData,
    filterType,
    searchInTable,
    tableType,
  }:
  {
    data
    columns
    updateTableData?: (updatedData) => void
    filterType?: string
    searchInTable?: boole
    tableType
  }) {
  console.log('1.10datainTable:', data)
  const {
    setPageSize,
    setPageIndex,
    setPageCount,
    reset,
    pageSize,
    count,
    pageIndex,
    pageCount,
    isLoading,
    setIsLoading,
  } = paginationStore()
  const [filteredData, setFilteredData] = useState<Array<EntranceUnits>>(data)
  const [trailerTypes, setTrailerTypes] = useState<Array<VehicleTypeEntity>>([])
  const [vehicleTypes, setVehicleTypes] = useState<Array<VehicleTypeEntity>>([])

  const table = useReactTable({
    data: (filteredData && filteredData.length > 0) ? filteredData : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    initialState: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    pageCount,
  })
  console.log('tableInfo:', table.getState().pagination)
  console.log('tableInfo2:', table.getPageCount())

  // Use effect encargado de operaciones en las variables de la tabla
  useEffect(() => {
    function calculatePageCount() {
      const numberOfPages = Math.ceil(count / pageSize)
      setPageCount(numberOfPages)
    }
    function changePageSize() {
      table.setPageSize(pageSize)
    }
    calculatePageCount()
    changePageSize()
  }, [count, pageSize])

  // console.log('1.2filtertype and filter.registers:', tableType, FILTER.REGISTERS)
  useEffect(() => {
    // Use Effect para traer la informacion necesaria para los filtros de las tablas en entradas y salidas
    if (tableType === FILTER.REGISTERS) {
      async function getTrailerTypesFromDB() {
        const data: Array<VehicleTypeEntity> = await getTrailerTypes()
        console.log('1.2myTrailerTypes:', data)
        setTrailerTypes(data.data)
      }

      async function getVehicleTypesFromDB() {
        const data: Array<VehicleTypeEntity> = await getVehicleTypes()
        console.log('1.2myVehicleTypes:', data)
        setVehicleTypes(data.data)
      }
      getTrailerTypesFromDB()
      getVehicleTypesFromDB()
    }
  }, [])

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  function changePage(page: number) {
    if (((page + 1) <= pageCount) && ((page + 1) > 0))
      setPageIndex(page)
  }

  function newFilteredData(newFilteredData) {
    setFilteredData(newFilteredData)
  }

  return (
    <>
      {(isLoading === true)
        ? (
          <Loader />
          )
        : (
            (isLoading === false && (data === undefined || data.length === 0))
              ? (
                <p>No hay información para mostrar</p>
                )
              : (
                <div>
                  <div style={{ padding: '1rem' }}>

                    <div className={styles.btnavegationContainer}>
                      <button
                        className={styles.buttonNavegation}
                        onClick={() => {
                          setPageIndex(0)
                        }}
                        disabled={pageIndex === 0}
                      >
                        {'<<'}
                      </button>
                      <button
                        className={styles.buttonNavegation}
                        onClick={() => {
                          setPageIndex(pageIndex - 1)
                        }}
                        disabled={pageIndex === 0}
                      >
                        {'<'}
                      </button>
                      <button
                        className={styles.buttonNavegation}
                        onClick={() => {
                          setPageIndex(pageIndex + 1)
                        }}
                        disabled={((pageIndex + 1) === pageCount)}
                      >
                        {'>'}
                      </button>
                      <button
                        className={styles.buttonNavegation}
                        onClick={() => {
                          setPageIndex(pageCount - 1)
                        }}
                        disabled={(pageIndex + 1) === pageCount}
                      >
                        {'>>'}
                      </button>

                      <span className={styles.currentPage}>
                        <div>Page</div>
                        <strong>
                          {pageIndex + 1} of{' '}
                          {pageCount}
                        </strong>
                      </span>
                      <span className={styles.pageSelector}>
                        <p style={{ marginLeft: '0.2rem', marginRight: '0.4rem' }}>| Go to page</p>
                        <input
                          type="number"
                          defaultValue={pageIndex + 1}
                          onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            changePage(page)
                          }}
                          className={styles.input}
                        />
                      </span>
                      <select
                        style={{ marginRight: '10px' }}
                        className={styles.select}
                        value={pageSize}
                        onChange={(e) => {
                          const selectedPageSize = Number(e.target.value)
                          setPageSize(selectedPageSize)
                          setPageIndex(0)
                        }}
                      >
                        {[1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 500].map(size => (
                          <option
                            key={size}
                            value={size}
                          >Mostrar: {size}
                          </option>
                        ))}
                      </select>
                      {/* Descomentar para activar la busqueda filtrada */}
                      <div style={{ marginRight: '10px' }}>
                        {filterType === FILTER.REGISTERS
                  && <AdvancedSearch
                    trailerTypes={trailerTypes}
                    vehicleTypes={vehicleTypes}
                    data={data}
                    filterData={data => newFilteredData(data)}
                     />
                  }
                      </div>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <table>
                      <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers && headerGroup.headers.map((header) => {
                              return (
                                <th className={styles.th} key={header.id} colSpan={header.colSpan}>
                                  {header.isPlaceholder
                                    ? null
                                    : (
                                      <div>
                                        {flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                        )}
                                        {!header.column.columnDef.disableFilter && header.column.getCanFilter()
                                          ? (
                                            <div>
                                              <Filter column={header.column} table={table} />
                                            </div>
                                            )
                                          : null}
                                      </div>
                                      )}
                                </th>
                              )
                            })}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map((row, rowIndex) => {
                          const rowColorClass = rowIndex % 2 === 0 ? styles.principalRow : styles.whiteRow
                          return (
                            <tr key={row.id} className={rowColorClass}>
                              {row.getVisibleCells().map((cell) => {
                                return (
                                  <td className={styles.td} key={cell.id}>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                                  </td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                )
          )}
    </>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: ReactTable<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number'
    ? (
      <div className="flex space-x-2">
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ])
                }
          placeholder="Min"
          className="w-24 border shadod rounded"
        />
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
                }
          placeholder="Max"
          className="w-24 border shadow rounded"
        />
      </div>
      )
    : (
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder="Buscar..."
        className={styles.searchText}
      />
      )
}
