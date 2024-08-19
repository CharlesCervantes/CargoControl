import { useEffect, useRef, useState } from 'react'
import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import iconCheck from '@iconify-icons/ph/check'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'

export function ShowCamera({ closeModal, Image }) { // El parametro image retorna la imagen capturada
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [showImage, setShowImage] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const facingModeRef = useRef('environment')

  function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: facingModeRef.current } })
        .then((mediaStream) => {
          streamRef.current = mediaStream

          if (videoRef.current) videoRef.current.srcObject = mediaStream
        })
        .catch((error) => {
        })
    }
  }

  function stopCamera() {
    streamRef.current = null
    // videoRef.current = null
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks()

      for (let i = 0; i < tracks.length; i++)
        tracks[i].stop()

      streamRef.current = null
    }
  }

  const toggleCamera = () => {
    // stopCamera()
    facingModeRef.current = facingModeRef.current === 'user' ? 'environment' : 'user'
    startCamera()
  }

  const capture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const context = canvas.getContext('2d')
    context.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight,
    )
    const newImageSrc = canvas.toDataURL()
    setImageSrc(newImageSrc)

    setShowImage(true)
    // stopCamera()
  }

  const retakePhoto = () => {
    setImageSrc(null)
    setShowImage(false)
    startCamera()
  }

  const acceptPhoto = () => {
    setAccepted(true)
    if (Image) Image(imageSrc)
    closeModal()
    toast.success('Imagen Tomada Con Exito!')
    // stopCamera()
  }

  useEffect(() => {
    startCamera()

    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {showImage
        ? (
          <>
            <img src={imageSrc} alt="Captured" />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={retakePhoto} style={{ marginTop: '1rem' }}>
                Tomar otra Foto
              </Button>
              <Button onClick={acceptPhoto} style={{ marginTop: '1rem' }}>
                Aceptar Foto
              </Button>
            </div>
          </>
          )
        : (
          <>
            <video ref={videoRef} autoPlay />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={capture} style={{ marginTop: '1rem' }}>
                Capturar Imágen
              </Button>
              <Button onClick={toggleCamera} style={{ marginTop: '1rem' }}>
                Cambiar Cámara
              </Button>
            </div>
          </>
          )}
    </div>
  )
}
