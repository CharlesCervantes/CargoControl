import {
  createColumnHelper,
} from '@tanstack/react-table'
import { ShowTrailers } from '../../../components/Admin/Admin_Options/Incidents/ShowTrailers/ShowTrailers'
import { ShowDrivers } from '../../../components/Admin/Admin_Options/Incidents/ShowDrivers/ShowDrivers'
import { ShowVisitors } from '../../../components/Admin/Admin_Options/Incidents/ShowVisitors/ShowVisitors'
import { ShowVehicles } from '../../../components/Admin/Admin_Options/Incidents/ShowVehicles/ShowVehicles'
import type { ColumnsForIncidentsTable } from '../../../interfaces'

export function inicidentsTableColumns() {
  // Create the Table Columns
  const columnHelper = createColumnHelper<ColumnsForIncidentsTable>()
  const columns = [
    // columnHelper.accessor('editButton', { // This column create and render the PDF button, create a PDF with the send info
    //   header: 'Editar Registro',
    //   disableFilter: true,
    //   cell: ({ row }) => (
    //     // <EditRegisterModal />
    //     <button>Example</button>
    //   ),
    // }),
    // Informacion de Entrada

    columnHelper.accessor((row: ColumnsForIncidentsTable) => {
      const id = row.id || ''
      const lastDigits = id.slice(-10) // Obtiene los últimos 6 dígitos del ID
      return lastDigits
    }, {
      header: 'ID de Seguimiento',
    }),
    columnHelper.accessor((row: ColumnsForIncidentsTable) => row?.location || '', {
      header: 'Lugar',
    }),
    columnHelper.accessor((row: ColumnsForIncidentsTable) => row.report || '', {
      header: 'Reporte',
    }),
    columnHelper.accessor((row: ColumnsForIncidentsTable) => row.subject || '', {
      header: 'Asunto',
    }),
    columnHelper.accessor((row: ColumnsForIncidentsTable) => row.Driver || '', {
      header: 'Conductores',
      disableFilter: true,
      cell: ({ row }) => (
        //   <ShowTrailers trailers={row.original.entranceTrailer} />
        // <button>ExampleDriversButton</button>
        <ShowDrivers drivers={row.original.Driver} />
      ),
    }),
    columnHelper.accessor((row: ColumnsForIncidentsTable) => row.Vehicle || '', {
      header: 'Vehículos',
      disableFilter: true,
      cell: ({ row }) => (
        // <ShowVehicles vehicles={row.original.Vehicle} />
        // <ShowTrailers trailers={row.original.entranceTrailer} />
        <ShowVehicles vehicles={row.original.Vehicle} />
      ),
    }),

    columnHelper.accessor((row: ColumnsForIncidentsTable) => row.Trailer || '', {
      header: 'Tráilers',
      disableFilter: true,
      cell: ({ row }) => (
        // <ShowTrailers trailers={row.original.entranceTrailer} />
        //   <button>E</button>
        <ShowTrailers trailers={row.original.Trailer} />

      ),
    }),
    columnHelper.accessor((row: ColumnsForIncidentsTable) => row.Visitor || '', {
      header: 'Visitantes',
      disableFilter: true,
      cell: ({ row }) => (
        // <ShowTrailers trailers={row.original.entranceTrailer} />
        // <button>ExampleVehiclesButton</button>,
        <ShowVisitors visitors={row.original.Visitor} />
      ),
    }),
  ]

  return columns
}
