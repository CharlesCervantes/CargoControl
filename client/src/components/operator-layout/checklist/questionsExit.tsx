/* eslint-disable @typescript-eslint/indent */

import { React, useEffect, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'
import prisma from '../../../../../server/src/prisma'
import { connection } from '../../../env'
import { Camera } from '../../../components/Common/Camera/Cheklist'
import { EntranceUnitStore } from '../../../zustand/EntraceUnitStore'
import { ExitUnitStore } from '../../../zustand/ExitUnitStore'
import { responseStore } from '../../../zustand/responseStore'
import { responsesMajorStore } from '../../../zustand/responsesMajorStore'
import { ChecklistStore } from '../../../zustand/checklistStore'
import { trailerStore } from '../../../zustand/TrailerStore'
import { vehicleStore } from '../../../zustand/VehicleStore'
import { driverStore } from '../../../zustand/DriverStore'
import { getDriversInside } from '../../../fetch/Drivers/getDriversInside'
import { getVehiclesInside } from '../../../fetch/Vehicles/getVehiclesInside'
import { getTrailersInside } from '../../../fetch/Trailers/getTrailersInside'
import * as styles from './checklist.css'
import type { IChecklist, IQuestion, IResponse, ITrailer } from '../../../interfaces'

type Answer = 'si' | 'no' | 'no aplica' | 'tomar foto'

export interface IAssignableChecklistResponses {
  checklist: IChecklist
  response1: IResponse
  response2: IResponse
  response3: IResponse
}

export function Questions(props: { data?: Array<IQuestion>, trailerId?: string, trailer?: ITrailer, isExit?: Boolean }) {
  const [isLoading, setIsLoading] = useState(true)
  const { addResponse, responses, setResponses, getResponses } = responseStore()
  const { addMajorResponse, setMajorResponses, getMajorResponses } = responsesMajorStore()
  const [responsesEdit, setResponsesEdit] = useState<IResponse>(responses.find(r => r.id === props.unitId))
  const [fetchedData, setFetchedData] = useState(null)
  const { Checklists, getChecklists } = ChecklistStore()
  const responseGetChecklist = getChecklists()
  const responsesGet = getResponses()
  const responsesMajorGet = getMajorResponses()
  const { entrance } = EntranceUnitStore()
  const { ExitUnit } = ExitUnitStore()
  const { setTrailer, Trailer } = trailerStore()
  const { setVehicles, Vehicle } = vehicleStore()
  const { setDrivers, Driver } = driverStore()
  const [trailers, setTrailers] = useState([])
  const [selectedResponses, setSelectedResponses] = useState({})
  let newResponses: IAssignableChecklistResponses
  const [targetedTrailer, setTargetedTrailer] = useState<ITrailer | null>(null)
  const [questionsWithResponses, setQuestionsWithResponses] = useState([])

  console.log('1.46: getChecklist:', responseGetChecklist)
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

  if (responseGetChecklist.length > 0) {
    for (let i = 0; i < responseGetChecklist.length; i++) {
      if (responseGetChecklist[i].Trailer?.id === props.trailerId) {
        console.log('1.46: El ID', responseGetChecklist[i].Trailer?.id, 'coincide y fue encontrado en el puesto', i)
        const initialDiffer = ((i + 1) * 2) + i
        const assignResponses: IAssignableChecklistResponses = {
          checklist: responseGetChecklist[i],
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
  const checklistItems = Checklists.map((checklist) => {
    // Filtrar las respuestas del checklist por el ID del trailer dentro del checklist
    const trailerResponses = checklist.Responses?.filter(response => response.Checklist?.Trailer?.id === props.trailerId)

    // Si no hay respuestas filtradas, se muestra un elemento li indicando que no hay respuestas
    if (!trailerResponses || trailerResponses.length === 0) {
      return (
        <li key={checklist.id}>
          Checklist:
          <ul>
            <li>No responses</li>
          </ul>
        </li>
      )
    }
  })

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
    setResponses(responseGetChecklist[responseGetChecklist.length].Responses)
    const updatedCorrespondingResponse = responses.find(item => item.questionId === questionId)
    const correspondingResponseValue = responseGetChecklist.find(item => item.Trailer?.id === props.trailerId)?.Responses
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function fetchData() {
      try {
        const driversData = await getDriversInside()
        setDrivers(driversData.data)
        const vehiclesData = await getVehiclesInside()
        setVehicles(vehiclesData.data)
        const trailersData = await getTrailersInside()
        setTrailer(trailersData.data)

        const data = {
          id: trailersData.data?.id || '',
          driver: driversData.data || null,
          entranceVehicle: vehiclesData.data || null,
          entranceTrailer: trailersData.data || [],
          exitVehicle: vehiclesData.data || null,
          exitTrailer: trailersData.data || [],
        }

        for (let i = 0; i < data.entranceTrailer.length; i++) {
          if (data.entranceTrailer[i].id === props.trailerId) {
            console.log('1.66: Trailer Encontrado:', data.entranceTrailer[i])
            setTargetedTrailer(data.entranceTrailer[i]) // Actualiza el estado local
            console.log('1.66: targetedTrailer:', targetedTrailer)
          }
        }

        console.log('1.66: Datos obtenidos de operator (questionsExit):', data)

        setFetchedData(data)
      } catch (error) {
        console.error('1.66: Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchTrailers = async() => {
      try {
        const response = await fetch('/api/trailers')
        const data = await response.json()
        setTrailers(data)
      } catch (error) {
        console.error('Error fetching trailers:', error)
      }
    }

    fetchTrailers()
  }, [])

  return (
    // <div className={styles.divider}>
    // <div className={styles.containerStyle}>
    <div>
      <div>
        {/* <ul>
          {Trailer.filter(trailer => trailer.id === props.trailerId).map(filteredTrailer => (
            <li key={filteredTrailer.id}>Número del Trailer: {filteredTrailer.number} Placas: {filteredTrailer.plate}</li>
        ))}
          </ul> */}

        <div>
          <ul>
            {Checklists.map((checklist) => {
          // Filtrar las respuestas del checklist por el ID del trailer dentro del checklist
              const filteredResponses = checklist.Responses?.filter(response => response.Checklist?.Trailer?.id === props.trailerId)
              console.log('1.65: props.trailerId:', props.trailerId)
              console.log('1.65: filteredResponses:', filteredResponses)
          // Si no hay respuestas filtradas, se muestra un elemento li indicando que no hay respuestas
          if (!filteredResponses || filteredResponses.length === 0) {
            return (
              <li key={checklist.id}>
                Checklist de Entrada:
                {/* <ul>
                  <li>No responses</li>
                </ul> */}
              </li>
            )
          }

          // Si hay respuestas filtradas, se muestra el checklist y las respuestas correspondientes
          return (
            <li key={checklist.id}>
              Checklist:
              <ul>
                {filteredResponses.map(response => (
                  <li key={response.id}>
                    {response.response} {/* Ajusta esto según las propiedades de IResponse que desees mostrar */}
                  </li>
                ))}
              </ul>
            </li>
          )
          })}
          </ul>
        </div>
      </div>
      {newResponses?.response1?.response && props.isExit && (
      <div className={styles.answerStyle}>
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
      </div>
      )}
      <div>
        {newResponses?.response1?.response && props.isExit && (
          <br />
        )}
      </div>

      {/* <div className={styles.breakDivider} /> */}
      {/* {Checklists.map((checklist, index) => { */}
      {props.data?.map((question, index) => {
        console.log('1500:props.data:', props.data)
        // Encuentra la respuesta para la pregunta actual
        const correspondingResponse = responses.find(item => item.questionId === question.id)
        console.log('1.45: question:', question)
        console.log('1.45: correspondingResponse:', correspondingResponse)

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
