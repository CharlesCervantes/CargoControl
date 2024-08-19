import { Group, Modal, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { Icon } from '@iconify/react'
import iconTow from '@iconify-icons/tabler/truck-loading'
import { useEffect } from 'react'
import { createId } from '@paralleldrive/cuid2'
import toast from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import '../../responsive.css'
import { getTrailerTypes } from '../../../../fetch/TrailerTypes/getTrailerTypes'
import { trailerTypeStore } from '../../../../zustand/TrailerTypeStore'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'
import { locationStore } from '../../../../zustand/locationsStore'
import type { ITrailer } from '../../../../interfaces'

export function TowForm() {
  const { addTrailer } = EntranceUnitStore()
  const [openned, { open, close }] = useDisclosure(false)
  const { setTrailerTypes, trailerTypes, resetTrailerTypes } = trailerTypeStore()
  const { deviceLocation } = locationStore()

  const form = useForm({
    initialValues: {
      id: '',
      number: '',
      seal: '',
      plate: '',
      vin: '',
      trailerTypeId: '',
      companyName: '',
      isInside: true,
      organizationId: '',
      companyId: '',
    },
  })

  function handleSave(values: any) {
    try {
      const selectedTrailerType = trailerTypes.find(type => type.id === values.trailerTypeId)
      const newTrailer: ITrailer = {
        trailerTypeId: values.trailerTypeId,
        companyId: '',
        isInside: true,
        organizationId: '',
        id: createId(),
        number: values.number,
        Company: {
          name: values.companyName,
        },
        plate: values.plate,
        seal: values.seal,
        TrailerType: selectedTrailerType,
        vin: values.vin,
        locationId: deviceLocation.id,
      }

      addTrailer(newTrailer)
      form.reset()
      close()
      toast.success('Trailer guardado correctamente')
    } catch (error) {
      console.error(error)
      toast.error(`Error al guardar el Trailer: ${error}`)
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      const data = await getTrailerTypes()
      console.log(data.data)
      setTrailerTypes(data.data)
    }
    fetchData()

    return () => {
      resetTrailerTypes()
    }
  }, [])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov`}
          onClick={open}
        >
          <p><Icon icon={iconTow} /> <span className="displayNone">Remolque</span></p>
        </button>
      </Group>
      <Modal
        opened={openned}
        onClose={close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
        size="95%"
      >
        <Modal.Title className={styles.dialogTitle}>Remolque</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onReset={form.onReset} onSubmit={form.onSubmit(values => handleSave(values))} autoComplete="off">
              <TextInput
                label="Compañía"
                withAsterisk
                placeholder="Nombre de la compañía/empresa"
                {...form.getInputProps('companyName')}
              />
              <TextInput
                label="Número de unidad / económico: "
                placeholder="Ingrese número de unidad/económico"
                withAsterisk
                {...form.getInputProps('number')}
              />
              <Select
                label="Tipo de Tráiler"
                withAsterisk
                data={
                  trailerTypes
                    .filter(type => type.id !== undefined) // Filtrar objetos con id definido
                    .map(type => ({ value: type.id!, label: type.name })) // Asegurarse de que type.id sea de tipo string
                }
                // data={trailerTypes.map(type => ({ label: type.name, value: type.id }))}
                placeholder="Seleccione el tipo de tráiler"
                {...form.getInputProps('trailerTypeId')}
              />
              <TextInput
                label="Sello:"
                placeholder="Ingrese el sello"
                {...form.getInputProps('seal')}
              />
              <TextInput
                label="Placas:"
                placeholder="Ingrese las placas"
                {...form.getInputProps('plate')}
              />
              <TextInput
                label="VIN:"
                placeholder="Ingrese el VIN"
                {...form.getInputProps('vin')}
              />
              <div className={styles.saveContainer}>
                <button type="button" onClick={() => { form.reset(); close() }} className={styles.closeButton}>Cerrar</button>
                <button type="submit" className={styles.button}>Guardar</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
