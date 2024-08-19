import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconVisitor from '@iconify-icons/ph/person-simple-walk'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import * as Istyles from '../operator-incidents.css'
import { useTheme } from '../../../../styles/contextTheme'
import { IncidentStore } from '../../../../zustand/incidentStore'
import { visitorStore } from '../../../../zustand/VisitorStore'
import { getVisitorsInside } from '../../../../fetch/Visitor/getVisitorsInside'
import type { IVisitor } from '../../../../interfaces'

export function VisitorFormIncident() {
  const { addVisitorsIncident } = IncidentStore()
  const { visitors, setVisitors } = visitorStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [name, setName] = useDebouncedState('', 500)
  const { theme } = useTheme()
  const [filteredDataName, setFilteredDataName] = useState<Array<IVisitor>>([])
  const [companyFilter, setCompanyFilter] = useDebouncedState('', 500)

  const form = useForm({
    initialValues: {
      visitorId: '',
    },
  })

  const handleName = (value: string) => {
    setName(value)
  }

  useEffect(() => {
    const fetchingData = async() => {
      const data = await getVisitorsInside()
      setVisitors(data.data)
    }
    fetchingData()
  }, [setVisitors])

  useEffect(() => {
    const filtered = visitors.filter((visitor) => {
      const fullName = `${visitor.Person?.name} ${visitor.Person?.lastname}`
      const companyName = visitor.Company?.name

      const nameMatch = name.toLocaleLowerCase() === '' || fullName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      const companyMatch = companyFilter.toLocaleLowerCase() === '' || companyName?.toLocaleLowerCase().includes(companyFilter.toLocaleLowerCase())

      return nameMatch && companyMatch
    })
    setFilteredDataName(filtered)
  }, [name, companyFilter, visitors])

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Selecciona un coductor')
      return null
    } else {
      const visitor: IVisitor | undefined = visitors.find(visitor => visitor.id === id)
      if (visitor)
        addVisitorsIncident(visitor)
    }
    form.reset()
    close()
  }

  return (
    <>
      <Group>
        <button
          className={`${Istyles.botonesPersonalizados} itemOpMov ${theme}`}
          onClick={open}
        >
          <p><Icon icon={iconVisitor} /> <span className="displayNone" /></p>
        </button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
        size="95%"
      >
        <Modal.Title className={styles.dialogTitle}>Datos del visitante involucrado</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.visitorId))} >
              <TextInput
                label="Nombre"
                placeholder="Ingrese el nombre del visitante"
                defaultValue={name}
                onChange={event => handleName(event.currentTarget.value)}
              />
              <TextInput
                label="Compañía/Empresa"
                placeholder="Ingrese la compañía a la que pertenece el visitante"
                defaultValue={companyFilter}
                onChange={event => setCompanyFilter(event.currentTarget.value)}
              />
              <Select
                label="Seleccione el visitante"
                placeholder="Selecione un visitante"
                data={filteredDataName.map(visitor => ({
                  label: `Nombre: ${visitor.Person?.name} - Compañia: ${visitor.Company?.name}`,
                  value: `${visitor.id}`,
                }))}
                {...form.getInputProps('visitorId')}
              />

              <div className={styles.saveContainer}>
                <button
                  onClick={() => {
                    close()
                    form.reset()
                  }}
                  type="button"
                  className={styles.closeButton}
                >Cerrar
                </button>
                <button type="submit" className={styles.button}>Guardar</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
