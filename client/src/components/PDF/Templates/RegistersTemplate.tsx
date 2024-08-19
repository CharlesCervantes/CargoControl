
import React, { useEffect, useState } from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { type Driver, type IDriver, type ITrailer, type IVehicle, type Trailer, type Vehicle , IFile } from 'src/interfaces'
import logo from '../../../assets/Logo1.png'
import notAvailableImage from '../../../assets/imagen-no-disponible.png'
import notImage from '../../../assets/SIN-IMAGEN.jpg'
import Mallana from '../../../assets/fonts/Mallana/Mallanna-Regular.ttf'
import RobotoBold from '../../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from '../../../assets/fonts/Roboto/Roboto-Regular.ttf'
import image from '../../../assets/driverphoto.jpg'
import { PdfTable } from './PdfTable'

// Use this component to create a pdf template
Font.register({ family: 'Mallana', src: Mallana, fontWeight: 700 })
Font.register({ family: 'RobotoBold', src: RobotoBold })
Font.register({ family: 'RobotoRegular', src: RobotoRegular })

const styles = StyleSheet.create({
  RobotoBoldText__large: {
    fontFamily: 'RobotoBold',
    fontSize: '15px',
  },
  RobotoBoldText__medium: {
    fontFamily: 'RobotoBold',
    fontSize: '10px',
  },
  RobotoBoldText__small: {
    fontFamily: 'RobotoBold',
    fontSize: '8px',
  },
  RobotoRegularText__large: {
    fontFamily: 'RobotoRegular',
    fontSize: '15px',
  },
  RobotoRegularText__medium: {
    fontFamily: 'RobotoRegular',
    fontSize: '10px',
  },
  RobotoRegularText__small: {
    fontFamily: 'RobotoRegular',
    fontSize: '8px',
  },
  RobotoBoldTitle__large: {
    fontFamily: 'RobotoBold',
    fontSize: '20px',
  },
  MallanaBoldTitle__large: {
    fontFamily: 'Mallana',
    fontWeight: 'bold',
    fontSize: '20',
  },
  RobotoBoldTitle__XLarge: {
    fontFamily: 'RobotoBold',
    fontSize: '25px',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    // textAlign: "center"
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: '12px',
  },
  line: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
})

export function RegistersTemplate(props: {
  id: string
  driver: Driver
  entranceVehicle: Vehicle
  entranceTrailer: Array<Trailer>
  exitVehicle: Vehicle
  exitTrailer: Array<Trailer>
  enterDate: Date
  exitDate: Date
}) {
  console.log('FILE:', props.driver.Files)
  // const [driverPhoto, setDriverPhoto] = -useState<Array<IFile>>([])
  let driverPhoto: Array<IFile> = []
  if (props.driver.Files !== undefined) {
    if (props.driver.Files?.length > 0)
      driverPhoto = props.driver.Files.filter(image => image.url.includes('photo'))
  }

  // console.log('ID', props.id)
  // console.log('DRIVER:', props.driver)
  console.log('ENTRANCEVehicle:', props.entranceVehicle)
  // console.log('EXITVEHICLE:', props.exitVehicle)
  console.log('ENTRANCETRAILER:', props.entranceTrailer?.[0]?.Checklist?.Responses)
  // // console.log('ENTRANCETRAILER_LENGHT:', props.entranceTrailer.length)
  // console.log('EXITTRAILER:', props.exitTrailer)
  // // console.log('EXITTRAILER_LENGHT:', props.exitTrailer.length)
  // console.log('ENTERDATE:', props.enterDate)
  // console.log('EXITDATE:', props.exitDate)
  console.log('FILE_IN_DP:', driverPhoto?.[0]?.url)

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
          <View >
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <Image src={logo} style={styles.logo} />
              <View style={{ color: '#a4161a' }}><Text style={styles.RobotoBoldTitle__large}>Entrada</Text></View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.RobotoBoldText__small}>ID de Seguimiento: <Text style={styles.RobotoRegularText__small}>{props.id}</Text></Text>
              <View>
                <Text style={styles.RobotoBoldText__small}>Fecha De Entrada:
                  <Text style={styles.RobotoRegularText__small}>
                    {props.enterDate?.toString()}
                  </Text>
                </Text>
                {/* <Text style={styles.RobotoBoldText__small}>Fecha de Salida:
                  <Text style={styles.RobotoRegularText__small}>
                    {props.exitDate ? props.exitDate.toString() : 'SIN SALIDA'}
                  </Text>
                </Text> */}
              </View>
            </View>
          </View>
          <View style={styles.line} />  {/* Aquí se agrega la línea horizontal */}
          <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ width: '45%', borderRightStyle: 'solid', borderRightWidth: '0.5px' }}>
              <View style={{ textAlign: 'center', marginBottom: '5px' }}><Text style={styles.RobotoBoldTitle__large}>Conductor</Text></View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {driverPhoto.length > 0
                    ? (<Image src={driverPhoto !== undefined ? driverPhoto?.[0]?.url : ''} style={{ width: '60%', alignContent: 'flex-start', justifyContent: 'flex-start', borderRadius: '10px', marginBottom: '5px' }} />
                      )
                    : (<Image src={notImage} style={{ width: '60%', alignContent: 'flex-start', justifyContent: 'flex-start', borderRadius: '10px', marginBottom: '5px' }} />)

                  }
                </View>
                <View style={{ width: '100%' }}>
                  <Text style={styles.RobotoBoldText__medium}>Nombre: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.name : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Curp: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.curp : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Licencia: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.license : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.company : 'Informacion No Registrada'}</Text></Text>
                </View>

              </View>
            </View>
            <View style={{ width: '45%' }}>
              <View style={{ textAlign: 'center', marginBottom: '15px' }}><Text style={styles.RobotoBoldTitle__large}>Vehiculo</Text></View>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: '5px' }}>
                  <Text style={styles.RobotoBoldText__medium}>Numero de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.unitNumber : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Tipo de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.VehicleType?.name : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Número de Trailer que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceTrailer.length : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.plate : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.company : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.vin : 'Informacion No Registrada'}</Text></Text>
                </View>
              </View>
              {/* <View style={{ marginTop: '15px', marginBottom: '15px', width: '100%', textAlign: 'center' }}>
              <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
               </View> */}
              <View style={{ marginTop: '10px' }}>
                {props.entranceVehicle?.Checklist?.[0]?.Responses && props.entranceVehicle.Checklist[0].Responses.length > 0
                  ? (
                    <View style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                      <View style={{ width: '100%', alignItems: 'center', borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                        <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
                      </View>
                      {props.entranceVehicle.Checklist[0].Responses.map((response, index) => {
                        return (
                          <View key={index} style={{ borderStyle: 'solid', borderColor: 'black' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                              <View style={{ width: '50%', textAlign: 'center', borderRightStyle: 'solid', borderRightWidth: '1px' }}>
                                {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Pregunta </Text> : 'No Question'}
                                <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                  <Text style={styles.RobotoRegularText__small}>
                                    {response?.Question?.name || 'Informacion No Registrada'}
                                  </Text>
                                </View>
                              </View>
                              <View style={{ width: '50%', textAlign: 'center' }}>
                                {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Respuesta </Text> : 'No Responses'}
                                <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                  <Text style={styles.RobotoRegularText__small}>
                                    {response?.response || 'Informacion No Registrada'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        )
                      })}
                    </View>
                    )
                  : (<View style={{ textAlign: 'center', borderStyle: 'dashed', borderWidth: '1px', marginTop: '10px', padding: '10px' }}><Text style={styles.RobotoBoldText__medium}>No se Registro Checklist</Text></View>)
              }
              </View>
            </View>
          </View>
          {props.entranceTrailer.length > 0 ? <View style={{ display: 'flex', width: '100%', textAlign: 'center', marginTop: '10px', marginBottom: '10px', borderTopStyle: 'solid', borderTopWidth: '0.5px' }}><Text style={styles.RobotoBoldTitle__large}>Trailers</Text></View> : ''}
          <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {props.entranceTrailer.length > 0
              && (
                <>
                  {props.entranceTrailer.map((trailer, index) => {
                    return (
                      <View key={index} style={{ width: '45%' }}>
                        <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{trailer.number ? trailer.number : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Tipo de Trailer: <Text style={styles.RobotoRegularText__medium}>{trailer.TrailerType?.name ? trailer.TrailerType.name : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Sello: <Text style={styles.RobotoRegularText__medium}>{trailer.seal ? trailer.seal : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{trailer.plate ? trailer.plate : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{trailer.company ? trailer.company : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{trailer.vin ? trailer.vin : 'Informacion No Registrada'}</Text></Text>

                        </View>
                        {/* <View style={{ marginTop: '15px', marginBottom: '15px', width: '100%', textAlign: 'center' }}>
                        <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
                        </View> */}
                        <View style={{ marginTop: '10px' }}>
                          {trailer?.Checklist?.Responses && trailer.Checklist.Responses.length > 0
                            ? (
                              <View style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                                <View style={{ width: '100%', alignItems: 'center', borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                                  <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
                                </View>
                                {trailer.Checklist.Responses.map((response, index) => {
                                  return (
                                    <View key={index} style={{ borderStyle: 'solid', borderColor: 'black' }}>
                                      <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                        <View style={{ width: '50%', textAlign: 'center', borderRightStyle: 'solid', borderRightWidth: '1px' }}>
                                          {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Pregunta </Text> : 'No Question'}
                                          <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                            <Text style={styles.RobotoRegularText__small}>
                                              {response?.Question?.name || 'Informacion No Registrada'}
                                            </Text>
                                          </View>
                                        </View>
                                        <View style={{ width: '50%', textAlign: 'center' }}>
                                          {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Respuesta </Text> : 'No Responses'}
                                          <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                            <Text style={styles.RobotoRegularText__small}>
                                              {response?.response || 'Informacion No Registrada'}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  )
                                })}
                              </View>
                              )
                            : (<View style={{ textAlign: 'center', borderStyle: 'dashed', borderWidth: '1px', marginTop: '10px', padding: '10px' }}><Text style={styles.RobotoBoldText__medium}>No se Registro Checklist</Text></View>)
                    }
                        </View>
                      </View>
                    )
                  })
                  }
                </>
              )
            }
          </View>
        </View>
      </Page>
      {props.exitDate
        && <Page size="LETTER" style={styles.page}> {/* Page Two */}
          <View>
            <View >
              <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image src={logo} style={styles.logo} />
                <View style={{ color: '#a4161a' }}><Text style={styles.RobotoBoldTitle__large}>Salida</Text></View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.RobotoBoldText__small}>ID de Seguimiento: <Text style={styles.RobotoRegularText__small}>{props.id}</Text></Text>
                <View>
                  {/* <Text style={styles.RobotoBoldText__small}>Fecha De Entrada:
                    <Text style={styles.RobotoRegularText__small}>
                      {props.enterDate?.toString()}
                    </Text>
                  </Text> */}
                  <Text style={styles.RobotoBoldText__small}>Fecha de Salida:
                    <Text style={styles.RobotoRegularText__small}>
                      {props.exitDate ? props.exitDate.toString() : 'SIN SALIDA'}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />  {/* Aquí se agrega la línea horizontal */}
            <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View style={{ width: '45%', borderRightStyle: 'solid', borderRightWidth: '0.5px' }}>
                <View style={{ textAlign: 'center', marginBottom: '5px' }}><Text style={styles.RobotoBoldTitle__large}>Conductor</Text></View>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image src={image} style={{ width: '60%', alignContent: 'flex-start', justifyContent: 'flex-start', borderRadius: '10px', marginBottom: '5px' }} /> {/* Aquí agregas la imagen */}
                  </View>
                  <View style={{ width: '100%' }}>
                    <Text style={styles.RobotoBoldText__medium}>Nombre: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.name : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Curp: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.curp : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Licencia: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.license : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.driver ? props.driver.company : 'Informacion No Registrada'}</Text></Text>
                  </View>

                </View>
              </View>
              <View style={{ width: '45%' }}>
                <View style={{ textAlign: 'center', marginBottom: '15px' }}><Text style={styles.RobotoBoldTitle__large}>Vehiculo</Text></View>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <View style={{ marginLeft: '5px' }}>
                    <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.unitNumber ? props.exitVehicle.unitNumber : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Tipo de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.VehicleType?.name ? props.entranceVehicle.VehicleType?.name : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Numero de Tráiler que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle ? props.exitTrailer.length : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.plate ? props.exitVehicle.plate : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.company ? props.exitVehicle.company : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.vin ? props.exitVehicle.vin : 'Informacion No Registrada'}</Text></Text>
                  </View>
                </View>
                {/* <View style={{ marginTop: '15px', marginBottom: '15px', width: '100%', textAlign: 'center' }}>
              <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
               </View> */}
                <View style={{ marginTop: '10px' }}>
                  {props.exitVehicle?.Checklist?.[0]?.Responses && props.exitVehicle.Checklist[0].Responses.length > 0
                    ? (
                      <View style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                        <View style={{ width: '100%', alignItems: 'center', borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                          <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
                        </View>
                        {props.exitVehicle.Checklist[0].Responses.map((response, index) => {
                          return (
                            <View key={index} style={{ borderStyle: 'solid', borderColor: 'black' }}>
                              <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: '50%', textAlign: 'center', borderRightStyle: 'solid', borderRightWidth: '1px' }}>
                                  {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Pregunta </Text> : 'No Question'}
                                  <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                    <Text style={styles.RobotoRegularText__small}>
                                      {response?.Question?.name || 'Informacion No Registrada'}
                                    </Text>
                                  </View>
                                </View>
                                <View style={{ width: '50%', textAlign: 'center' }}>
                                  {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Respuesta </Text> : 'No Responses'}
                                  <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                    <Text style={styles.RobotoRegularText__small}>
                                      {response?.response || 'Informacion No Registrada'}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          )
                        })}
                      </View>
                      )
                    : (<View style={{ textAlign: 'center', borderStyle: 'dashed', borderWidth: '1px', marginTop: '10px', padding: '10px' }}><Text style={styles.RobotoBoldText__medium}>No se Registro Checklist</Text></View>)
              }
                </View>
              </View>
            </View>
            {((props.exitTrailer) && (props.exitTrailer.length > 0)) ? <View style={{ display: 'flex', width: '100%', textAlign: 'center', marginTop: '10px', marginBottom: '10px', borderTopStyle: 'solid', borderTopWidth: '0.5px' }}><Text style={styles.RobotoBoldTitle__large}>Trailers</Text></View> : ''}
            <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              {props.exitTrailer.length > 0
                && (
                  <>
                    {props.exitTrailer.map((trailer, index) => {
                      return (
                        <View key={index} style={{ width: '45%' }}>
                          <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{trailer.number ? trailer.number : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Tipo de Tráiler: <Text style={styles.RobotoRegularText__medium}>{trailer.TrailerType?.name ? trailer.TrailerType.name : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Sello: <Text style={styles.RobotoRegularText__medium}>{trailer.seal ? trailer.seal : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{trailer.plate ? trailer.plate : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{trailer.company ? trailer.company : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{trailer.vin ? trailer.vin : 'Informacion No Registrada'}</Text></Text>

                          </View>
                          {/* <View style={{ marginTop: '15px', marginBottom: '15px', width: '100%', textAlign: 'center' }}>
                        <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
                        </View> */}
                          <View style={{ marginTop: '10px' }}>
                            {trailer?.Checklist?.Responses && trailer.Checklist.Responses.length > 0
                              ? (
                                <View style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                                  <View style={{ width: '100%', alignItems: 'center', borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                                    <Text style={styles.RobotoBoldText__medium}>Checklist</Text>
                                  </View>
                                  {trailer.Checklist.Responses.map((response, index) => {
                                    return (
                                      <View key={index} style={{ borderStyle: 'solid', borderColor: 'black' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                          <View style={{ width: '50%', textAlign: 'center', borderRightStyle: 'solid', borderRightWidth: '1px' }}>
                                            {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Pregunta </Text> : 'No Question'}
                                            <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                              <Text style={styles.RobotoRegularText__small}>
                                                {response?.Question?.name || 'Informacion No Registrada'}
                                              </Text>
                                            </View>
                                          </View>
                                          <View style={{ width: '50%', textAlign: 'center' }}>
                                            {index <= 0 ? <Text style={styles.RobotoBoldText__small}>Respuesta </Text> : 'No Responses'}
                                            <View style={{ backgroundColor: index % 2 === 0 ? '#adb5bd' : '#ced4da' }}>
                                              <Text style={styles.RobotoRegularText__small}>
                                                {response?.response || 'Informacion No Registrada'}
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                    )
                                  })}
                                </View>
                                )
                              : (<View style={{ textAlign: 'center', borderStyle: 'dashed', borderWidth: '1px', marginTop: '10px', padding: '10px' }}><Text style={styles.RobotoBoldText__medium}>No se Registro Checklist</Text></View>)
                            }
                          </View>
                        </View>
                      )
                    })
                  }
                  </>
                )
                }
            </View>
          </View>
        </Page>

      }
    </Document>
  )
}
