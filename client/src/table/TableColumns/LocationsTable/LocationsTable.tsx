import {
  createColumnHelper,
} from '@tanstack/react-table'
import moment from 'moment'
import { DeleteLocation } from '../../../components/Admin/Admin_Options/Catalogs/Locations/DeleteLocation'
import { EditLocation } from '../../../components/Admin/Admin_Options/Catalogs/Locations/EditLocation'
import type { ILocation } from '../../../interfaces'

export function locationsTableColumns() {
  // Create the Table Columns
  const columnHelper = createColumnHelper<ILocation>()
  const columns = [
    // Informacion de Entrada

    columnHelper.accessor((row: ILocation) => {
      const id = row.id || ''
      const lastDigits = id.slice(-10) // Obtiene los últimos 6 dígitos del ID
      return lastDigits
    }, {
      header: 'ID de Localización',
    }),
    columnHelper.accessor((row: ILocation) => row?.name || '', {
      header: 'Nombre de la Localización',
    }),
    columnHelper.accessor((row: ILocation) => row?.capacity || '', {
      header: 'Capacidad',
    }),
    columnHelper.accessor((row: ILocation) => {
      const date = moment(row?.dateTime || '')
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
        <EditLocation data={row.original} />
      ),
    }),
    columnHelper.accessor('deleteButton', {
      header: 'Eliminar',
      disableFilter: true,
      cell: ({ row }) => (
        //   <ShowTrailers trailers={row.original.entranceTrailer} />
        // <button>ExampleDriversButton</button>
        // <ShowDrivers drivers={row.original.Driver} />
        <DeleteLocation data={row.original} />
      ),
    }),
  ]

  return columns
}
