import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Input, Modal } from '@mantine/core'
import editIcon from '@iconify-icons/ph/pencil'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getQuestionsByType } from '../../../../../../fetch/Questions/getQuestionsByType'
import { QuestionStoreForPagination } from '../../../../../../zustand/QuestionStoreForPagination'
import { getQuestions } from '../../../../../../fetch/Questions/getQuestions'
import { putQuestion } from '../../../../../../fetch/Questions/putQuestion'
import { QuestionStore } from '../../../../../../zustand/QuestionStore'
import { errorNotification, successUpdateQuestion } from '../../../../../Notifications/notifications'
import * as styles from '../../../../../operator-layout/modalEnter.css'
import { paginationStore } from '../../../../../../zustand/paginationStore'

export function EditQuestion(props:
{
  editQuestionId: string
  editQuestionName: string
  editQuestioType: string
  closeModal: () => void
}) {
  console.log('1.1TYPE:', props.editQuestioType)
  console.log('1.1NAME:', props.editQuestionName)
  const [opened, { open, close }] = useDisclosure(false)
  const [question, setQuestion] = useState('')
  const [disabledButton, setDisabledButton] = useState(false)
  const { pageSize, pageIndex, setCount } = paginationStore()
  const { setQuestionsP } = QuestionStoreForPagination()
  const { updateQuestion } = QuestionStore(state => ({
    updateQuestion: state.updateQuestion,
  }))
  const { setQuestions } = QuestionStore()

  const handleClick = () => {
    setDisabledButton(false)
    open()
  }
  const handleChange = (ev) => {
    setQuestion(ev)
  }
  const handleSave = async() => {
    setDisabledButton(true)
    const updatedQuestion = {
      id: props.editQuestionId,
      name: question,
      type: props.editQuestioType,
    }
    console.log('updatedQuestion: ', updatedQuestion)
    try {
      await putQuestion(updatedQuestion)
        .then((data) => {
          if (data.ok) {
            console.log('dataQuestionUpdate:', data)
            toast.success(data.message)
          } else { toast.error(data.message) }
        })
    } catch (error) {
      toast.error('Error Inesperado al Actualizar la Pregunta')
    }
    try {
      await getQuestions(pageSize, pageIndex + 1)
        .then((data) => {
          setQuestionsP(data.data.result)
          setCount(data.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Preguntas')
    }
    try {
      await getQuestionsByType(props.editQuestioType)
        .then((data) => {
          setQuestions(data.data)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Preguntas')
    }
    // try {
    //   await putQuestion(updatedQuestion)
    //     .then((ev) => {
    //       toast.success('Pregunta editada correctamente')
    //       updateQuestion(ev.data)
    //     })
    //     .catch(e => console.log(e))
    // } catch (error) {
    //   errorNotification()
    // }
  }

  return (
    <>
      <Modal style={{ borderColor: 'red' }} opened={opened} onClose={close} withCloseButton={false} centered>
        <Modal.Title className={styles.dialogTitle}>Editar Pregunta</Modal.Title>
        <Input.Wrapper
          style={{ display: 'flex', flexDirection: 'column' }}
          withAsterisk
          label={`Ingresa un Nuevo Nombre para la Pregunta: ${props.editQuestionName}`}
          onChange={ev => handleChange(ev.target.value)}
        >
          <Input style={{ marginTop: '1rem' }} id="input-demo" placeholder="Nueva Pregunta" />
          <Button onClick={handleSave} style={{ marginTop: '1rem' }} disabled={(question === '') || (question === props.editQuestionName) || (disabledButton)}>
            Guardar
          </Button>
        </Input.Wrapper>
      </Modal>

      <Group position="center">
        <Button
          size="xs"
          onClick={handleClick}
          style={{ marginBottom: '0.1rem' }}
        ><Icon icon={editIcon} style={{ marginRight: '0.3rem' }} /> Editar
        </Button>
      </Group>
    </>
  )
}
