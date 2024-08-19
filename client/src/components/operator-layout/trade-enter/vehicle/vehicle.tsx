
import '../../responsive.css'
import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import iconTruck from '@iconify-icons/ph/truck'
import { createId } from '@paralleldrive/cuid2'
import { Group, Modal, Select, TextInput } from '@mantine/core'
import * as styles from '../../modalEnter.css'
import { vehicleTypeStore } from '../../../../zustand/VehicleTypeStore'
import { getVehicleTypes } from '../../../../fetch/VehicleTypes/getVehicleTypes'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'
import { errorNotification, successNotification } from '../../../Notifications/notifications'
import { locationStore } from '../../../../zustand/locationsStore'
import type { IVehicle } from '../../../../interfaces'

export function Vehicle() {
  const { setVehicle } = EntranceUnitStore()
  const [opened, { open, close }] = useDisclosure(false)
  const { deviceLocation } = locationStore()
  const { setRealVehicleTypes, resetRealVehicleType, realVehicleTypes } = vehicleTypeStore()

  const form = useForm({
    initialValues: {
      id: '',
      plate: '',
      vehicleTypeId: '',
      unitNumber: '',
      vin: '',
      company: '',
      isInside: true,
      VehicleType: {
        id: '',
        name: '',
      },
    },

    validate: {
      unitNumber: value => (!value ? 'El número de unidad es obligatorio' : null),
      vehicleTypeId: value => (!value ? 'El tipo de vehículo es obligatorio' : null),
      company: value => (!value ? 'La compañía es requerida' : null),
    },
  })

  function handleSave(values: any) {
    try {
      const selectedVehicleType = realVehicleTypes.find(type => type.id === values.vehicleTypeId)
      const data: IVehicle = {
        id: createId(),
        plate: values.plate,
        vehicleTypeId: values.vehicleTypeId,
        unitNumber: values.unitNumber,
        vin: values.vin,
        Company: {
          name: values.company,
        },
        isInside: true,
        VehicleType: selectedVehicleType,
        companyId: '',
        organizationId: '',
        locationId: deviceLocation.id,
      }

      setVehicle(data)
      form.reset()
      close()
      successNotification()
    } catch (error) {
      errorNotification()
    }
  }
  useEffect(() => {
    const fetchingData = async() => {
      const data = await getVehicleTypes()
      console.log(data.data)
      setRealVehicleTypes(data.data)
    }
    fetchingData()

    // callback de limpieza
    return () => {
      resetRealVehicleType()
    }
  }, [])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov`}
          onClick={open}
        >
          <p><Icon icon={iconTruck} /> <span className="displayNone">Unidad</span></p>
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
        <Modal.Title className={styles.dialogTitle}>Unidad</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp" >
            <form onReset={form.onReset} onSubmit={form.onSubmit(values => handleSave(values))}>

              <Select
                withAsterisk
                data={
                  realVehicleTypes
                    .filter(type => type.id !== undefined) // Filtrar objetos con id definido
                    .map(type => ({ value: type.id!, label: type.name })) // Asegurarse de que type.id sea de tipo string
                  }
                label="Tipo de Vehículo"
                placeholder="Selecciona un tipo de vehículo"
                {...form.getInputProps('vehicleTypeId')}
              />

              <TextInput
                withAsterisk
                label="Compañía"
                placeholder="Nombre de la Compañía/Empresa"
                {...form.getInputProps('company')}
              />
              <TextInput
                label="Número de Unidad"
                withAsterisk
                placeholder="Número de unidad"
                {...form.getInputProps('unitNumber')}
              />

              <TextInput
                label="Placas"
                placeholder="XYZ-22U-96"
                {...form.getInputProps('plate')}
              />

              <TextInput
                label="VIN"
                placeholder="654321"
                {...form.getInputProps('vin')}
              />
              <div className={styles.saveContainer}>
                <button onClick={() => { form.reset(); close() }} className={styles.closeButton}>Cerrar</button>
                <button type="submit" className={styles.button}>Guardar</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
