
import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconVisit from '@iconify-icons/ph/identification-badge'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import { useTheme } from '../../../../styles/contextTheme'
import { getVisitorsInside } from '../../../../fetch/Visitor/getVisitorsInside'
import { visitorStore } from '../../../../zustand/VisitorStore'
import { ExitVisitorStore } from '../../../../zustand/ExitVisitorStore'
import type { IVisitor } from '../../../../interfaces'

export function VisitorForm() {
  const { visitors, setVisitors, resetVisitor } = visitorStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [name, setName] = useDebouncedState('', 500)
  const { theme } = useTheme()
  const [filteredDataName, setFilteredDataName] = useState<Array<IVisitor>>([])
  const [companyFilter, setCompanyFilter] = useDebouncedState('', 500)
  const [badgeFilter, setBadge] = useDebouncedState('', 500)
  const { setVisitor, setVehicleVisitor } = ExitVisitorStore()

  const form = useForm({
    initialValues: {
      visitorId: '',
    },
  })

  const handleName = (value: string) => {
    setName(value)
  }

  const handleBadge = (value: string) => {
    setBadge(value)
  }

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Seleccione a un visitante')
      return null
    } else {
      const visitor: IVisitor | undefined = visitors.find(visitor => visitor.id === id)
      if (visitor) {
        setVisitor(visitor)
        const vehicleVisitor = visitor.VisitorEntrances?.[0]?.VehicleVisitor
        if (vehicleVisitor)
          setVehicleVisitor(vehicleVisitor)
      } else { toast.error('No existe el visitante') }
    }
    form.reset()
    close()
  }

  useEffect(() => {
    const fetchingData = async() => {
      const data = await getVisitorsInside()
      setVisitors(data.data)
    }
    fetchingData()

    return () => {
      resetVisitor()
    }
  }, [resetVisitor, setVisitors])

  useEffect(() => {
    const filtered = visitors.filter((visitor) => {
      const fullName = `${visitor.Person?.name} ${visitor.Person?.lastname}`
      const companyName = visitor.Company?.name
      const badgeData = visitor.badge

      const nameMatch = name.toLowerCase() === '' || fullName.toLowerCase().includes(name.toLowerCase())
      const companyMatch = companyFilter.toLowerCase() === '' || companyName?.toLowerCase().includes(companyFilter.toLowerCase())
      const badgeMatch = badgeFilter.toLowerCase() === '' || badgeData?.toLowerCase().includes(badgeFilter.toLowerCase())

      return nameMatch && companyMatch && badgeMatch
    })

    setFilteredDataName(filtered)
  }, [name, companyFilter, badgeFilter, visitors])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov ${theme}`}
          onClick={open}
        >
          <p><Icon icon={iconVisit} /> <span className="displayNone">Visitante</span></p>
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
        <Modal.Title className={styles.dialogTitle}>Buscar Visitante</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.visitorId))} >

              <Select
                label="Visitante"
                placeholder="Selecione el visitante que saldrá"
                data={filteredDataName.map(visitor => ({
                  label: `Gafete: ${visitor.badge} - Compañia: ${visitor.Company?.name} - Nombre: ${visitor.Person?.name} ${visitor.Person?.lastname}`,
                  value: `${visitor.id}`,
                }))}
                {...form.getInputProps('visitorId')}
              /><br />
              <Modal.Title className={styles.dialogTitle}>Campos de Búsqueda</Modal.Title>
              <div className={styles.textInputContainer} >
                <div className={styles.textInputRow}>
                  <TextInput
                    label="Nombre"
                    placeholder="Ingrese el nombre"
                    defaultValue={name}
                    onChange={event => handleName(event.currentTarget.value)}
                  />
                </div>
                <div className={styles.textInputRow}>
                  <TextInput
                    label="Compañía"
                    placeholder="Ingrese nombre de la compañía/empresa"
                    defaultValue={companyFilter}
                    onChange={event => setCompanyFilter(event.currentTarget.value)}
                  />
                </div>
                <div className={styles.textInputRow}>
                  <TextInput
                    label="Gafete"
                    placeholder="Ingrese el gafete"
                    defaultValue={badgeFilter}
                    onChange={event => handleBadge(event.currentTarget.value)}
                  />
                </div>
              </div>
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
