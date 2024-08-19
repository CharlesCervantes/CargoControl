/* eslint-disable react/jsx-indent */
import { Button, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import iconCamera from '@iconify-icons/ph/camera'
import { useEffect } from 'react'
import { vars } from '../../styles/themes.css'
import { ThemeProvider, useTheme } from '../../styles/contextTheme'
import { ShowCamera } from './ShowCamera'

// Import this component if you wanna render a camera in your page
export function Camera({ disabled = false, Image }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { theme } = useTheme()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <ThemeProvider>
      <Modal
        opened={opened}
        onClose={close}
        title="Camara"
        centered
        size="responsive"
      >
        <>
        {opened
          && <div>
              <ShowCamera closeModal={close} Image={Image} />
             </div>
          }
        </>
      </Modal>

      <Group position="center">
        <Button
          onClick={open}
          color={disabled ? 'gray' : vars.colors.principal}
          disabled={disabled}
        >
          <Icon icon={iconCamera} style={{ fontSize: '1.5rem' }} />
        </Button>
      </Group>
    </ThemeProvider>
  )
}
