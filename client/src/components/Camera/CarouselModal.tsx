import { Button, Group, Modal } from '@mantine/core'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import * as styles from '../Common/Camera/styles.css'
import { imagesStore } from '../../zustand/fileStore'

export function CarouselModal() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [opened, { open, close }] = useDisclosure(false)
  const { deleteImage, images } = imagesStore()

  // Function to handle photo deletion (You need to implement this)
  const handleDelete = (imageId) => {
    deleteImage(imageId)
    setCurrentSlide(0)
  }

  useEffect(() => {
    if (images.length === 0)
      close()
  }, [images, close])

  return (
    <>
      <Group>
        <Button
          className={styles.buttonMantine}
          onClick={open}
        >Fotos
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="responsive"
      >
        <Modal.Title className={styles.dialogTitle}>Fotos</Modal.Title>
        <div>
          <div className={styles.containerCarousel}>
            <Carousel
              selectedItem={currentSlide}
              onChange={setCurrentSlide}
              className={styles.carousel}
              showThumbs={false}
            >
              {images.map(file => (
                <div key={file.name}>
                  <img src={file.base64} alt="some picture" />
                  <Icon className={styles.deleteIcon} icon={iconTrash} onClick={() => handleDelete(file.name)} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className={styles.containerButton}>
          <button className={styles.closeButton} onClick={close}>Cerrar</button>
        </div>
      </Modal>
    </>
  )
}
