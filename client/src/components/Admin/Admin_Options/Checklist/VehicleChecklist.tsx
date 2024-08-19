/* eslint-disable import/order */
import { Accordion } from '@mantine/core'
import * as styles from './Checklit.css'
import '../../../operator-layout/responsive.css'
import { QuestionStore } from '../../../../zustand/QuestionStore'
import { vehicleTypeStore } from '../../../../zustand/VehicleTypeStore'
import { getQuestions } from '../../../../fetch/Questions/getQuestions'
import { getVehicleTypes } from '../../../../fetch/VehicleTypes/getVehicleTypes'
import { Header } from '../../../Common/Header/Header'
import { ListComponent } from './components/List/ListComponent'
import { AddUnitType } from './components/add-unit-type-modal/AddUnitTypeModal'
import { QuestionModal } from './components/questions-modal/QuestionModal'
import { EditOrDeleteQuestion } from './components/editOrDeleteQuestions/EditOrDeleteQuestions'
import { useEffect } from 'react'
import { paginationStore } from '../../../../zustand/paginationStore'
import { getQuestionsByType } from '../../../../fetch/Questions/getQuestionsByType'
import { QuestionStoreForPagination } from '../../../../zustand/QuestionStoreForPagination'

export function VehicleTypeChecklist() {
  const { setIsLoading, setCount, pageIndex, pageSize } = paginationStore()
  const { setQuestions } = QuestionStore()
  const { setQuestionsP } = QuestionStoreForPagination()
  const { vehicleTypes, resetVehicleType, setVehicleTypes, fetchControl, setFetchControl } = vehicleTypeStore()
  // Nos traemos las questions de la BD y vehiculos
  useEffect(() => {
    async function getVehicles() {
      const vehicles = await getVehicleTypes()
      setVehicleTypes(vehicles.data)
      setFetchControl(false)
    }
    getVehicles()
  }, [fetchControl])

  // use Effect para preguntas sin paginacion
  useEffect(() => {
    const getQuestionsFromBD = async() => {
      setIsLoading(true)
      try {
        await getQuestionsByType('vehicle')
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
      <Header title="Checklist Vehículos" />
      <div className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          <AddUnitType />
          {/* <QuestionModal onSave={data => console.log(data)} type="vehicle" /> */}
          <EditOrDeleteQuestion type="vehicle" />
        </div>
        <div className={styles.listContainer}>
          <Accordion style={{ width: '90%' }}>
            <ListComponent />
          </Accordion>
        </div>
      </div>
    </div>
  )
}
