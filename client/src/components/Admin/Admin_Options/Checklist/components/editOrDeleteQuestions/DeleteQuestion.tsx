import { useDisclosure } from '@mantine/hooks'
import { Alert, Button, Group, Modal } from '@mantine/core'
import deleteIcon from '@iconify-icons/ph/trash'
import warningIcon from '@iconify-icons/ph/seal-warning'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { paginationStore } from '../../../../../../zustand/paginationStore'
import { getQuestions } from '../../../../../../fetch/Questions/getQuestions'
import { deleteQuestion } from '../../../../../../fetch/Questions/deleteQuestion'
import { errorNotification, successDeleteQuestion } from '../../../../../Notifications/notifications'
import { QuestionStore } from '../../../../../../zustand/QuestionStore'
import * as styles from '../../../../../operator-layout/modalEnter.css'
import { QuestionStoreForPagination } from '../../../../../../zustand/QuestionStoreForPagination'
import { getQuestionsByType } from '../../../../../../fetch/Questions/getQuestionsByType'

export function DeleteQuestion(props:
{
  editQuestionId: string
  editQuestionName: string
  editQuestioType: string
  closeModal: () => void
}) {
  console.log('1.1YPE IN DELETE:', props.editQuestioType)
  console.log('1.1NAME IN DELETE:', props.editQuestionName)
  const { pageIndex, pageSize, setCount } = paginationStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const { setQuestions } = QuestionStore()
  const { setQuestionsP } = QuestionStoreForPagination()
  const handleClick = () => {
    setDisabledButton(false)
    open()
  }

  const handleDelete = async() => {
    setDisabledButton(true)
    try {
      await deleteQuestion(props.editQuestionId)
        .then((response) => {
          console.log('responseDelete:', response)
          toast.success(response.message)
          close()
        })
    } catch (error) {
      toast.error('Error Inesperado al Eliminar La Pregunta')
    }
    try {
      await getQuestions(pageSize, pageIndex + 1)
        .then((response) => {
          setQuestionsP(response.data.result)
          setCount(response.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Preguntas')
    }
    try {
      await getQuestionsByType(props.editQuestioType)
        .then((response) => {
          setQuestions(response.data)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Preguntas')
    }
    // setDisabledButton(true)
    // try {
    //   await deleteQuestion(props.editQuestionId)
    //     .then((ev) => {
    //       toast.success('Pregunta eliminada correctamente')
    //     })
    //     .catch(e => console.log(e))
    //   await getQuestions(pageSize, pageIndex + 1)
    //     .then((data) => {
    //       setQuestions(data.data.result)
    //     })
    // } catch (error) {
    //   errorNotification()
    // }
  }

  return (
    <>
      <Modal style={{ borderColor: 'red' }} opened={opened} onClose={close} withCloseButton={false} centered>
        <Modal.Title className={styles.dialogTitle}>Eliminando {props.editQuestionName}</Modal.Title>
        <Alert icon={<Icon icon={warningIcon} />} title="Precaución" color="red">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {`Si eliminas la pregunta ya no estara disponible para los ${props.editQuestioType} ¿deseas eliminarla?`}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '0.5rem' }} />
          </div>
        </Alert>
        <div className={styles.saveContainer}>
          <button className={styles.button} onClick={handleDelete} disabled={disabledButton}>Si</button>
          <button onClick={close} className={styles.closeButton}>No</button>
        </div>
      </Modal>

      <Group position="center">
        <Button
          size="xs"
          onClick={handleClick}
          style={{ marginBottom: '0.1rem' }}
          color="red"
        ><Icon icon={deleteIcon} style={{ marginRight: '0.3rem' }} /> Eliminar
        </Button>
      </Group>
    </>
  )
}
