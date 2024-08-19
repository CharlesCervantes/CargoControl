import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { Button, Group, Input, Modal, Title } from '@mantine/core'
import iconPencil from '@iconify-icons/ph/pencil'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'

import * as styles from './VehicleRender.css'
import type { IVehicle } from '../../../../interfaces'

export function EditVehicleRender(props: { id: string, onVehicleUpdate: (vehicle: IVehicle) => void }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { entrance, setVehicle } = EntranceUnitStore()
  const [vehicleEdit, setVehicleEdit] = useState<IVehicle>(entrance.Vehicle)
  const [company, setCompany] = useState(entrance.Vehicle?.Company?.name)
  const [unitNumber, setUnitNumber] = useState(entrance.Vehicle?.unitNumber)
  const [plate, setPlates] = useState(entrance.Vehicle?.plate)
  const [vin, setVin] = useState(entrance.Vehicle?.vin)
  const [vehicleType, setVehicleType] = useState(entrance.Vehicle?.VehicleType.name)

  function handleCompanyChange(event) {
    setCompany(event.target.value)
  }

  function handleUnitNumberChange(event) {
    setUnitNumber(event.target.value)
  }

  function handlePlatesChange(event) {
    setPlates(event.target.value)
  }

  function handleVinChange(event) {
    setVin(event.target.value)
  }

  const form = useForm({
    initialValues: {
      companyName: entrance.Vehicle?.Company?.name,
      unitNumber: entrance.Vehicle?.unitNumber,
      plate: entrance.Vehicle?.plate,
      vin: entrance.Vehicle?.vin,
    },
  })

  function handleSave(data) {
    const autoId = props.id
    const newVehicle: IVehicle = {
      id: autoId, // requerido, pero solo en frontend
      organizationId: '',
      plate,
      unitNumber,
      vin,
      Company: {
        id: autoId,
        name: company,
      },
      VehicleType: {
        name: vehicleType,
      },
      companyId: '',
    }
    console.log('1.28: Información del vehículo del conductor actualizada: Compañía:', company, 'Número de Unidad:', unitNumber, 'Placas:', plate, 'VIN:', vin)
    // EditVehicle(newVehicle)
    setVehicleEdit(newVehicle)
    props.onVehicleUpdate(newVehicle)
    close()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div>
          <Modal.Title className={styles.dialogTitle}>
            <div>Editar información</div>
          </Modal.Title>
          <Modal.Body>
            <div className="formResp">
              <form
                onSubmit={form.onSubmit((values) => {
                  handleSave(values)
                })
              }
                autoComplete="off"
              >
                <Input.Wrapper label="Compañía">
                  <Input value={company} onChange={handleCompanyChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Número de Unidad">
                  <Input value={unitNumber} onChange={handleUnitNumberChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Placas">
                  <Input value={plate} onChange={handlePlatesChange} />
                </Input.Wrapper>
                <Input.Wrapper label="VIN">
                  <Input value={vin} onChange={handleVinChange} />
                </Input.Wrapper><br />
                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Button>Guardar</Button>
                  </div>
                  <div>
                    <Button onClick={() => close()} >Cancelar</Button>
                  </div>
                </div> */}
                <div className={styles.saveContainer}>
                  <button
                    onClick={() => {
                      close()
                      setonOpen(false)
                    }}
                    className={styles.closeButton}
                  >Cerrar
                  </button>
                  <button type="submit" className={styles.button}>Guardar</button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </div>

      </Modal>

      <Button style={{ all: 'unset' }} onClick={open}><Icon icon={iconPencil} className={styles.existingIcon} /></Button>
    </>
  )
}
