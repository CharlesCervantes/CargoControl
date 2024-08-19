/* eslint-disable @typescript-eslint/indent */

import { useEffect, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'
import { connection } from '../../../env'
import { Camera } from '../../../components/Common/Camera/Cheklist'
import { EntranceUnitStore } from '../../../zustand/EntraceUnitStore'
import { ExitUnitStore } from '../../../zustand/ExitUnitStore'
import { responseStore } from '../../../zustand/responseStore'
import { responsesMajorStore } from '../../../zustand/responsesMajorStore'
import { ChecklistStore } from '../../../zustand/checklistStore'
import * as styles from './checklist.css'
import type { IChecklist, IQuestion, IResponse, ITrailer } from '../../../interfaces'

type Answer = 'si' | 'no' | 'no aplica' | 'tomar foto'

export interface IAssignableChecklistResponses {
  checklist: IChecklist
  response1: IResponse
  response2: IResponse
  response3: IResponse
}

export function Questions(props: { data?: Array<IQuestion>, trailerId: string, trailer: ITrailer, isExit: Boolean }) {
  const { addResponse, responses, setResponses, getResponses } = responseStore()
  const { addMajorResponse, setMajorResponses, getMajorResponses } = responsesMajorStore()
  const [responsesEdit, setResponsesEdit] = useState<IResponse>(responses.find(r => r.id === props.unitId))
  const { Checklists, getChecklists } = ChecklistStore()
  const response = getChecklists()
  const responsesGet = getResponses()
  const responsesMajorGet = getMajorResponses()
  const { entrance } = EntranceUnitStore()
  const { ExitUnit } = ExitUnitStore()
  let newResponses: IAssignableChecklistResponses

  console.log('1.46: getChecklist:', response)
  console.log('1.46: getResponses:', responsesGet)
  console.log('1.46: getMajorResponses:', responsesMajorGet)

  if (!props.data || props.data.length === 0)
    return <div>No necesita checklist</div>

  const newCheklistTrailer = Checklists.map((ch) => {
        console.log('1.44: newChecklistTrailer:', ch.trailerId, props.trailerId, Questions.length)

    if (ch.trailerId === props.trailerId) {
      console.log('1.44: Ambos IDs coinciden')
      return <div key={undefined}>{ch.Trailer?.number}</div>
    }
  })

  if (response.length > 0) {
    for (let i = 0; i < response.length; i++) {
      if (response[i].Trailer?.id === props.trailerId) {
        console.log('1.46: El ID', response[i].Trailer?.id, 'coincide y fue encontrado en el puesto', i)
        const initialDiffer = ((i + 1) * 2) + i
        const assignResponses: IAssignableChecklistResponses = {
          checklist: response[i],
          response1: responsesGet[initialDiffer - 2],
          response2: responsesGet[initialDiffer - 1],
          response3: responsesGet[initialDiffer],
        }
        newResponses = assignResponses
        console.log('1.46: assignResponses:', assignResponses)
      }
    }
  }

  console.log('1.38: responsesEdit:', responsesEdit)

  // Encuentra las respuestas correspondientes al trailer específico
  const trailerResponses = responses.filter(response => response.id === props.trailerId)
  console.log('1.40: trailerResponses:', trailerResponses)

  // Manejo de la captura de imágenes
  const handleImage = (questionId: string, image: any) => {
    const index = responses.findIndex(response => response.questionId === questionId)
    if (index === -1) {
      const identification = createId()
      const idResponse = responses[index].id
      const newResponse: IResponse = {
        id: idResponse,
        response: 'no',
        questionId,
        File: [
          {
            name: `${identification}_${createId()}_response.png`,
            size: 0,
            type: 'png',
            url: `${connection}/image/${identification}_response.png`,
            base64: image,
            organizationId: '',
          },
        ],
        checklistId: '',
        identification: `${identification}`,
        organizationId: '',
      }
      addResponse(newResponse)
      addMajorResponse(newResponse)
      console.log('addResponse:', responses)
    } else {
      const updatedResponse = { ...responses[index] }
      const updatedResponses = [...responses]
      updatedResponses[index] = updatedResponse
      setResponses(updatedResponses)
      // setMajorResponses(updatedResponses)
      updatedResponse.File?.push({
        base64: image,
        name: `${updatedResponse.identification}_${createId()}_response.png`,
        size: 0,
        type: 'png',
        url: `${connection}/image/${updatedResponse.identification}_response.png`,
        organizationId: '',
      })
      updatedResponses[index] = updatedResponse
      console.log('1.41: setResponses:', responses)
    }
  }

  // Manejo de la selección de respuestas
  function handleAnswer(questionId: string, answer: Answer) {
    const index = responses.findIndex(response => response.questionId === questionId)
    if (index === -1) {
      const identification = createId()

      const newResponse: IResponse = {
        questionId,
        File: [],
        checklistId: '',
        identification,
        response: answer,
        organizationId: '',
      }
      addResponse(newResponse)
      addMajorResponse(newResponse)
    } else {
      const updatedResponse = { ...responses[index], response: answer }
      const updatedResponses = [...responses]
      updatedResponses[index] = updatedResponse
      setResponses(updatedResponses)
      // setMajorResponses(updatedResponses)
    }
    setResponses(response[response.length].Responses)
    const updatedCorrespondingResponse = responses.find(item => item.questionId === questionId)
    const correspondingResponseValue = response.find(item => item.Trailer?.id === props.trailerId)?.Responses
  }

  return (
    <div className={styles.divider}>
      {/* <div className={styles.answerStyle}>
        {newResponses?.response1?.response && props.isExit && (
        <div>
          Pregunta 1: {newResponses?.response1?.response}
        </div>
        )}
        {newResponses?.response2?.response && props.isExit && (
        <div>
          Pregunta 2: {newResponses?.response2?.response}
        </div>
        )}
        {newResponses?.response3?.response && props.isExit && (
        <div>
          Pregunta 3: {newResponses?.response3?.response}
        </div>
        )}
      </div> */}
      <div className={styles.breakDivider} />
      {/* {Checklists.map((checklist, index) => { */}
      {props.data?.map((question, index) => {
        console.log('1500:props.data:', props.data)
        // Encuentra la respuesta para la pregunta actual
        const correspondingResponse = responses.find(item => item.questionId === question.id)
        const correspondingResponse2 = trailerResponses.find(item => item.questionId === question.id)
        console.log('1.45: question:', question)
        console.log('1.45: correspondingResponse:', correspondingResponse)
        console.log('1.45: correspondingResponse2:', correspondingResponse2)

        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionNumber}>{index + 1}</div>
            <div className={styles.question}>{question.name}</div>
            <div className={styles.answers}>
              {/* Botones de respuesta */}
              <button
                className={`${correspondingResponse?.response === 'si' ? styles.active : styles.answerButton}`}
                onClick={() => handleAnswer(question.id, 'si')}
              >
                Sí
              </button>
              <button
                className={`${correspondingResponse?.response === 'no' ? styles.active : styles.answerButton}`}
                onClick={() => handleAnswer(question.id, 'no')}
              >
                No
              </button>
              <button
                className={`${correspondingResponse?.response === 'no aplica' ? styles.active : styles.answerButton}`}
                onClick={() => handleAnswer(question.id, 'no aplica')}
              >
                No aplica
              </button>

              {/* Mostrar la respuesta si ya existe */}
              {/* {correspondingResponse && (
              <div className={styles.question}>{correspondingResponse.response}</div>)} */}

              {/* Renderizado condicional de la cámara */}
              {correspondingResponse
                ? (
                  <Camera
                    response={correspondingResponse}
                    disabled={false}
                    Image={(image: any) => handleImage(question.id, image)}
                    title={question.name}
                  />
                )
                : (
                  <Camera
                    Image={undefined}
                    response={undefined}
                    disabled
                    title={question.name}
                  />
                )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
