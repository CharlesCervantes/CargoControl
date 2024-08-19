import {
  createColumnHelper,

} from '@tanstack/react-table'
import moment from 'moment'
import type { IVisitor } from '../../../../../interfaces'

export function visitorsTableDashboard() {
  const columnHelper = createColumnHelper<IVisitor>()
  const columns = [

    columnHelper.accessor((row: IVisitor) => row?.Person?.name || '', {
      header: 'Nombre',
    }),

    columnHelper.accessor((row: IVisitor) => {
      const date = moment(row?.created_at || '')
      return date.format('DD/MM/YYYY h:mm:ss A')
    }, {
      header: 'Fecha de entrada',
    }),

    columnHelper.accessor((row: IVisitor) => {
      const firstExit = row?.VisitorExit?.[0]
      if (firstExit) {
        const date = moment(firstExit.dateTime || '')
        return date.isValid() ? 'Fuera' : 'Dentro'
      }
      return 'Dentro'
    }, {
      header: 'Estatus',
    }),

    // columnHelper.accessor((row: IVisitor) => {
    //   const firstExit = row?.VisitorExit?.[0]
    //   if (firstExit) {
    //     const date = moment(firstExit.dateTime || '')
    //     return date.isValid() ? date.format('DD/MM/YYYY h:mm:ss A') : ''
    //   }
    //   return 'Sin salida' // Default value if VisitorExit is undefined or empty
    // }, {
    //   header: 'Fecha de salida',
    // }),
  ]

  return columns.map(column => ({
    ...column,
    Cell: (props) => {
      if (column.header === 'Estatus') {
        const status = props.cell.value
        const color = status === 'Dentro' ? 'green' : 'red'
        return <div style={{ color }}>{status}</div>
      }
      return <div>{props.cell.value}</div>
    },
  }))
}
