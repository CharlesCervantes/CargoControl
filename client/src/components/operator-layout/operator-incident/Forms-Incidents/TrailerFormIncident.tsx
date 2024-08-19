import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconTow from '@iconify-icons/tabler/truck-loading'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import * as Istyles from '../operator-incidents.css'
import { useTheme } from '../../../../styles/contextTheme'
import { IncidentStore } from '../../../../zustand/incidentStore'
import { trailerStore } from '../../../../zustand/TrailerStore'
import { getTrailersInside } from '../../../../fetch/Trailers/getTrailersInside'
import type { ITrailer } from '../../../../interfaces'

export function TrailerFormIncident() {
  const { addTrailersIncident } = IncidentStore()
  const { Trailer, setTrailer } = trailerStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [trailerTypeFilter, setTrailerTypeFilter] = useDebouncedState<string>('', 500)
  const [number, setNumber] = useDebouncedState('', 500)
  const { theme } = useTheme()
  const [filteredDataName, setFilteredDataName] = useState<Array<ITrailer>>([])

  const form = useForm({
    initialValues: {
      trailerId: '',
    },
  })

  useEffect(() => {
    const fetchingData = async() => {
      const data = await getTrailersInside()
      setTrailer(data.data)
    }
    fetchingData()
  }, [setTrailer])

  useEffect(() => {
    const filtered = Trailer.filter((trailer) => {
      const trailerNumber = trailer.number
      const trailerType = trailer.TrailerType?.name

      const numberMatch = number.toLocaleLowerCase() === '' || trailerNumber.toLocaleLowerCase().includes(number.toLocaleLowerCase())
      const trailerTypeMatch = trailerTypeFilter.toLocaleLowerCase() === '' || trailerType?.toLocaleLowerCase().includes(trailerTypeFilter.toLocaleLowerCase())

      return numberMatch && trailerTypeMatch
    })

    setFilteredDataName(filtered)
  }, [number, trailerTypeFilter, Trailer])

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Falta información')
      return null
    } else {
      const trailer: ITrailer | undefined = Trailer.find(trailer => trailer.id === id)
      if (trailer)
        addTrailersIncident(trailer)
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
          <p><Icon icon={iconTow} /> <span className="displayNone" /></p>
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
        <Modal.Title className={styles.dialogTitle}>Datos del tráiler involucrado</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.trailerId))} >
              <TextInput
                label="Número comercial"
                placeholder="Ingrese el número comercial"
                defaultValue={number !== undefined ? number.toString() : ''}
                onChange={(event) => {
                  const inputValue = event.currentTarget.value
                  const parsedValue = inputValue ? parseInt(inputValue, 10) : undefined
                  setNumber(parsedValue)
                }}
              />

              <TextInput
                label="Tipo de tráiler"
                placeholder="Ingrese el tipo de tráiler"
                defaultValue={trailerTypeFilter}
                onChange={event => setTrailerTypeFilter(event.currentTarget.value)}
              />
              <Select
                label="Seleccione el tráiler"
                placeholder="Selecione un tráiler"
                data={filteredDataName.map(trailer => ({
                  label: `Placas: ${trailer.plate} - Numero comercial: ${trailer.number} - Tipo: ${trailer.TrailerType?.name}`,
                  value: `${trailer.id}`,
                }))}
                {...form.getInputProps('trailerId')}
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
