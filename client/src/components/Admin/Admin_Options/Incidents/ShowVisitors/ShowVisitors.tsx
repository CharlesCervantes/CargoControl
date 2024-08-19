import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Table } from '@mantine/core'
import type { IVisitor } from '../../../../../interfaces'

export function ShowVisitors(props: { visitors: Array<IVisitor> }) {
  const [opened, { open, close }] = useDisclosure(false)
  console.log('Visitors:', props.visitors)

  const rows = props.visitors.map(visitor => (
    <tr key={visitor?.id}>
      <td>{visitor?.name}</td>
      <td>{visitor?.company}</td>
      <td>{visitor?.subject}</td>
      <td>{visitor?.badge}</td>
      <td>{visitor?.security_social_number}</td>
    </tr>
  ))
  return (
    <>
      <Modal opened={opened} onClose={close} title="Visitors" centered>
        {Object.keys(props.visitors).length > 0
          ? (
            <Table striped>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Compañía</th>
                  <th>Subject</th>
                  <th>Insignia</th>
                  <th>NSS</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            )
          : (
            <p>No Hubo Visitantes Involucrados</p>
            )}
      </Modal>

      <Group position="center">
        <Button color="cyan" disabled={!(Object.keys(props.visitors).length > 0)} onClick={open} size="xs">{Object.keys(props.visitors).length}</Button>
      </Group>
    </>
  )
}
