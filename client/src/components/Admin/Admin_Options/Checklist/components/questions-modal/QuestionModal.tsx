import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { Checkbox, Group, Input, Modal } from '@mantine/core'
import iconX from '@iconify-icons/ph/x'
import '../../../../../operator-layout/responsive.css'
import iconCheck from '@iconify-icons/ph/check'
import iconArticle from '@iconify-icons/ph/article'
import { toast } from 'react-hot-toast'
import { getQuestionsByType } from '../../../../../../fetch/Questions/getQuestionsByType'
import { QuestionStoreForPagination } from '../../../../../../zustand/QuestionStoreForPagination'
import { paginationStore } from '../../../../../../zustand/paginationStore'
import { getQuestions } from '../../../../../../fetch/Questions/getQuestions'

import * as styles from '../../../../../operator-layout/modalEnter.css'
import { QuestionStore } from '../../../../../../zustand/QuestionStore'
import { postQuestion } from '../../../../../../fetch/Questions/postQuestion'
import type { IQuestion } from '../../../../../../interfaces'

export function QuestionModal(props: { onSave: (data: { name: string }) => void, type?: string }) {
  const [name, setName] = useState('')
  const [opened, { open, close }] = useDisclosure(false)
  const [type, setSelectedCheckbox] = useState(props.type)
  const { Questions, setQuestions } = QuestionStore()
  const { QuestionsP, setQuestionsP } = QuestionStoreForPagination()// obtenemos el estado actual de las preguntas de zzzustand
  const {
    pageIndex,
    pageSize,
    setCount,
    setIsLoading,
    reset,
    setPageIndex,
  } = paginationStore()
  useEffect(() => {
    console.log('seteando esto al abrir')
    reset()
  }, [])
  // Damos el valor al checkbox
  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value)
  }
  // useEffect(() => {
  //   // Este código se ejecutará cuando el componente se monte

  //   // Devuelve una función que se ejecutará antes del desmontaje del componente
  //   return () => {
  //     reset()
  //     console.log('El componente se está desmontando')
  //     // Puedes realizar acciones de limpieza aquí si es necesario
  //   }
  // }, []) // Arreglo de dependencias vacío para que se ejecute una sola vez
  // // remplazamos trpc por Fetch API

  async function showMessage() {
    const newQuestion: IQuestion = {
      name,
      organizationId: '',
      type: type || '',
      status: true,
    }
    try {
      if (name === '') {
        toast.error('Debe ingresar un nombre')
      } else {
        await postQuestion(newQuestion)
          .then((data) => {
            if (data.ok) {
              toast.success(data.message)
              close()
            } else { toast.error(data.message) }
          })

        await getQuestions(pageSize, pageIndex + 1)
          .then((data) => {
            setQuestionsP(data.data.result)
            setCount(data.data.count)
          })
        await getQuestionsByType(props.type)
          .then((data) => {
            setQuestions(data.data)
          })
      }
    } catch (error) {
      toast.error('Error Inesperado al Crear la Pregunta')
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
      >
        <Modal.Title className={styles.dialogTitle}>Agregar Pregunta</Modal.Title>
        <Modal.Body>
          <Input
            placeholder="Nombre"
            onChange={(data) => {
              setName(data.target.value)
            }}
          />
          <div className={styles.checkBoxContainer}>
            <Checkbox
              label="Vehiculo"
              value="vehicle"
              checked={type === 'vehicle'}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              label="Trailer"
              value="trailer"
              checked={type === 'trailer'}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={styles.saveContainerChecklist}>
            <button className={styles.button} onClick={showMessage}>
              Guardar
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <button className={styles.checklistButtons} onClick={open}>
          <Icon icon={iconArticle} />
          Agregar Preguntas
        </button>
      </Group>
    </>
  )
}
