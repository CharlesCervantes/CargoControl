import React, { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { TemplatePDF } from '../PDF/TemplatePDF'
import { passGenerate } from '../Admin/Admin_Options/Users/addUserModal/AddUser'
import { getTrailerById } from '../../fetch/getInfoById'
import { RegistersTemplate } from './Templates/RegistersTemplate'
import { RegistersTemplateV2 } from './Templates/RegistersTemplateV2'
import { RegistersTemplateV3 } from './Templates/RegistersTemplateV3'
import { RegistersTemplateV4 } from './Templates/RegistersTemplateV4'
import styles from './PreviewPDF.module.scss'
import { RegistersTemplateV6 } from './Templates/RegistersTemplateV6'
import type { Driver, ITrailer, Trailer, Vehicle } from '../../interfaces'

export function PreviewPDF(props: {
  id: string
  driver: Driver
  entranceVehicle: Vehicle
  entranceTrailer: Array<Trailer> | []
  exitVehicle: Vehicle
  exitTrailer: Array<Trailer> | []
  enterDate: Date
  exitDate: Date
}) {
  const [pdfWindow, setPdfWindow] = useState<Window | null>(null)
  const [pdfId, setPdfId] = useState(passGenerate(10))
  const [trailerTypes, setTrailerTypes] = useState<Array<ITrailer>>([])
  const [loading, setLoading] = useState(false) // Track loading state

  const generatePdf = async() => {
    try {
      setLoading(true) // Set loading to true before starting PDF generation
      const blob = await pdf(
        <RegistersTemplateV6
          id={props.id || 'Id No Encontrado'}
          driver={props.driver || 'Conductor no Encontrado'}
          entranceVehicle={props.entranceVehicle || 'Sin Vehiculo de Entrada'}
          entranceTrailer={props.entranceTrailer || []}
          exitVehicle={props.exitVehicle || 'Sin vehiculo de salida'}
          exitTrailer={props.exitTrailer || []}
          enterDate={props.enterDate || '¿?'}
          exitDate={props.exitDate || '¿?'}
        />)
        .toBlob()
      console.log(props)
      const url = URL.createObjectURL(blob)

      setLoading(false) // Set loading to false after PDF generation
      return blob
    } catch (error) {
      console.error('Error generando el PDF:', error)
      setLoading(false) // Ensure loading is set to false in case of error
      throw error
    }
  }

  const onClick = async() => {
    const blob = await generatePdf()
    const url = URL.createObjectURL(blob)

    const newWindow = window.open(url, '_blank')
    if (newWindow)
      setPdfWindow(newWindow)
  }

  return (
    <div>
      <button className={styles.PDFbutton} onClick={onClick} disabled={loading}>
        {loading ? 'Generando PDF...' : 'PDF'}
      </button>
    </div>
  )
}
