/* eslint-disable @typescript-eslint/space-before-function-paren */

import { Group, Indicator, Modal } from '@mantine/core'
import { Icon } from '@iconify/react'
import checkList from '@iconify-icons/ph/check'
import deleteIcon from '@iconify-icons/ph/trash'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'

import { showNotification } from '@mantine/notifications'
import { createId } from '@paralleldrive/cuid2'
import toast from 'react-hot-toast'
import { EntranceUnitStore } from '../../../zustand/EntraceUnitStore'
import { ExitUnitStore } from '../../../zustand/ExitUnitStore'
import { Signature } from '../../Common/Signature/SIgnaturePad'

import { responseStore } from '../../../zustand/responseStore'
import { ChecklistStore, checklistStore } from '../../../zustand/checklistStore'
import { SignatureStore } from '../../../zustand/SignatureStore'
import * as styles from './checklist.css'
import { Questions } from './questionsExit'
import type { IChecklist, IFile, IQuestion, IResponse, ITrailer } from '../../../interfaces'

export function Checklist(props:
{
  onSave: (data: IChecklist) => void
  Questions?: Array<IQuestion>
  Checklist?: IChecklist
  plates?: string
  response?: IResponse
  unitId?: string
  isExit?: boolean
  trailer?: ITrailer
}) {
  const [open, setOpen] = useState(false)
  const { responses, resetResponses, setResponses, addResponse } = responseStore()
  const { entrance } = EntranceUnitStore()
  const { ExitUnit } = ExitUnitStore()
  const [responsesEdit, setResponsesEdit] = useState<IResponse>(responses.find(r => r.id === props.unitId))
  const { signature, dropSignature } = SignatureStore()
  const { checklistStore, addChecklist, Checklists, getChecklists } = ChecklistStore()
  const [showSignature, setShowSignature] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  const arrayChecklist = getChecklists()
  let isEqualized = false

  for (let i = 0; i < arrayChecklist.length; i++) {
    console.log('1.47: arrayChecklist[i].Trailer?.id:', arrayChecklist[i].Trailer?.id)
    console.log('1.47: props.unitId:', props.unitId)
    if (arrayChecklist[i].Trailer?.id === props.unitId) {
      console.log('1.47: Hay coincidencia de IDs en el puesto', i)
      isEqualized = true
    } else { console.log('1.47: No Hay coincidencia de IDs en el puesto', i) }
  }

  useEffect(() => {
    if (props.unitId && responsesEdit) {
      setResponses(responses)
      console.log('1.38: setResponses Enviadas:', responses)
    } else if (props.Checklist && props.Checklist.Responses) {
      setResponses(props.Checklist.Responses)
      console.log('1.38: setResponses Enviadas:', props.Checklist?.Responses)
    }
    console.log('1.39: responsesEdit:', responses.find(r => r.id === props.unitId))
    console.log('1.40: trailerId:', props.unitId)
  }, [props.Checklist, props.unitId, setResponses, responses, responsesEdit])

  useEffect(() => {
    if (!signature?.base64)
      setShowSignature(true)
    else
      setShowSignature(false)
  }, [signature])

  const handleSave = async () => {
    try {
      console.log('1.38: Props.Checklist pre-save:', props.Checklist)
      console.log('1.38Q: Props.Questions pre-save:', props.Questions)
      console.log('1.38: Props.response pre-save:', props.response)
      const sigId = `${createId()}`
      let missigResponseQuestion = []
      if (props.Questions)
        missigResponseQuestion = props.Questions.filter(question => !responses.some(response => response.questionId === question.id))
      if (props.response)
        return
      if (missigResponseQuestion.length > 0) {
        toast.error('Error: Todas las preguntas deben de ser respondidas')
        return
      }

      const nuevoChecklist: IChecklist = {
        identification: '',
        isSigned: false,
        organizationId: '',
        Trailer: props.trailer,
        trailerId: props.unitId,
      }

      if (!isEqualized) {
        console.log('1.47: Se agregará un nuevo checklist')
        addChecklist(nuevoChecklist)
      } else { console.log('1.47: No se agregará un nuevo checklist debido a que solo se está editando el anterior') }

      console.log('1.42: newChecklistTrailer:', Checklists)
      const newCheklistTrailer = Checklists.map((ch) => {
        console.log('1.42: newChecklistTrailer 2.0:', ch.trailerId, props.unitId, Checklist.length)

        if (ch.trailerId === props.unitId)
          return ch.Trailer
      })
      console.log('1.42: newChecklistTrailer 3.0:', newCheklistTrailer)
      console.log('1.43: getChecklist:', arrayChecklist)
      // // Verificar si hay preguntas 'no' sin datos en Files
      const missingFilesResponses = responses.filter(response => response.response === 'no' && (!response.File || response.File.length === 0))
      if (missingFilesResponses.length > 0) {
        toast.error('Error: Las preguntas que no cumplan, necesita tomar foto de evidencia')
        return
      }

      if (!signature.base64) {
        toast.error('Error: El checklist, necesita firma de verificación')
        return
      }

      // const data: IChecklist = {
      //   Responses: responses,
      //   signature,
      //   isSign: false,
      //   identification: sigId,
      // }

      const prevResponse = props

      const newCheklist: IChecklist = {
        isSigned: true,
        identification: sigId,
        organizationId: '',
        Responses: responses,
        File: [],
      }

      const newSignature: IFile = {
        name: `${newCheklist.identification}_signature.png`,
        size: 0,
        type: 'png',
        url: '',
        organizationId: '',
        base64: signature.base64,
      }

      newCheklist.File?.push(newSignature)

      console.log('responseANTES:', responses)
      console.log('prevResponse:', prevResponse)
      props.onSave(newCheklist)
      // resetResponses()

      dropSignature()
      setOpen(false)
      setIsSaved(true)
      showNotification({
        title: 'Checklist Guardado Exitosamente!!',
        message: '',
        color: 'green',
      })
      console.log('1.38: Props.Checklist post-save:', props.Checklist)
      console.log('1.38: Props.Questions post-save:', props.Questions)
      console.log('1.38: Props.response post-save:', props.response)
    } catch (error: any) {
      showNotification({
        title: 'Error',
        message: error.message,
        color: 'red',
      })
      console.log('Error:', error)
    }
  }

  return (
    <>
      <Group className={isSaved ? styles.iconChecklist : styles.iconChecklistFalse} onClick={() => setOpen(true)}>
        <Indicator
          color="red"
          position="top-end"
          radius="lg"
          size={18}
          withBorder
          label="!"
          disabled={isSaved}
        >
          <button><Icon className={isSaved ? '' : styles.diabled} icon={checkList} />Inspección</button>
        </Indicator>
      </Group>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 600 }}
      >
        <Modal.Title className={styles.dialogTitle}>Inspección | {props.plates}</Modal.Title>
        <div>
          <div>
            <Questions data={props.Questions} trailerId={props.unitId} trailer={props.trailer} isExit={props.isExit} />
            {showSignature && !signature?.base64 && <Signature />}
            {signature?.base64 && (
            <div className={styles.imageContainer}>
              <img src={signature.base64} className={styles.image} />
              <Icon className={styles.deleteIcon} onClick={() => { dropSignature(); setShowSignature(true) }} icon={deleteIcon} />
            </div>)
            }
          </div>
          <div>
            <div className={styles.saveContainer}>
              <button onClick={() => setOpen(false)} className={styles.closeButton}>Cerrar</button>
              <button className={styles.saveButton} onClick={handleSave}>Guardar</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
