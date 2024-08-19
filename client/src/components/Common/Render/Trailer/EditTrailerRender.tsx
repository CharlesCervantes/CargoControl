import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { Button, Group, Input, Modal, Title } from '@mantine/core'
import iconPencil from '@iconify-icons/ph/pencil'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { trailerStore } from 'src/zustand/TrailerStore'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'

import * as styles from './RenderTrailer.css'
import type { ITrailer } from '../../../../interfaces'

export function EditTrailerRender(props: { id: string, onTrailerUpdate: (vehicle: ITrailer) => void }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { entrance, setTrailer } = EntranceUnitStore()
  const [trailerEdit, setTrailerEdit] = useState<ITrailer>(entrance.Trailer.find(t => t.id === props.id))
  const [company, setCompany] = useState(trailerEdit.Company?.name)
  const [number, setNumber] = useState(trailerEdit.number)
  const [plate, setPlates] = useState(trailerEdit.plate)
  const [seal, setSeal] = useState(trailerEdit.seal)
  const [vin, setVin] = useState(trailerEdit.vin)

  function handleCompanyChange(event) {
    setCompany(event.target.value)
  }

  function handleNumberChange(event) {
    setNumber(event.target.value)
  }

  function handlePlatesChange(event) {
    setPlates(event.target.value)
  }

  function handleSealChange(event) {
    setSeal(event.target.value)
  }

  function handleVinChange(event) {
    setVin(event.target.value)
  }

  const form = useForm({
    initialValues: {
      companyName: trailerEdit.Company?.name,
      number: trailerEdit.number,
      plate: trailerEdit.plate,
      seal: trailerEdit.seal,
      vin: trailerEdit.vin,
    },
  })

  function handleSave(data) {
    const autoId = props.id
    const newTrailer: ITrailer = {
      id: autoId, // requerido, pero solo en frontend
      organizationId: '',
      plate,
      number,
      vin,
      seal,
      Company: {
        id: autoId,
        name: company,
      },
      TrailerType: trailerEdit.TrailerType,
      companyId: '',
    }
    console.log('1.28: Información del remolque actualizada: Compañía:', company, 'Número de Unidad:', number, 'Placas:', plate, 'Sello:', seal, 'VIN:', vin)
    // EditVehicle(newVehicle)
    setTrailerEdit(newTrailer)
    props.onTrailerUpdate(newTrailer)
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
                  <Input value={number} onChange={handleNumberChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Placas">
                  <Input value={plate} onChange={handlePlatesChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Sello">
                  <Input value={seal} onChange={handleSealChange} />
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
