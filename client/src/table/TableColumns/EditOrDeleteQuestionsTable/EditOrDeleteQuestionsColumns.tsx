import {
  createColumnHelper,

} from '@tanstack/react-table'
import { DeleteQuestion } from '../../../components/Admin/Admin_Options/Checklist/components/editOrDeleteQuestions/DeleteQuestion'
import { EditQuestion } from '../../../components/Admin/Admin_Options/Checklist/components/editOrDeleteQuestions/EditQuestions'
import { ShowTrailers } from '../../../components/Admin/Admin_Options/Incidents/ShowTrailers/ShowTrailers'
import { ShowDrivers } from '../../../components/Admin/Admin_Options/Incidents/ShowDrivers/ShowDrivers'
import { ShowVisitors } from '../../../components/Admin/Admin_Options/Incidents/ShowVisitors/ShowVisitors'
import { ShowVehicles } from '../../../components/Admin/Admin_Options/Incidents/ShowVehicles/ShowVehicles'
import type { ColumnsForEditOrCreateQuestionsTable, QuestionsEntity } from '../../../interfaces'

export function EditOrDeleteQuestionColumns(closeModal: () => void) {
  // Create the Table Columns
  const columnHelper = createColumnHelper<QuestionsEntity>()
  const columns = [
    columnHelper.accessor((row: QuestionsEntity) => row?.name || '', {
      header: 'Question',
    }),
    columnHelper.accessor((row: QuestionsEntity) => row?.type || '', {
      header: 'Tipo',
    }),
    columnHelper.accessor('editButton', {
      header: '',
      disableFilter: true,
      cell: ({ row }) => (
        <EditQuestion editQuestionId={row.original.id || ''} editQuestionName={row.original.name || ''} editQuestioType={row.original.type ||' '} closeModal={closeModal}  />
      ),
    }),
    columnHelper.accessor('deleteButton', {
      header: '',
      disableFilter: true,
      cell: ({ row }) => (

        <DeleteQuestion editQuestionId={row.original.id || ''} editQuestionName={row.original.name || ''} editQuestioType={row.original.type || ''} closeModal={closeModal} />
      ),
    }),
  ]

  return columns
}
