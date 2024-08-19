import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { Button, Group, Input, Modal, Title } from '@mantine/core'
import iconPencil from '@iconify-icons/ph/pencil'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { EditDriver } from 'src/components/operator-layout/trade-enter/driver/edit-driver/edit-driver'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'

import * as styles from './DriverRender.css'
import type { IDriver } from '../../../../interfaces'

export function EditDriverRender(props: { id: string, onDriverUpdate: (driver: IDriver) => void }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { entrance, setDriver } = EntranceUnitStore()
  const [driverEdit, setDriverEdit] = useState<IDriver>(entrance.Visitor)
  const [name, setName] = useState(entrance.Driver?.Person?.name)
  const [lastname, setLastname] = useState(entrance.Driver?.Person?.lastname)
  const [license, setLicense] = useState(entrance.Driver?.Person?.license)
  const [curp, setCurp] = useState(entrance.Driver?.Person?.curp)
  const [company, setCompany] = useState(entrance.Driver?.Company?.name)

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleLastNameChange(event) {
    setLastname(event.target.value)
  }

  function handleLicenseChange(event) {
    setLicense(event.target.value)
  }

  function handleCurpChange(event) {
    setCurp(event.target.value)
  }

  function handleCompanyChange(event) {
    setCompany(event.target.value)
  }

  const form = useForm({
    initialValues: {
      companyName: entrance.Driver?.Company?.name,
      name: entrance.Driver?.Person?.name,
      lastname: entrance.Driver?.Person?.lastname,
      curp: entrance.Driver?.Person?.curp,
      license: entrance.Driver?.Person?.license,
    },
  })

  function handleSave(data) {
    const autoId = props.id
    const newDriver: IDriver = {
      id: autoId, // requerido, pero solo en frontend
      isExit: false, // requerido
      organizationId: '',
      personId: '',
      Company: {
        id: autoId,
        name: company,
      },
      companyId: '',
      Person: {
        isInside: true,
        name,
        lastname,
        identificationFiles: autoId,
        id: autoId,
        organizationId: '',
        curp: curp?.toUpperCase() || undefined,
        numberphone: '',
        license,
      },
    }
    console.log('1.28: Información del conductor actualizada: Nombre:', name, lastname, 'CURP:', curp, 'Licencia:', license, 'Compañía:', company)
    // EditDriver(newDriver)
    setDriverEdit(newDriver)
    props.onDriverUpdate(newDriver)
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
                <Input.Wrapper label="Nombre">
                  <Input value={name} onChange={handleNameChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Apellidos">
                  <Input value={lastname} onChange={handleLastNameChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Licencia">
                  <Input value={license} onChange={handleLicenseChange} />
                </Input.Wrapper>
                <Input.Wrapper label="CURP">
                  <Input value={curp} onChange={handleCurpChange} />
                </Input.Wrapper>
                <Input.Wrapper label="Empresa">
                  <Input value={company} onChange={handleCompanyChange} />
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
