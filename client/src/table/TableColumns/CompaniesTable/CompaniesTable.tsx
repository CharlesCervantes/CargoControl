import {
  createColumnHelper,
} from '@tanstack/react-table'
import moment from 'moment'
import { DeleteCompany } from '../../../components/Admin/Admin_Options/Catalogs/Companies/DeleteCompany'
import { EditCompany } from '../../../components/Admin/Admin_Options/Catalogs/Companies/EditCompany'
import type { ICompany } from '../../../interfaces'

export function companiesTableColumns() {
  // Create the Table Columns
  const columnHelper = createColumnHelper<ICompany>()
  const columns = [
    // Informacion de Entrada

    columnHelper.accessor((row: ICompany) => {
      const id = row.id || ''
      const lastDigits = id.slice(-10) // Obtiene los últimos 6 dígitos del ID
      return lastDigits
    }, {
      header: 'ID de Compañía',
    }),

    columnHelper.accessor((row: ICompany) => row?.name || '', {
      header: 'Nombre de la Compañía',
    }),
    columnHelper.accessor((row: ICompany) => row?.address || '', {
      header: 'Ubicación de la Compañía',
    }),
    columnHelper.accessor((row: ICompany) => {
      const date = moment(row?.created_at || '')
      return date.format('DD/MM/YYYY h:mm:ss A')
    }, {
      header: 'Fecha en que se agregó',
    }),
    columnHelper.accessor('editButton', {
      header: 'Editar',
      disableFilter: true,
      cell: ({ row }) => (
        //   <ShowTrailers trailers={row.original.entranceTrailer} />
        // <button>ExampleDriversButton</button>
        // <ShowDrivers drivers={row.original.Driver} />
        <EditCompany data={row.original} />
      ),
    }),
    columnHelper.accessor('deleteButton', {
      header: 'Eliminar',
      disableFilter: true,
      cell: ({ row }) => (
        //   <ShowTrailers trailers={row.original.entranceTrailer} />
        // <button>ExampleDriversButton</button>
        // <ShowDrivers drivers={row.original.Driver} />
        <DeleteCompany data={row.original} />
      ),
    }),

  ]

  return columns
}
