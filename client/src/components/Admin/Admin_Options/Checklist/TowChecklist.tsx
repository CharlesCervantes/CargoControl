import { Accordion } from '@mantine/core'
import { useEffect } from 'react'
import { getTrailerTypes } from '../../../../fetch/TrailerTypes/getTrailerTypes'
import { getQuestions } from '../../../../fetch/Questions/getQuestions'
import { QuestionStore } from '../../../../zustand/QuestionStore'
import * as styles from '../../../../components/Admin/Admin_Options/Checklist/Checklit.css'
import { trailerTypeStore } from '../../../../zustand/TrailerTypeStore'
import { Header } from '../../../Common/Header/Header'
import { paginationStore } from '../../../../zustand/paginationStore'
import { QuestionStoreForPagination } from '../../../../zustand/QuestionStoreForPagination'
import { getQuestionsByType } from '../../../../fetch/Questions/getQuestionsByType'
import { QuestionModal } from './components/questions-modal/QuestionModal'
import { AddTrilerType } from './components/add-triler-type/Add-trailer-type-model'
import { TrailerTypeList } from './components/List/Trailer-type-list'
import { EditOrDeleteQuestion } from './components/editOrDeleteQuestions/EditOrDeleteQuestions'

export function TrailerTypeChecklist() {
  const {
    pageIndex,
    pageSize,
    setCount,
    count,
    setIsLoading,
  } = paginationStore()
  const { setQuestions } = QuestionStore()
  const { setQuestionsP } = QuestionStoreForPagination()

  const { setTrailerTypes, setFetchControl, fetchControl } = trailerTypeStore()
  // Nos traemos las questions y los trailers de la BD
  useEffect(() => {
    async function getTrailers() {
      const trailers = await getTrailerTypes()
      setTrailerTypes(trailers.data)
      setFetchControl(false)
    }
    getTrailers()
  }, [fetchControl])

  // use Effect para preguntas sin paginacion
  useEffect(() => {
    const getQuestionsFromBD = async() => {
      setIsLoading(true)
      try {
        await getQuestionsByType('trailer')
          .then((data) => {
            setQuestions(data.data)
            setCount(data.data.count)
            setIsLoading(false)
          })
      } catch (error) {
        setIsLoading(false)
      }
    }
    getQuestionsFromBD()
  }, [])

  // useEffect para preguntas con paginacion
  useEffect(() => {
    const getQuestionsFromBD = async() => {
      setIsLoading(true)
      try {
        await getQuestions(pageSize, pageIndex + 1)
          .then((data) => {
            setQuestionsP(data.data.result)
            setCount(data.data.count)
            setIsLoading(false)
          })
      } catch (error) {
        setIsLoading(false)
      }
    }
    getQuestionsFromBD()
  }, [pageSize, pageIndex])

  return (
    <div className={styles.container} >
      <Header title="Checklist Remolques" />
      <div className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          <AddTrilerType />
          {/* <QuestionModal onSave={data => console.log(data)} type="trailer" /> */}
          <EditOrDeleteQuestion type="trailer" />
        </div>
        <div className={styles.listContainer}>
          <Accordion style={{ width: '90%' }}>
            <TrailerTypeList />
          </Accordion>
        </div>
      </div>
    </div>
  )
}
