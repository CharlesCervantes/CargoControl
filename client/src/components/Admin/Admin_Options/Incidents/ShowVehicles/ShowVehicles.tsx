import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Table } from '@mantine/core'
import type { IVehicle } from '../../../../../interfaces'

export function ShowVehicles(props: { vehicles: Array<IVehicle> }) {
  const [opened, { open, close }] = useDisclosure(false)
  console.log('Vehicles:', props.vehicles)

  const rows = props.vehicles.map(vehicle => (
    <tr key={vehicle?.id}>
      <td>{vehicle?.vehicleTypeId}</td>
      <td>{vehicle?.company}</td>
      <td>{vehicle?.unitNumber}</td>
      <td>{vehicle?.plate}</td>
      <td>{vehicle?.vin}</td>
    </tr>
  ))

  return (
    <>
      <Modal opened={opened} onClose={close} title="Vehicles" centered>
        {Object.keys(props.vehicles).length > 0
          ? (
            <Table striped>
              <thead>
                <tr>
                  <th>Tipo de Vehículo</th>
                  <th>Compañía</th>
                  <th>Número de Unidad</th>
                  <th>Placas</th>
                  <th>VIN</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            )
          : (
            <p>No Hubo Vehículos Involucrados</p>
            )}
      </Modal>

      <Group position="center">
        <Button color="indigo" disabled={!(Object.keys(props.vehicles).length > 0)} onClick={open} size="xs">{Object.keys(props.vehicles).length}</Button>
      </Group>
    </>
  )
}
