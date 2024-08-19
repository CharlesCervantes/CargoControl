import { useEffect, useState } from 'react'
import { Button, TransferList } from '@mantine/core'
import toast from 'react-hot-toast'
import { postQuestionByType } from '../../../../../../fetch/Questions/postQuestionByType'
import type { QuestionsEntity } from '../../../../../../interfaces'
import type { TransferListData } from '@mantine/core'

export function TransferListPanel(props: { myQuestions?: Array<QuestionsEntity>, notMyQuestions?: Array<QuestionsEntity>, id: string, type: string }) {
  const [data, setData] = useState<TransferListData>([[], []])
  const questionsC = props.myQuestions
    ? props.myQuestions.map(element => ({ label: element.name, value: element.id }))
    : []

  const questionsD = props.notMyQuestions && props.myQuestions
    ? props.notMyQuestions.filter(question => !props.myQuestions.some(q => q.id === question.id)).map(element => ({ label: element.name, value: element.id }))
    : []

        .map(element => ({ label: element.name, value: element.id })) || []

  const initialValues: TransferListData = [
    questionsC,
    questionsD,
  ]

  useEffect(() => {
    setData(initialValues)
  }, [props.myQuestions, props.notMyQuestions])

  async function save() {
    const connect = data[0].map((item) => {
      return { id: item.value }
    })

    const disconnect = data[1].map((item) => {
      return { id: item.value }
    })

    const request = {
      id: props.id,
      connect,
      disconnect,
    }

    try {
      await postQuestionByType(props.type, request)
      toast.success('Guardado correctamente')
    } catch (error) {
      console.error('Error connecting questions:', error)
    }
  }

  return (
    <div>
      <TransferList
        value={data}
        onChange={setData}
        searchPlaceholder="Buscar. . ."
        nothingFound="Sin información para mostrar"
        titles={['Seleccionadas', 'Disponibles']}
        breakpoint="sm"
      />
      <Button onClick={save} style={{ marginTop: '0.5rem' }}>Guardar</Button>
    </div>
  )
}
