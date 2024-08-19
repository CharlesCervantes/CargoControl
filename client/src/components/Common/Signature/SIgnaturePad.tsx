/* eslint-disable @typescript-eslint/space-before-function-paren */
import { useEffect, useRef, useState } from 'react'
import SignaturePad from 'react-signature-canvas'
import { Icon } from '@iconify/react'
import checkIcon from '@iconify-icons/ph/check'
import deleteIcon from '@iconify-icons/ph/x'
import { showNotification } from '@mantine/notifications'
import { SignatureStore } from '../../../zustand/SignatureStore'
import * as styles from './SignaturePad.css'
import type { IFile } from '../../../interfaces'

export function Signature() {
  const { setSiganture } = SignatureStore()
  const sigCanvas = useRef<SignaturePad | null>(null)
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const clear = () => {
    if (sigCanvas.current)
      sigCanvas.current.clear()
  }

  const saveSignature = async () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const base64 = sigCanvas.current.toDataURL() // aqui se da la string base64
      const data: IFile = {
        name: 'signature.png',
        size: 0,
        type: 'png',
        url: '',
        base64,
        organizationId: '',
      }
      setSiganture(data)
      clear()
    } else {
      showNotification({
        title: 'Error al guardar',
        color: 'red',
        message: 'No se ha detectado ninguna firma en el lienzo. Por favor, firma antes de intentar guardar',
      })
    }
  }

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    if (sigCanvas.current)
      sigCanvas.current.clear()
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.signatureDiv}>
      <div className={styles.signature}>
        <SignaturePad
          penColor="black"
          canvasProps={{
            width: dimensions.width * 0.655,
            height: dimensions.height * 0.35, // Altura es el 50% del tamaño de la pantalla
          }}
          ref={sigCanvas}
        />
        <div className={styles.saveContainerSignature}>
          <Icon onClick={clear} className={styles.deleteIcon} icon={deleteIcon} />
          <Icon onClick={saveSignature} className={styles.checkIcon} icon={checkIcon} />
        </div>
      </div>
    </div>
  )
}
