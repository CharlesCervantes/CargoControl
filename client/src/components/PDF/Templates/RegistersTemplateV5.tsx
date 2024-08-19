import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { type Driver, type IDriver, type ITrailer, type IVehicle, type Trailer, type Vehicle } from 'src/interfaces'
import logo from '../../../assets/Logo2.png'
import notImage from '../../../assets/SIN-IMAGEN.jpg'
import Mallana from '../../../assets/fonts/Mallana/Mallanna-Regular.ttf'
import RobotoBold from '../../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from '../../../assets/fonts/Roboto/Roboto-Regular.ttf'

import type { IFile } from '../../../interfaces'

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
  RobotoBoldTitle__medium: {
    fontFamily: 'RobotoBold',
    fontSize: '16px',
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
  dashed_line: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderBottomStyle: 'dashed',
  },
  dashed_line_50: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderBottomStyle: 'dashed',
    width: '50%',
  },
  verticalLine: {
    borderRightColor: '#000000',
    borderRightWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    height: '100%',

  },
})

export function RegistersTemplateV4(props: {
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

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options)
    return formattedDate
  }
  console.log('1.1ID', props.id)
  console.log('1.1DRIVER:', props.driver)
  console.log('1.1ENTRANCEVehicle:', props.entranceVehicle)
  console.log('1.1EXITVEHICLE:', props.exitVehicle)
  console.log('1.1ENTRANCETRAILER:', props.entranceTrailer?.[0]?.Checklist?.Responses)
  // console.log('ENTRANCETRAILER_LENGHT:', props.entranceTrailer.length)
  console.log('1.1EXITTRAILER:', props.exitTrailer)
  // console.log('EXITTRAILER_LENGHT:', props.exitTrailer.length)
  console.log('1.1ENTERDATE:', props.enterDate)
  console.log('1.1EXITDATE:', props.exitDate)
  console.log('1.1FILE_IN_DP:', driverPhoto)
  //   console.log('vehicleResponseImages:', props.entranceVehicle.Checklist[0].File[0].url)
  console.log('1.1Checklist Etrance Vehicle: ', props.entranceVehicle.Checklist)
  console.log('1.1vehicleResponseImages:', props.entranceVehicle.Checklist?.map(che => che.Responses?.map(res => res.File?.map(file => file.url))))
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <Image src={logo} style={styles.logo} />

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.RobotoBoldText__small}>ID de Seguimiento: <Text style={styles.RobotoRegularText__small}>{props.id}</Text></Text>
          </View>
        </View>
        <View style={styles.line} />  {/* Aquí se agrega la línea horizontal */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ marginBottom: '5px', color: '#a4161a' }}>
            <Text style={styles.RobotoBoldTitle__large}>Conductor</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {driverPhoto.length > 0
                ? (<Image src={driverPhoto !== undefined ? driverPhoto?.[0]?.url : ''} style={{ width: '50%', borderRadius: '10px', marginBottom: '5px' }} />)
                : (<Image src={notImage} style={{ width: '50%', borderRadius: '10px', marginBottom: '5px' }} />)
            }
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <View >
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Nombre: <Text style={styles.RobotoRegularText__medium}>{props.driver.name ? props.driver.name : 'Informacion No Registrada'}</Text></Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Licencia: <Text style={styles.RobotoRegularText__medium}>{props.driver.license ? props.driver.license : 'Informacion No Registrada'}</Text></Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Correo: <Text style={styles.RobotoRegularText__medium}>{props.driver.email ? props.driver.email : 'Informacion No Registrada'}</Text></Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Teléfono: <Text style={styles.RobotoRegularText__medium}>{props.driver.numberphone ? props.driver.numberphone : 'Informacion No Registrada'}</Text></Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Curp: <Text style={styles.RobotoRegularText__medium}>{props.driver.curp ? props.driver.curp : 'Informacion No Registrada'}</Text></Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.driver.company ? props.driver.company : 'Informacion No Registrada'}</Text></Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>NSS: <Text style={styles.RobotoRegularText__medium}>{props.driver.security_social_number ? props.driver.security_social_number : 'Informacion No Registrada'}</Text></Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Fecha Entrada:
                  <Text style={[styles.RobotoRegularText__medium, { lineHeight: 1.5 }]}>
                    {props.enterDate ? formatDate(props.enterDate) : 'Información No Registrada'}
                  </Text>
                </Text>
                <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.5 }]}>Fecha Salida:
                  <Text style={[styles.RobotoRegularText__medium, { lineHeight: 1.5 }]}>
                    {props.exitDate ? formatDate(props.exitDate) : 'Información No Registrada'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.line} />  {/* Aquí se agrega la línea horizontal */}
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <View style={{ textAlign: 'left' }}>
              <View style={{ color: '#a4161a' }}>
                <Text style={styles.RobotoBoldTitle__large}>Entrada</Text>
              </View>
              <View style={{ color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={styles.RobotoBoldText__small}>Fecha De Entrada:  </Text>
                <Text style={styles.RobotoRegularText__small}>
                  {props.enterDate?.toString()}
                </Text>
              </View>
            </View>
            <View> {/** Vehicles Container */}
              <View style={{ textAlign: 'left', marginBottom: '5px', marginTop: '15px' }}><Text style={styles.RobotoBoldTitle__medium}>Vehiculo</Text></View>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <View >
                  <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.unitNumber : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Tipo de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.VehicleType?.name : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Numero de Tráiler que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceTrailer.length : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.plate : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.company : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.vin : 'Informacion No Registrada'}</Text></Text>
                </View>
                <View style={styles.dashed_line} />  {/* Aquí se agrega la línea horizontal */}
              </View>
            </View>
            <View> {/** Trailers Container */}
              {props.entranceTrailer.length > 0 ? <View style={{ display: 'flex', width: '100%', textAlign: 'left', marginBottom: '5px' }}><Text style={styles.RobotoBoldTitle__medium}>Trailers</Text></View> : ''}
              <View style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'flex-start' }}>
                {props.entranceTrailer.length > 0
              && (
                <>
                  {props.entranceTrailer.map((trailer, index) => {
                    return (
                      <View key={index} >
                        <View style={{ marginBottom: '10px' }}>
                          <Text style={styles.RobotoBoldText__medium}>Numero de Unidad: <Text style={styles.RobotoRegularText__medium}>{trailer.number ? trailer.number : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Tipo de Tráiler: <Text style={styles.RobotoRegularText__medium}>{trailer.TrailerType?.name ? trailer.TrailerType.name : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Sello: <Text style={styles.RobotoRegularText__medium}>{trailer.seal ? trailer.seal : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{trailer.plate ? trailer.plate : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{trailer.company ? trailer.company : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{trailer.vin ? trailer.vin : 'Informacion No Registrada'}</Text></Text>
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
          </View>
          <View style={styles.verticalLine} />  {/* Aquí se agrega la línea vertical */}
          <View style={{ width: '50%' }}>
            <View style={{ textAlign: 'left' }}>
              <View style={{ color: '#a4161a' }}>
                <Text style={styles.RobotoBoldTitle__large}>Salida</Text>
              </View>
              <View style={{ color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={styles.RobotoBoldText__small}>Fecha De Salida:  </Text>
                <Text style={styles.RobotoRegularText__small}>
                  {props.exitDate?.toString() ? props.exitDate?.toString() : <Text style={styles.RobotoRegularText__small}>Sin Salida</Text>}
                </Text>
              </View>
            </View>
            <View> {/** Exit Vehicles Container */}
              {((props.exitVehicle)) ? <View style={{ textAlign: 'left', marginBottom: '5px', marginTop: '15px' }}><Text style={styles.RobotoBoldTitle__medium}>Vehiculo</Text></View> : ''}
              {props.exitVehicle
            && (
            <>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignContent: 'flex-end', alignItems: 'flex-start' }}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.unitNumber ? props.exitVehicle.unitNumber : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Tipo de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.VehicleType?.name ? props.exitVehicle.VehicleType?.name : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Numero de Trailer que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle ? props.exitTrailer.length : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.plate ? props.exitVehicle.plate : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.company ? props.exitVehicle.company : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.vin ? props.exitVehicle.vin : 'Informacion No Registrada'}</Text></Text>
                </View>
              </View>

              <View style={styles.dashed_line} />  {/* Aquí se agrega la línea horizontal */}
            </>
            )
                // : (<Text style={styles.RobotoBoldText__medium}>Sin vehiculo de salida</Text>)
            }
            </View>
            <View> {/** Exit Trailers Container */}
              {((props.exitTrailer) && (props.exitTrailer.length > 0)) ? <View style={{ display: 'flex', width: '100%', textAlign: 'left', marginBottom: '5px' }}><Text style={styles.RobotoBoldTitle__medium}>Trailers</Text></View> : ''}
              <View style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'flex-start' }}>
                {props.exitTrailer
              && (
                <>
                  {props.exitTrailer.map((trailer, index) => {
                    return (
                      <View key={index}>
                        <View style={{ marginBottom: '10px' }}>
                          <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Text style={styles.RobotoBoldText__medium}>Numero de Unidad: <Text style={styles.RobotoRegularText__medium}>{trailer.number ? trailer.number : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Tipo de Tráiler: <Text style={styles.RobotoRegularText__medium}>{trailer.TrailerType?.name ? trailer.TrailerType.name : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Sello: <Text style={styles.RobotoRegularText__medium}>{trailer.seal ? trailer.seal : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{trailer.plate ? trailer.plate : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{trailer.company ? trailer.company : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{trailer.vin ? trailer.vin : 'Informacion No Registrada'}</Text></Text>
                          </View>
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
          </View>
        </View>
      </Page>
      <Page size="LETTER" style={styles.page}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <Image src={logo} style={styles.logo} />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.RobotoBoldText__small}>ID de Seguimiento: <Text style={styles.RobotoRegularText__small}>{props.id}</Text></Text>
          </View>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ marginBottom: '5px', color: '#a4161a' }}>
            <Text style={styles.RobotoBoldTitle__large}>Checklist</Text>
          </View>
        </View>
        <View style={styles.line} />  {/* Aquí se agrega la línea horizontal */}
        <Text style={styles.RobotoBoldTitle__medium}>Vehículo</Text>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {props?.entranceVehicle?.Checklist?.map(che => che?.Responses?.map((res, index) => {
            return (
              <View key={index} style={{ width: '45%', borderWidth: '1px', borderStyle: 'solid', borderRadius: '10px', marginBottom: '10px', padding: '5px', margin: '5px' }}>
                <Text style={styles.RobotoBoldTitle__large}>{res.Question?.name}</Text>
                <Text style={styles.RobotoBoldTitle__medium}>{res.response}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {res.File?.map((file, fileIndex) => (
                    <Image key={fileIndex} src={file.url} style={styles.logo} />
                  ))}
                </View>
              </View>
            )
          }))}
        </View>

      </Page>
    </Document>
  )
}
