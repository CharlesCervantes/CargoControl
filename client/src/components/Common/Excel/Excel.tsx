/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mantine/core'
import ExcelJS from 'exceljs'
import { getDataToReport } from '../../../fetch/getDatatoOperator'
import type { IReport } from '../../../interfaces'

export function ExcelReport() {
  const getReport = async() => {
    const data: Array<IReport> = await getDataToReport()

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Entradas de unidades')

    // Define las columnas sin encabezados
    worksheet.columns = [
      { key: 'id' },
      { key: 'entraceDateTime' },
      { key: 'entraceUpdateTime' },
      { key: 'driverName' },
      { key: 'driverLicense' },
      { key: 'driverCompany' },
      { key: 'vehiclePlate' },
      { key: 'vehicleType' },
      { key: 'vehicleVin' },
      { key: 'vehicleUnitNumber' },
      { key: 'vehicleCompany' },
      { key: 'vehicleisInside' },
      { key: 'trailers' },
      // { key: 'exitDateTime' },
    ]

    // Añade un encabezado de nivel superior
    worksheet.mergeCells('A1:N1')
    worksheet.getCell('A1').value = 'Entrada'
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' }

    // Añade los encabezados de las columnas
    const row = worksheet.addRow({
      id: 'ID Entrada',
      entraceDateTime: 'Hora de entrada',
      entraceUpdateTime: 'Última Actualización',
      driverName: 'Nombre de Conductor',
      driverLicense: 'Licencia de Conductor',
      driverCompany: 'Compañía de Conductor',
      vehiclePlate: 'Placas del Vehículo',
      vehicleType: 'Tipo de Vehículo',
      vehicleVin: 'VIN del Vehículo',
      vehicleUnitNumber: 'Número de Unidad',
      vehicleCompany: 'Compañía del Vehículo',
      vehicleisInside: 'Está dentro de las instalaciones',
      trailers: 'Cantidad de Tráilers',
      // exitDateTime: 'Fecha de salida',
    })

    // Añade los datos
    data.forEach((item) => {
      const dataRow = worksheet.addRow({
        id: item.entranceUnit.id,
        entraceDateTime: item.entranceUnit.dateTime,
        entranceUpdateTime: item.entranceUnit.dateTime_updated_at,
        driverName: item.entranceUnit.Driver?.name,
        driverLicense: item.entranceUnit.Driver?.license,
        driverCompany: item.entranceUnit.Driver?.company,
        vehiclePlate: item.entranceUnit.Vehicle?.plate,
        vehicleType: item.entranceUnit.Vehicle?.VehicleType.name,
        vehicleVin: item.entranceUnit.Vehicle?.vin,
        vehicleUnitNumber: item.entranceUnit.Vehicle?.unitNumber,
        vehicleCompany: item.entranceUnit.Vehicle?.company,
        vehicleisInside: item.entranceUnit.Vehicle?.isInside,
        trailers: item.entranceUnit.Trailer?.length,
        // exitDateTime: item.ExitUnits?.dateTime,
      })

      dataRow.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' }
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Report.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button color="green" onClick={getReport}>
      Reporte Excel
    </Button>
  )
}
