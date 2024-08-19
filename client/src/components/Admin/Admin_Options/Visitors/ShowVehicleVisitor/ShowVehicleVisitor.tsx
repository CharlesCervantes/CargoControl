import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Table } from '@mantine/core'
import type { ITrailer, IVehicleVisitor, Trailer } from '../../../../../interfaces'

export function ShowVehicleVisitor(props: { vehicle: IVehicleVisitor }) {
  const [opened, { open, close }] = useDisclosure(false)
  console.log('vehicle:', props.vehicle)

  if ((props.vehicle === null) || (props.vehicle === undefined)) {
    return (
      <Group position="center">
        <Button color="green" disabled onClick={open} size="xs">0</Button>
      </Group>
    )
  } else {
    const rows = (
      <tr >
        <td>{props?.vehicle?.brand}</td>
        <td>{props?.vehicle?.model}</td>
        <td>{props?.vehicle?.plates}</td>
        <td>{props?.vehicle?.color}</td>

      </tr>
    )
    return (
      <>
        <Modal opened={opened} onClose={close} title="Tráilers" centered size="lg">
          {Object.keys(props.vehicle).length === 0
            ? (
              <p>No hubo Tráilers en esta visita</p>
              )
            : (
              <>
                {/* <p>Total de Trailers: {t.length}</p> */}
                <Table striped>
                  <thead>
                    <tr>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Placas</th>
                      <th>Color</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </>
              )}
        </Modal>

        <Group position="center">
          <Button color="green" onClick={open} size="xs">1</Button>
        </Group>
      </>
    )
  }
}
