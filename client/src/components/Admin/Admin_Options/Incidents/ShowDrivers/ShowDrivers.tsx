import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Table } from '@mantine/core'
import type { IDriver } from '../../../../../interfaces'

export function ShowDrivers(props: { drivers: Array<IDriver> }) {
  const [opened, { open, close }] = useDisclosure(false)
  console.log('Drivers:', props.drivers)

  const rows = props.drivers.map(driver => (
    <tr key={driver?.id}>
      <td>{driver?.name}</td>
      <td>{driver?.company}</td>
      <td>{driver?.curp}</td>
      <td>{driver?.license}</td>
    </tr>
  ))

  return (
    <>
      <Modal opened={opened} onClose={close} title="Drivers" centered>
        {Object.keys(props.drivers).length > 0
          ? (
            <Table striped>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Compañía</th>
                  <th>CURP</th>
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
        <Button color="red" disabled={!(Object.keys(props.drivers).length > 0)} onClick={open} size="xs">{Object.keys(props.drivers).length}</Button>
      </Group>
    </>
  )
}
