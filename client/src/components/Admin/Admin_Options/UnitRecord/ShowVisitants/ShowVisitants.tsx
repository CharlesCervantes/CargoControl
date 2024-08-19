import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal } from '@mantine/core'

export function ShowVisitants(params: { visitants }) {
  const [opened, { open, close }] = useDisclosure(false)

  // Makes an object with visitants information to show in a modal
  const v = params.visitants.map(visitant => ({
    id: visitant.id,
    name: visitant.name,
  }))

  return (
    <>
      <Modal opened={opened} onClose={close} title="Visitantes" centered>
        {v.length === 0
          ? (
            <p>No hubo visitantes en esta visita</p>
            )
          : (
            <>
              <p>Total de visitantes: {v.length}</p>
              {v.map(visitant => (
                <li key={visitant.id}>
                  ID: {visitant.id} - Nombre: {visitant.name}
                </li>
              ))}
            </>
            )}
      </Modal>

      <Group position="center">
        <Button onClick={open}>Ver Visitantes</Button>
      </Group>
    </>
  )
}
