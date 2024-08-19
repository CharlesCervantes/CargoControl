import {
  createColumnHelper,

} from '@tanstack/react-table'
import moment from 'moment'
import { ShowVehicleVisitor } from '../../../components/Admin/Admin_Options/Visitors/ShowVehicleVisitor/ShowVehicleVisitor'
import { ShowTrailers } from '../../../components/Admin/Admin_Options/Incidents/ShowTrailers/ShowTrailers'
import { ShowDrivers } from '../../../components/Admin/Admin_Options/Incidents/ShowDrivers/ShowDrivers'
import { ShowVisitors } from '../../../components/Admin/Admin_Options/Visitors/ShowVisitors/ShowVisitors'
import { ShowVehicles } from '../../../components/Admin/Admin_Options/Incidents/ShowVehicles/ShowVehicles'
// import { ShowVisitors } from '../../../components/Admin/Admin_Options/Incidents/ShowVisitors/ShowVisitors'
import type { VisitantsTable } from '../../../interfaces'

export function visitorsTableColumns() {
  // Create the Table Columns
  const columnHelper = createColumnHelper<VisitantsTable>()
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

    columnHelper.accessor((row: VisitantsTable) => {
      const id = row.id || ''
      const lastDigits = id.slice(-10) // Obtiene los últimos 6 dígitos del ID
      return lastDigits
    }, {
      header: 'ID de Seguimiento',
    }),
    columnHelper.accessor((row: VisitantsTable) => row?.Visitors.map(v => v.Person?.name) || [], {
      header: 'Nombre',
    }),
    columnHelper.accessor((row: VisitantsTable) => row?.Visitors.map(v => v.Person?.lastname) || [], {
      header: 'Apellido',
    }),
    columnHelper.accessor((row: VisitantsTable) => row?.Visitors.map(v => v.Person?.security_social_number) || [], {
      header: 'NSS',
    }),
    columnHelper.accessor((row: VisitantsTable) => row?.Visitors.map(v => v.Company?.name) || [], {
      header: 'Compañía',
    }),
    columnHelper.accessor((row: VisitantsTable) => row?.Visitors.map(v => v.VisitorType?.name) || [], {
      header: 'Tipo de Visita',
    }),

    // columnHelper.accessor((row: VisitantsTable) => row?.Visitors[0].visi || '', {
    //   header: 'ID de Seguimiento',
    // }),
    columnHelper.accessor((row: VisitantsTable) => row?.VehicleVisitor || [], {
      header: 'Vehículo de entrada',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowVehicleVisitor vehicle={row?.original?.VehicleVisitor} />
        // <ShowVisitors visitors={row?.original?.VisitorExit?.[0]?.Visitors} />
      ),
    }),
    columnHelper.accessor((row: VisitantsTable) => {
      const date = moment(row?.dateTime || '')
      return date.format('DD/MM/YYYY h:mm:ss A')
    }, {
      header: 'Fecha de entrada',
    }),
    // columnHelper.accessor((row: VisitantsTable) => row?.Visitors || [], {
    //   header: 'visitantes de entrada',
    //   disableFilter: true,
    //   cell: ({ row }) => (
    //     <ShowVisitors visitors={row?.original?.Visitors} />
    //     // <ShowVisitors visitors={row?.original?.VisitorExit?.[0]?.Visitors} />
    //   ),
    // }),
    columnHelper.accessor((row: VisitantsTable) => row?.VisitorExit?.[0]?.VehicleVisitor || [], {
      header: 'Vehículo de salida',
      disableFilter: true,
      cell: ({ row }) => (
        <ShowVehicleVisitor vehicle={row?.original?.VisitorExit?.[0]?.VehicleVisitor} />
        // <ShowVisitors visitors={row?.original?.VisitorExit?.[0]?.Visitors} />
      ),
    }),
    columnHelper.accessor((row: VisitantsTable) => {
      const dateValue = row?.VisitorExit[0]?.dateTime || ''
      const date = moment(dateValue)
      if (date.isValid())
        return date.format('DD/MM/YYYY h:mm:ss A')
      else
        return 'Sin Salida'
    }, {
      header: 'Fecha de salida',
    }),

  ]

  return columns
}
