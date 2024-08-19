import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Table } from '@mantine/core'
import type { ITrailer, Trailer } from '../../../../../interfaces'

export function ShowTrailers(props: { trailers: Array<Trailer> }) {
  const [opened, { open, close }] = useDisclosure(false)
  const t = props.trailers || []
  const rows = t.map(element => (
    <tr key={element.id}>
      <td>{element?.TrailerType?.name}</td>
      <td>{element?.company}</td>
      <td>{element?.number}</td>
      <td>{element?.seal}</td>
      <td>{element?.plate}</td>
      <td>{element?.vin}</td>
    </tr>
  ))
  return (
    <>
      <Modal opened={opened} onClose={close} title="Tráilers" centered size="lg">
        {t.length === 0
          ? (
            <p>No hubo Tráilers en esta visita</p>
            )
          : (
            <>
              <p>Total de Tráilers: {t.length}</p>
              <Table striped>
                <thead>
                  <tr>
                    <th>Tipo de Tráiler</th>
                    <th>Compañía</th>
                    <th>Número</th>
                    <th>Sello</th>
                    <th>Placas</th>
                    <th>VIN</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </>
            )}
      </Modal>

      <Group position="center">
        <Button color="green" disabled={!(t.length > 0)} onClick={open} size="xs">{t.length}</Button>
      </Group>
    </>
  )
}
