import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Table } from '@mantine/core'
import type { ITrailer } from '../../../../../interfaces'

export function ShowTrailers(props: { trailers: Array<ITrailer> }) {
  const [opened, { open, close }] = useDisclosure(false)
  console.log('Trailers:', props.trailers)

  const rows = props.trailers.map(trailer => (
    <tr key={trailer?.id}>
      <td>{trailer?.trailerTypeId}</td>
      <td>{trailer?.company}</td>
      <td>{trailer?.number}</td>
      <td>{trailer?.plate}</td>
      <td>{trailer.seal}</td>
      <td>{trailer?.vin}</td>
    </tr>
  ))
  return (
    <>
      <Modal opened={opened} onClose={close} title="Trailers" centered>
        {Object.keys(props.trailers).length > 0
          ? (
            <Table striped>
              <thead>
                <tr>
                  <th>Tipo de Vehículo</th>
                  <th>Compañía</th>
                  <th>Número de Unidad</th>
                  <th>Placas</th>
                  <th>Sello</th>
                  <th>VIN</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            )
          : (
            <p>No Hubo Tráilers Involucrados</p>
            )}
      </Modal>

      <Group position="center">
        <Button color="green" disabled={!(Object.keys(props.trailers).length > 0)} onClick={open} size="xs">{Object.keys(props.trailers).length}</Button>
      </Group>
    </>
  )
}
