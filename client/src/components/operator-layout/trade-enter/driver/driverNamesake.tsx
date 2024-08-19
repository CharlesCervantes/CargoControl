import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Title } from '@mantine/core'

export function DriverNamesake({ opened, setOpened, setEditable, photo, identification }) {
  const handleEditable = (editable: boolean) => {
    setEditable(editable)
    setOpened(false)
  }
  return (
    <Modal
      opened={opened}
      closeOnClickOutside={false}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
      size="reponsive"
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <div>
          <h2 style={{ fontWeight: 'bold' }}>Parece que el conductor ya ha ingresado anteriormente, ¿es él?</h2>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>
            <img src={photo} style={{ width: '30%', margin: '1% 3% 3% 3%' }} />
            <img src={identification} style={{ width: '30%', margin: '1% 3% 3% 3%' }} />
          </div>
          <div>
            <Button style={{ width: '40%', margin: '0% 3% 0% 3%' }} onClick={() => handleEditable(true)}>Sí</Button>
            <Button style={{ width: '40%', margin: '0% 3% 0% 3%' }} color="red" onClick={() => handleEditable(false)}>No</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
