import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
import iconCamera from '@iconify-icons/ph/camera'
import { Button, Group, Modal } from '@mantine/core'
import iconCheck from '@iconify-icons/ph/check'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { createId } from '@paralleldrive/cuid2'
import { showNotification } from '@mantine/notifications'
import iconClose from '@iconify-icons/ph/x'
import { toast } from 'react-hot-toast'
import { vars } from '../../../styles/themes.css'
import { ThemeProvider, useTheme } from '../../../styles/contextTheme'
import { responseStore } from '../../../zustand/responseStore'
import { connection } from '../../../env'
import { ShowCamera } from './ShowCamera'
import * as styles from './styles.css'
import { CarouselModal } from './CarouselModal'
import type { IFile, IResponse } from '../../../interfaces'

export function Camera(props: { disabled: boolean, Image: any, response?: IResponse, title: string }) {
  const { addResponse, responses, setResponses } = responseStore()
  const [opened, { open, close }] = useDisclosure(false)
  const { theme } = useTheme()
  const [carouselModalOpened, { open: openCarouselModal, close: closeCarouselModal }] = useDisclosure(false)
  const MAX_IMAGES_PER_QUESTION = 5

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const [capturedImages, setCapturedImages] = useState<Array<IFile>>([])

  const handleImage = (image: any) => {
    if (props.response?.File && props.response.File.length >= MAX_IMAGES_PER_QUESTION) {
      showNotification({
        title: 'Limite de fotografias',
        icon: <Icon icon={iconClose} />,
        message: 'Solo se pueden tomar 5 fotografías por pregunta',
        color: 'red',
      })
      return
    }

    toast.success('Foto tomada con exito')
    const random = createId()
    const newImage = {
      name: `${props.response?.identification}_${random}_response.png`,
      size: 0,
      type: 'png',
      url: `${connection}/image/${props.response?.identification}_${random}_response.png`,
      base64: image,
    }

    setCapturedImages(prevImages => [
      ...prevImages,
      newImage,
    ])

    console.log('Responses:', props.response?.identification)
    // TODO: aqui esta el error de response duplicada
    if (props.response) {
      const updatedResponse = { ...props.response }
      if (updatedResponse.File) {
        updatedResponse.File.push(newImage)

        updatedResponse.File = [newImage]
      }
    }

    console.log('New Responses:', responses)
  }

  // Agrega este bloque de código
  // useEffect(() => {
  //   if (props.response && props.response.Files)
  //     setCapturedImages(props.response.Files)
  //   else
  //     setCapturedImages([])
  // }, [props.response])

  // useEffect(() => {
  //   setCapturedImages([])
  // }, [props.response])

  return (
    <ThemeProvider>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="responsive"
      >
        <Modal.Title className={styles.dialogTitle}>{props.title}</Modal.Title>
        {opened && (
          <div>
            <ShowCamera closeModal={close} Image={handleImage} />
          </div>
        )}
      </Modal>

      <Group position="center">
        <Button
          className={styles.buttonMantine}
          onClick={open}
          color={props.disabled ? 'gray' : vars.colors.principal}
          disabled={props.disabled}
        >
          <Icon icon={iconCamera} style={{ fontSize: '1.5rem' }} />
        </Button>

        <Button className={styles.buttonMantine} onClick={openCarouselModal} disabled={(props.response?.File?.length === 0) || (props.response?.File?.length === undefined)}>Fotos</Button>
        <CarouselModal
          response={props.response}
          onClose={closeCarouselModal}
          isOpen={carouselModalOpened}
          title={props.title}
        />
      </Group>
    </ThemeProvider>
  )
}
