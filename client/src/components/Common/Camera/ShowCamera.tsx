import { useEffect, useRef, useState } from 'react'
import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import iconCheck from '@iconify-icons/ph/check'
import iconRepeat from '@iconify-icons/ph/repeat'
import iconRepeatPh from '@iconify-icons/ph/arrows-clockwise'
import iconClose from '@iconify-icons/ph/x'
import iconCamera from '@iconify-icons/ph/camera'
import { Icon } from '@iconify/react'
import * as styles from './styles.css'

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
  }

  const retakePhoto = () => {
    setImageSrc(null)
    setShowImage(false)
    startCamera()
  }

  const acceptPhoto = () => {
    setAccepted(true)
    if (Image) Image(imageSrc)
    setShowImage(false)
    startCamera()
  }

  useEffect(() => {
    startCamera()

    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className={styles.container}>
      {showImage
        ? (
          <>
            <img src={imageSrc} alt="Captured" />
            <div>
              <div className={styles.divCameraButton} style={{ top: '490px' }}>
                <Icon className={styles.iconRepeat} icon={iconRepeatPh} onClick={retakePhoto} />
                <Icon className={styles.iconTake} icon={iconCheck} onClick={acceptPhoto} />
              </div>
            </div>
          </>
          )
        : (
          <div>
            <video ref={videoRef} autoPlay />
            <div className={styles.divChangeCameraButton} style={{ top: '85px' }}>
              <Icon className={styles.iconRepeat} icon={iconClose} onClick={closeModal} />
              <Icon className={styles.iconRepeat} icon={iconRepeat} onClick={toggleCamera} />
            </div>
            <div className={styles.divTakeCameraButton} style={{ top: '490px' }}>
              <Icon className={styles.iconTake} icon={iconCamera} onClick={capture} />
            </div>
          </div>
          )}
    </div>
  )
}
