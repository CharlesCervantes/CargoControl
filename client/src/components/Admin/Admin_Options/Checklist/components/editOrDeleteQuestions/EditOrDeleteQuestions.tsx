import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
import { Group, Modal } from '@mantine/core'
import '../../../../../operator-layout/responsive.css'
import iconEdit from '@iconify-icons/ph/pencil'
import { useEffect } from 'react'
import { QuestionStoreForPagination } from '../../../../../../zustand/QuestionStoreForPagination'
import { EditOrDeleteQuestionColumns } from '../../../../../../table/TableColumns/EditOrDeleteQuestionsTable/EditOrDeleteQuestionsColumns'
import { CreateTable } from '../../../../../../table/CreateTable'
import * as styles from '../../../../../operator-layout/modalEnter.css'
import { QuestionStore } from '../../../../../../zustand/QuestionStore'
import { QuestionModal } from '../questions-modal/QuestionModal'
import { paginationStore } from '../../../../../../zustand/paginationStore'
import { getQuestions } from '../../../../../../fetch/Questions/getQuestions'
import type { IQuestion } from '../../../../../../interfaces'
export function EditOrDeleteQuestion(props: { type: string }) {
  const [openModal, modal] = useDisclosure(false)
  const { setIsLoading, setCount, pageIndex, pageSize, reset, setPageIndex } = paginationStore()
  const { QuestionsP, setQuestionsP } = QuestionStoreForPagination()// obtenemos el estado actual de las preguntas de zzzustand
  const columns = EditOrDeleteQuestionColumns(modal.close)

  const getQuestionsFromBD = async() => {
    reset()
    setIsLoading(true)
    try {
      await getQuestions(pageSize, pageIndex + 1)
        .then((data) => {
          console.log('dataInFetch:', data.data.count)
          setQuestionsP(data.data.result)
          setCount(data.data.count)
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal
        opened={openModal}
        onClose={modal.close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 100 }}
        className="modalResp"
        size="responsive"
      >
        <Modal.Title className={styles.dialogTitle}>Preguntas</Modal.Title>
        <QuestionModal onSave={data => console.log(data)} type={props.type} />
        <CreateTable data={QuestionsP} columns={columns} searchInTable={false} />
      </Modal>
      <Group position="center">
        <button
          className={styles.checklistButtons}
          onClick={() => {
            getQuestionsFromBD()
            modal.open()
          }}
        >
          <Icon icon={iconEdit} />
          Administrar Preguntas
        </button>
      </Group>
    </>
  )
}
