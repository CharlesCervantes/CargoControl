// CarouselModal.tsx
import { Group, Modal } from '@mantine/core'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Icon } from '@iconify/react'
import iconTrash from '@iconify-icons/ph/trash'
import { useEffect, useState } from 'react'
import { responseStore } from '../../../zustand/responseStore'
import * as styles from './styles.css'
import type { IFile, IResponse } from '../../../interfaces'

export function CarouselModal(props: { onClose: () => void, isOpen: boolean, title: string, response?: IResponse }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { addResponse, responses, setResponses } = responseStore()

  const handleDelete = (fileToDelete: IFile) => {
    // Verifica que props.response y props.response.questionId estén definidos antes de usarlos
    if (props.response && props.response.questionId) {
    // Encuentra el índice de la respuesta que corresponde a la que estamos seleccionando
      const responseIndex = responses.findIndex(response => response.questionId === props.response?.questionId)

      if (responseIndex !== -1) {
      // Clona la respuesta para no modificar directamente el estado
        const updatedResponse = { ...responses[responseIndex] }

        // Filtra el archivo que quieres eliminar
        updatedResponse.File = updatedResponse.File?.filter(file => file.name !== fileToDelete.name)

        // Actualiza el arreglo de respuestas
        const updatedResponses = [...responses]
        updatedResponses[responseIndex] = updatedResponse

        // Actualiza el estado
        console.log('1.1zustandResponses:', responses)
        setResponses(updatedResponses)
      }
    }
    // if (props.response && props.response.questionId) {
    //   const responseIndex = responses.findIndex((response: { questionId: string }) => response.questionId === props.response.questionId)
    //   if (responseIndex !== -1 && responses[responseIndex].File) {
    //     const fileIndex = responses[responseIndex].File.findIndex((file: { name: any }) => file.name === fileToDelete.name)
    //     if (fileIndex !== -1) {
    //       // Clona la respuesta para no modificar directamente el estado
    //       const updatedResponse = { ...responses[responseIndex] }
    //       // Verificar que 'Files' esté definido
    //       if (updatedResponse.File) {
    //         updatedResponse.File.splice(fileIndex, 1)
    //         // Actualiza el arreglo de respuestas
    //         const updatedResponses = [...responses]
    //         updatedResponses[responseIndex] = updatedResponse
    //         // Actualiza el estado
    //         setResponses(updatedResponses)
    //       }
    //     }
    //   }
    // }

    // Si la imagen eliminada es la última, disminuye currentSlide
    if (props.response && props.response.File && currentSlide === props.response.File.length - 1)
      setCurrentSlide(prev => prev - 1)
  }
  // elimiinar este useEffect, solo esta para pruebas
  useEffect(() => {
    console.log('Updated responses:', responses)
  }, [responses])
  /////////////
  useEffect(() => {
    if (props.isOpen && (!props.response || (props.response && !props.response.File) || props.response.File.length === 0))
      props.onClose()
  }, [props.isOpen, props.response])

  return (
    <Modal
      opened={props.isOpen}
      onClose={props.onClose}
      centered
      withCloseButton={false}
      size="responsive"
    >
      <Modal.Title className={styles.dialogTitle}>{props.title}</Modal.Title>
      <div>
        <div className={styles.containerCarousel}>
          <Carousel
            key={props.response?.File?.length || 0}
            className={styles.carousel}
            showThumbs={false}
          >
            {props.response && props.response.File?.map(file => (
              <div key={file.name}>
                <img src={file.base64} alt="some picture" />
                <Icon className={styles.deleteIcon} icon={iconTrash} onClick={() => handleDelete(file)} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className={styles.containerButton}>
        <button className={styles.closeButton} onClick={props.onClose}>Cerrar</button>
      </div>

    </Modal>
  )
}
