
import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconVisit from '@iconify-icons/ph/identification-badge'
import iconTow from '@iconify-icons/tabler/truck-loading'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { toast } from 'react-hot-toast'
import { RemoveElement } from '../../../../Common/Render/RemoveElement'
import * as styles from '../../../modalExit.css'
import { useTheme } from '../../../../../styles/contextTheme'
import { getTrailersInside } from '../../../../../fetch/Trailers/getTrailersInside'
import { ExitUnitStore } from '../../../../../zustand/ExitUnitStore'
import { trailerStore } from '../../../../../zustand/TrailerStore'
import type { ITrailer } from '../../../../../interfaces'

export function TrailerExitForm() {
  const { theme } = useTheme()
  const { ExitUnit, addTrailer } = ExitUnitStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [filteredData, setFilteredData] = useState<Array<ITrailer>>([])
  const [unitNumberFilter, setUnitNumberFilter] = useDebouncedState('', 500)
  const [companyFilter, setCompanyFilter] = useDebouncedState('', 500)
  const [plateFilter, setPlateFilter] = useDebouncedState('', 500)
  const { Trailer, setTrailer, resetTrailer } = trailerStore()
  const filtered: Array<ITrailer> = []

  const form = useForm({
    initialValues: {
      trailerId: '',
    },
  })

  const handleSave = (id: string) => {
    if (id === '') {
      toast.error('Seleccione una unidad de carga')
      return null
    } else {
      const trailer: ITrailer | undefined = Trailer.find(trailer => trailer.id === id)
      if (trailer) {
        addTrailer(trailer)
        console.log('Variable trailer:', trailer)
      } else { toast.error('No existe el conductor') }
    }
    form.reset()
    close()
  }

  // useEffect(() => {
  //   const fetchingData = async() => {
  //     const data = await getTrailersInside()
  //     setTrailer(data.data)
  //   }
  //   fetchingData()
  //   console.log(Trailer)

  //   return () => {
  //     resetTrailer()
  //   }
  // }, [])

  useEffect(() => {
    const filteredData = Trailer.filter((trailer) => {
      const unitNumber = trailer.number || ''
      const companyName = trailer.Company?.name
      const plate = trailer.plate

      const unitNumberMatch = unitNumberFilter.toLowerCase() === '' || unitNumber.toLowerCase().includes(unitNumberFilter.toLowerCase())
      const companyMatch = companyFilter.toLowerCase() === '' || companyName?.toLowerCase().includes(companyFilter.toLowerCase())
      const plateMatch = plateFilter.toLowerCase() === '' || plate?.toLowerCase().includes(plateFilter.toLocaleLowerCase())

      return unitNumberMatch && companyMatch && plateMatch
    })

    setFilteredData(filteredData)
  }, [unitNumberFilter, companyFilter, plateFilter, Trailer])

  function byClicking() {
    open()
    console.log('Variable Trailer:', Trailer)
    console.log('ExitUnit de towExit-Form:', ExitUnit)
    RemoveElement({ checklist: true })
  }

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov ${theme}`}
          onClick={byClicking}
        >
          <p><Icon icon={iconTow} /> <span className="displayNone">Remolque</span></p>
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
        <Modal.Title className={styles.dialogTitle}>Salida de Remolques</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={form.onSubmit(values => handleSave(values.trailerId))} >

              <Select
                label="Tráiler"
                placeholder="Seleccione una unidad:"
                data={filteredData.map(trailer => ({
                  label: `Compañía: ${trailer.Company?.name} - Número de unidad: ${trailer.number} - Placas: ${trailer.plate} `,
                  value: `${trailer.id}`,
                }))}
                {...form.getInputProps('trailerId')}
              /><br />
              <Modal.Title className={styles.dialogTitle}>Campos de Búsqueda</Modal.Title>
              <TextInput
                label="Compañía:"
                placeholder="Buscar el nombre de la compañía/empresa"
                defaultValue={companyFilter}
                onChange={event => setCompanyFilter(event.currentTarget.value)}
              />
              <TextInput
                label="Número de unidad:"
                placeholder="Buscar el número de unidad"
                defaultValue={unitNumberFilter}
                onChange={event => setUnitNumberFilter(event.currentTarget.value)}
              />
              <TextInput
                label="Número de placa:"
                placeholder="Buscar el número de placas"
                defaultValue={plateFilter}
                onChange={event => setPlateFilter(event.currentTarget.value)}
              />
              {/* <Select
                label="Remolque"
                placeholder="Seleccione uno:"
                data={filteredData.map(trailer => ({
                  label: `Compañía: ${trailer.Company?.name} - Número de unidad: ${trailer.number} - Placas: ${trailer.plate} `,
                  value: `${trailer.id}`,
                }))}
                {...form.getInputProps('trailerId')}
              /> */}
              <br />
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
