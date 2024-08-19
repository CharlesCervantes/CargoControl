import { createColumnHelper } from '@tanstack/react-table'
import { Button } from '@mantine/core'
import { Icon } from '@iconify/react'
import deleteIcon from '@iconify-icons/ph/trash'
import editIcon from '@iconify-icons/ph/pencil'
import moment from 'moment'
import { PreviewPDF } from '../../components/PDF/PreviewPDF'
import { ShowVehicles } from '../../components/Admin/Admin_Options/UnitRecord/ShowVehicles/ShowVehicles'
import { ShowTrailers } from '../../components/Admin/Admin_Options/UnitRecord/ShowTrailers/ShowTrailers'
import { visitorTypeStore } from '../../zustand/visitorTypeStore'
import { EditVisitorType } from '../../components/Admin/Admin_Options/Catalogs/Visitor-types/EditVisitorType'
import { DeleteVisitorTypes } from '../../components/Admin/Admin_Options/Catalogs/Visitor-types/DeleteVisitorTypes'
import type { EntranceUnits, IVisitorType } from '../../interfaces'

export function columnsVisitorType() {
  // const handleEdit = (record: IVisitorType) => {
  //   console.log('Se esta editando ahhhhh', record)
  // }

  // const handleDelete = (record: IVisitorType) => {
  //   console.log('Se esta guardando ahhhhh', record)
  // }

  const columnHelper = createColumnHelper<IVisitorType>()
  const columns = [
    columnHelper.accessor((row: IVisitorType) => {
      const id = row.id || '' // Obtén el ID
      const last6Digits = id.slice(-10) // Obtiene los últimos 6 dígitos del ID
      return last6Digits
    }, {
      header: 'ID tipo de visitante',
    }),

    columnHelper.accessor((row: IVisitorType) => row.name, {
      header: 'Tipo de Visitante',
    }),
    columnHelper.accessor((row: IVisitorType) => row.description, {
      header: 'Descripción',
    }),
    columnHelper.accessor('edit', {
      header: 'Editar',
      disableFilter: true,
      cell: ({ row }) => (
        <EditVisitorType data={row.original} />
      ),
    }),

    columnHelper.accessor('delete', {
      header: 'Eliminar',
      disableFilter: true,
      cell: ({ row }) => (
        <DeleteVisitorTypes data={row.original} />
      ),
    }),
  ]

  return columns
}

export function columnsForOperator() {
  // Create the Table Columns
  const columnHelper = createColumnHelper<EntranceUnits>()
  const columns = [
    // columnHelper.accessor('editButton', { // this column create and render the edit button and onclick render the edit modal
    //   header: 'Editar',
    //   disableFilter: true,
    //   cell: ({ row }) => (
    //     <EditRegisterModal
    //       data={row.original}
    //       updateTableData={updateTableData}
    //     />
    //   ),
    // }),
    // Informacion de Entrada

    columnHelper.accessor((row: EntranceUnits) => {
      const id = row.entranceUnit.id || '' // Obtén el ID
      const lastDigits = id.slice(-10) // Obtiene los últimos 6 dígitos del ID
      return lastDigits
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
      const date = moment(row.entranceUnit?.dateTime || '')
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
      if (row?.exitUnit?.dateTime !== undefined) {
        const date = moment(row.exitUnit.dateTime)
        if (date.isValid())
          return date.format('DD/MM/YYYY h:mm:ss A')
        else
          return 'Sin Salida'
      } else {
        return 'Sin Salida'
      }
    }, {
      header: 'Fecha de Salida',
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.exitUnit?.Vehicle || '', {
      header: 'Ver Vehículo de Salida',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowVehicles vehicles={row?.original?.exitUnit?.Vehicle} />
      ),
    }),
    columnHelper.accessor((row: EntranceUnits) => row?.exitUnit?.Trailer || '', {
      header: 'Ver Tráilers de Salida',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowTrailers trailers={row?.original?.exitUnit?.Trailer} />
      ),
    }),
    columnHelper.accessor('createPDFButton', { // This column create and render the PDF button, create a PDF with the send info
      header: 'PDF',
      disableFilter: true,
      cell: ({ row }) => (
        <PreviewPDF
          id={row?.original?.entranceUnit?.id}
          driver={row?.original?.entranceUnit?.Driver}
          entranceVehicle={row?.original?.entranceUnit?.Vehicle}
          entranceTrailer={row?.original?.entranceUnit?.Trailer}
          exitVehicle={row?.original?.entranceUnit?.ExitUnits?.[0]?.Vehicle}
          exitTrailer={row?.original?.entranceUnit.ExitUnits?.[0]?.Trailer}
          enterDate={row?.original?.entranceUnit?.dateTime}
          exitDate={row?.original?.entranceUnit.ExitUnits?.[0]?.dateTime}
        />
      ),
    }),
  ]

  return columns
}
