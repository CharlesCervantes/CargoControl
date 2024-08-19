import { Accordion } from '@mantine/core'
import styles from '../Checklist/VehicleType.module.scss'
import { QuestionModal } from './components/questions-modal/QuestionModal'
import { AddUnitType } from './components/add-unit-type-modal/AddUnitTypeModal'
import { ListComponent } from './components/List/ListComponent'

export function VehicleTypeChecklist() {
  return (
    <div className={styles.TrailerChecklist__Container} >
      <h1>Checklist de Remolques</h1>

      <div className={styles.buttonContainer}>
        <AddUnitType />s
        <QuestionModal onSave={data => console.log('')} />
      </div>
      <div>
        <Accordion>
          <ListComponent />
        </Accordion>
      </div>
    </div>
  )
}
