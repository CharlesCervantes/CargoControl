
import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Title } from '@mantine/core'
import type { IVehicleVisitor, IVisitor } from '../../../interfaces'

export function RemoveElementV(
  {
    deleteVehicle,
    vehicle,
    deleteVisitor,
    visitor,
    message,
  }: {
    deleteVehicle?: (vehicle: IVehicleVisitor) => void
    vehicle?: IVehicleVisitor
    deleteVisitor?: (visitor: IVisitor) => void
    visitor?: IVisitor
    message?: string
  }) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title order={4}>¿Deseas Eliminar el {message || 'Registro'}?</Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem' }}>
          <Button
            style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
            onClick={(e) => {
              e.stopPropagation()
              if (vehicle)
                deleteVehicle(vehicle)
              if (visitor)
                deleteVisitor(visitor)
            }}
          >Si
          </Button>
          <Button style={{ paddingLeft: '2rem', paddingRight: '2rem' }} onClick={close} color="red">No</Button>
        </div>
      </Modal>
      <Group position="center">
        <Button color="red" onClick={open}><Icon icon={iconTrash} /></Button>
      </Group>
    </>
  )
}
