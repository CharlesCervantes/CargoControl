
import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Title } from '@mantine/core'
// import { VehicleVisitor } from 'src/components/operator-layout/visitors-enter/vehicleVisit-form/vehicleVisitForm'
import { EntranceUnitStore } from '../../../zustand/EntraceUnitStore'
import { ExitUnitStore } from '../../../zustand/ExitUnitStore'
import { useVisitorEnterStore } from '../../../zustand/visitorEnterStore'
import { ExitVisitorStore } from '../../../zustand/ExitVisitorStore'
import { responseStore } from '../../../zustand/responseStore'
import * as styles from '../../Common/Render/Driver/DriverRender.css'

export function RemoveElement(props: { driver?: boolean, vehicle?: boolean, trailer?: boolean, visitor?: boolean, VehicleVisitor?: boolean, checklist?: boolean, trailerIndex?: string, message?: string, idVisitor?: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const {
    removeDriver,
    removeVehicle,
    removeTrailer,
  } = EntranceUnitStore()
  const {
    removeDriver2,
    removeVehicle2,
    removeTrailer2,
  } = ExitUnitStore()
  const {
    deleteVisitor,
    deleteVehicleVisitor,
  } = useVisitorEnterStore()
  const {
    deleteVisitor2,
    deleteVehicleVisitor2,
  } = ExitVisitorStore()
  const { resetResponses } = responseStore()

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title order={4}>¿Deseas Eliminar el {props.message !== '' ? props.message : 'Registro'}? </Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem' }}>
          <Button
            style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
            onClick={() => {
              console.log('Se está eliminando ', props)
              if (props.driver) {
                removeDriver()
                removeDriver2()
              }
              if (props.vehicle) {
                removeVehicle()
                removeVehicle2()
              }
              if (props.trailer) {
                removeTrailer(props.trailerIndex || '')
                removeTrailer2(props.trailerIndex || '')
              }
              if (props.visitor && props.idVisitor) {
                const visitorId = props.idVisitor
                deleteVisitor(visitorId)
                deleteVisitor2(visitorId)
              }
              if (props.VehicleVisitor) {
                deleteVehicleVisitor()
                deleteVehicleVisitor2()
              }
              if (props.checklist)
                resetResponses()
              console.log('Así quedó tras su eliminación ', props)
            }}
          >Si
          </Button>
          <Button style={{ paddingLeft: '2rem', paddingRight: '2rem' }} onClick={close} color="red">No</Button>
        </div>
      </Modal>
      <Group position="center">
        <button onClick={open}>
          <Icon className={`${styles.existingIconTrash} `} icon={iconTrash} />
        </button>
      </Group>
    </>
  )
}
