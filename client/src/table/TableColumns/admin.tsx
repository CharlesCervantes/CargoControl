/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createColumnHelper,

} from '@tanstack/react-table'
import moment from 'moment'
import { EditRegisterModal } from '../../components/Admin/Admin_Options/UnitRecord/EditButton/EditRegisterModal'
import { PreviewPDF } from '../../components/PDF/PreviewPDF'
import { ShowVehicles } from '../../components/Admin/Admin_Options/UnitRecord/ShowVehicles/ShowVehicles'
import { ShowTrailers } from '../../components/Admin/Admin_Options/UnitRecord/ShowTrailers/ShowTrailers'
import { LogParticular } from '../../components/Common/Historial/Particular'
import type { ColumnsForUnitRecordTable, EntranceUnits } from '../../interfaces'

export function columnsForAdmin() {
  // Create the Table Columns
  const columnHelper = createColumnHelper<EntranceUnits>()
  const columns = [
    // columnHelper.accessor('editButton', { // this column create and render the edit button and onclick render the edit modal
    //   header: 'Editar',
    //   disableFilter: true,
    //   cell: ({ row }) => (
    //     <EditRegisterModal
    //       data={row.original}
    //     />
    //   ),
    // }),
    // Informacion de Entrada
    columnHelper.accessor((row: EntranceUnits) => {
      const id = row?.entranceUnit?.id || ''
      const last6Digits = id.slice(-10) // Obtiene los últimos 6 dígitos del ID
      return last6Digits
    }, {
      header: 'ID de Seguimiento',
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.entranceUnit?.Driver?.Person?.name || '', {
      header: 'Conductor de Entrada',
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.entranceUnit?.Driver?.Person?.license || '', {
      header: 'Licencia',
    }),
    columnHelper.accessor((row: EntranceUnits) => {
      const date = moment(row?.entranceUnit?.dateTime || '')
      return date.format('DD/MM/YYYY h:mm:ss A')
    }, {
      header: 'Fecha de entrada',
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.entranceUnit?.Vehicle || '', {
      header: 'Ver Vehículo de Entrada',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowVehicles vehicles={row?.original?.entranceUnit?.Vehicle} />
      ),
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.entranceUnit?.Trailer || '', {
      header: 'Ver Tráilers de Entrada',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowTrailers trailers={row?.original?.entranceUnit?.Trailer} />
      ),
    }),
    // // Informacion de Salida
    columnHelper.accessor((row: EntranceUnits) => {
      const firstExit = row?.exitUnit?.dateTime
      if (firstExit) {
        const date = moment(firstExit.dateTime || '')
        return date.isValid() ? date.format('DD/MM/YYYY h:mm:ss A') : ''
      }
      return 'Sin salida' // Default value if VisitorExit is undefined or empty
    }, {
      header: 'Fecha de salida',
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.exitUnit?.Vehicle || '', {
      header: 'Ver Vehículo de Salida',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowVehicles vehicles={row?.original?.entranceUnit?.ExitUnits?.[0]?.Vehicle} />
      ),
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.exitUnit?.Trailer || '', {
      header: 'Ver Tráilers de Salida',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowTrailers trailers={row?.original?.entranceUnit?.ExitUnits?.[0]?.Trailer} />
      ),
    }),
    columnHelper.accessor('createPDFButton', { // This column create and render the PDF button, create a PDF with the send info
      header: 'PDF',
      disableFilter: true,
      cell: ({ row }) => (
        <PreviewPDF
          id={row?.original?.entranceUnit?.id}
          driver={row?.original?.entranceUnit?.Driver?.Person}
          entranceVehicle={row?.original?.entranceUnit?.Vehicle}
          entranceTrailer={row?.original?.entranceUnit?.Trailer}
          exitVehicle={row?.original?.entranceUnit?.ExitUnits?.[0]?.Vehicle}
          exitTrailer={row?.original?.entranceUnit.ExitUnits?.[0]?.Trailer}
          enterDate={row?.original?.entranceUnit?.dateTime}
          exitDate={row?.original?.entranceUnit.ExitUnits?.[0]?.dateTime}
        />
      ),
    }),
    // columnHelper.accessor('log', { // this column create and render the edit button and onclick render the edit modal
    //   header: 'Editar',
    //   disableFilter: true,
    //   cell: ({ row }) => (
    //     <LogParticular />
    //   ),
    // }),
  ]

  return columns
}
