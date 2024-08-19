import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal } from '@mantine/core'

export function Settings() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  )
}
