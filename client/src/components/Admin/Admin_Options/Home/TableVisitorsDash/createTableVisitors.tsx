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
import { getVehicleTypes } from '../../../../../fetch/VehicleTypes/getVehicleTypes'
import { getTrailerTypes } from '../../../../../fetch/TrailerTypes/getTrailerTypes'
import { ExcelReport } from '../../../../Common/Excel/Excel'
import { FILTER } from '../../../../../global'
import { AdvancedSearch } from '../../../../../table/TableColumns/AdvancedSearch/AdvancedSearch'
import * as styles from './stylesVisitorTable.css'
import type { ColumnsForUnitRecordTable, EntranceUnits, Trailer, TrailerEntity, VehicleTypeEntity } from '../../../../../interfaces'
import type {
  Column,
  ColumnDef,
  Table as ReactTable,
} from '@tanstack/react-table'

/// Table Component
export function CreateTableVisitors({ data, columns, updateTableData, filterType, searchInTable }: { data, columns, updateTableData?: (updatedData) => void, filterType?: string, searchInTable?: boolean }) {
  const [opened, { open, close }] = useDisclosure(false)
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
  })

  // Traemos TrailerTypes y VehicleTypes
  useEffect(() => {
    async function getTrailerTypesFromDB() {
      const data: Array<VehicleTypeEntity> = await getTrailerTypes()
      setTrailerTypes(data)
    }

    async function getVehicleTypesFromDB() {
      const data: Array<VehicleTypeEntity> = await getVehicleTypes()
      setVehicleTypes(data)
    }
    getTrailerTypesFromDB()
    getVehicleTypesFromDB()
  }, [])

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  function newFilteredData(newFilteredData) {
    setFilteredData(newFilteredData)
  }

  return (
    <>
      {((data === undefined) || (data.length === 0))
        ? <Loader />
        : (
          <div>
            <div className={styles.btnavegationMainContainer}>
              <div className={styles.btnavegationContainer}>
                <button
                  className={styles.buttonNavegation}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<<'}
                </button>
                <button
                  className={styles.buttonNavegation}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<'}
                </button>
                <button
                  className={styles.buttonNavegation}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {'>'}
                </button>
                <button
                  className={styles.buttonNavegation}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {'>>'}
                </button>

                <span className={styles.currentPage}>
                  <div>Página</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} de{' '}
                    {table.getPageCount()}
                  </strong>
                </span>
                {/* <span className={styles.pageSelector}>
                  <p style={{ marginLeft: '0.2rem', marginRight: '0.4rem' }}>| Ir a pagina</p>
                  <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0
                      table.setPageIndex(page)
                    }}
                    className={styles.input}
                  />
                </span> */}
                <select
                  style={{ marginRight: '10px' }}
                  className={styles.select}
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option
                      key={pageSize}
                      value={pageSize}
                    >Mostrar: {pageSize}
                    </option>
                  ))}
                </select>

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
            }
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
