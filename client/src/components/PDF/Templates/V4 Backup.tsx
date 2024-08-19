import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { type Driver, type IDriver, type ITrailer, type IVehicle, type Trailer, type Vehicle } from 'src/interfaces'
import logo from '../../../assets/LogoSolo.png'
import notImage from '../../../assets/SIN-IMAGEN.jpg'
import Mallana from '../../../assets/fonts/Mallana/Mallanna-Regular.ttf'
import RobotoBold from '../../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from '../../../assets/fonts/Roboto/Roboto-Regular.ttf'
import LatoHeavy from '../../../assets/fonts/LatoHeavy.ttf'
// import headerImage from '../../../assets/camion.png'
// import backgroundImage from '../../../assets/Estrella.png'

import type { IFile } from '../../../interfaces'

// Use this component to create a pdf template
Font.register({ family: 'Mallana', src: Mallana, fontWeight: 700 })
Font.register({ family: 'RobotoBold', src: RobotoBold })
Font.register({ family: 'RobotoRegular', src: RobotoRegular })
Font.register({ family: 'LatoHeavy', src: LatoHeavy })

const styles = StyleSheet.create({
  RobotoBoldText__large: {
    fontFamily: 'LatoHeavy',
    fontSize: '14px',
    color: '#0e3569',
  },
  RobotoBoldText__medium: {
    fontFamily: 'LatoHeavy',
    fontSize: '10px',
    color: '#0e3569',
  },
  RobotoBoldText__small: {
    fontFamily: 'LatoHeavy',
    fontSize: '8px',
    color: '#0e3569',
  },
  RobotoRegularText__large: {
    fontFamily: 'LatoHeavy',
    fontSize: '14px',
    color: '#0e3569',
  },
  RobotoRegularText__medium: {
    fontFamily: 'LatoHeavy',
    fontSize: '9px',
    color: '#0e3569',
  },
  RobotoRegularText__small: {
    fontFamily: 'LatoHeavy',
    fontSize: '8px',
    color: '#0e3569',
  },
  RobotoBoldTitle__large: {
    fontFamily: 'LatoHeavy',
    fontSize: '16px',
    color: '#0e3569',
  },
  RobotoBoldTitle__medium: {
    fontFamily: 'LatoHeavy',
    fontSize: '13px',
    color: '#0e3569',
  },
  // Alternativos
  RobotoBoldTitle__medium2: {
    fontFamily: 'LatoHeavy',
    fontSize: '12px',
    color: '#0e3569',
  },
  RobotoBoldTitle__center: {
    fontFamily: 'LatoHeavy',
    fontSize: '16px',
    color: '#0e3569',
    alignContent: 'center',
    justifyContent: 'center',
  },
  MallanaBoldTitle__large: {
    fontFamily: 'LatoHeavy',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#0e3569',
  },
  RobotoBoldTitle__XLarge: {
    fontFamily: 'LatoHeavy',
    fontSize: '20px',
    color: '#0e3569',
  },
  subTitle: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: '5px',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    border: '1px solid #000000',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 5,
    // textAlign: "center"
  },
  headerContainer: {
    backgroundColor: 'rgba(214, 221, 230, 1)',
    borderWidth: 0,
    marginTop: -10,
    marginBottom: 0,
    marginLeft: -20,
    marginRight: -20,
    height: 60,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0,
    marginTop: 0,
  },
  footerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0,
    alignContent: 'center',
    marginBottom: 0,
    paddingTop: -20,
  },
  bodyWrapper: {
    flex: 1,
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    border: '1px solid #000000',
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: 40,
    height: 40,
    // marginBottom: '10px',
  },
  image: {
    width: 210,
    height: 130,
    marginTop: '2px',
    marginBottom: '7px',
  },
  imageDriver: {
    width: '50%',
    borderRadius: '10px',
    marginBottom: '5px',
    backgroundColor: 'rgba(214, 221, 230, 1)',
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
    // aspectRatio: 16 / 9,
  },
  checklistStyle: {
    width: '45%',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    backgroundColor: 'rgba(214, 221, 230, 1)',
    borderRadius: '10px',
    marginBottom: '10px',
    padding: '5px',
    margin: '5px',
    marginLeft: '15px',
    paddingTop: '8px',
  },
  // line: {
  //   borderBottomColor: '#000000',
  //   borderBottomWidth: 2,
  //   marginTop: 10,
  //   marginBottom: 10,
  // },
  // dashed_line: {
  //   borderBottomColor: '#000000',
  //   borderBottomWidth: 1,
  //   marginTop: 5,
  //   marginBottom: 5,
  //   borderBottomStyle: 'dashed',
  // },
  // dashed_line_50: {
  //   borderBottomColor: '#000000',
  //   borderBottomWidth: 1,
  //   marginTop: 10,
  //   marginBottom: 10,
  //   borderBottomStyle: 'dashed',
  //   width: '50%',
  // },
  // verticalLine: {
  //   borderRightColor: '#000000',
  //   borderRightWidth: 1,
  //   marginLeft: 10,
  //   marginRight: 10,
  //   height: '95%',

  // },
  // backgroundImage: {
  //   position: 'absolute',
  //   top: 62,
  //   left: 45,
  //   width: '90%',
  //   height: '90%',
  //   zIndex: -1,
  // },
  textOnBackground: {
    position: 'absolute',
    top: 50,
    left: 50,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  let driverPhoto: Array<IFile> = []
  let driverIdentification: Array<File> = []

  if (props.driver.Person.File?.length > 0) {
    driverPhoto = props.driver.Person.File.filter(image => image.name.includes('photo'))
    driverIdentification = props.driver.Person.File?.filter(image => image.name.includes('identification'))
    console.log('DriverPhoto: ', driverPhoto)
    console.log('DriverPhotoIdentification: ', driverIdentification)
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
  console.log('Conductor: ', driverPhoto?.[0]?.url)
  console.log('Conductor: ', driverIdentification?.[0]?.url)
  console.log('1.1Checklist Etrance Vehicle: ', props.entranceVehicle.Checklist)
  console.log('1.1vehicleResponseImages:', props.entranceVehicle.Checklist?.map(che => che.Responses?.map(res => res.File?.map(file => file.url))))
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* <Image src={backgroundImage} style={styles.backgroundImage} /> */}

<<<<<<< HEAD
        {/* <Image
          src={props.entranceVehicle.Checklist.map(ch => ch.File.map(file => ))}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        /> */}
        <View style={[styles.page, styles.headerContainer]}>
          <View style={{ position: 'relative' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image src={logo} style={styles.logo} />
                <View style={{ alignItems: 'center', marginLeft: '8px' }}>
                  <Text style={styles.RobotoBoldTitle__XLarge}>REGISTEGIC</Text>
=======
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
                <Text style={styles.RobotoBoldText__medium}>Nombre: <Text style={styles.RobotoRegularText__medium}>{props.driver.name ? props.driver.name : 'Informacion No Registrada'}</Text></Text>
                <Text style={styles.RobotoBoldText__medium}>Licencia: <Text style={styles.RobotoRegularText__medium}>{props.driver.license ? props.driver.license : 'Informacion No Registrada'}</Text></Text>
                <Text style={styles.RobotoBoldText__medium}>Correo: <Text style={styles.RobotoRegularText__medium}>{props.driver.email ? props.driver.email : 'Informacion No Registrada'}</Text></Text>
                <Text style={styles.RobotoBoldText__medium}>Teléfono: <Text style={styles.RobotoRegularText__medium}>{props.driver.numberphone ? props.driver.numberphone : 'Informacion No Registrada'}</Text></Text>
                <Text style={styles.RobotoBoldText__medium}>Curp: <Text style={styles.RobotoRegularText__medium}>{props.driver.curp ? props.driver.curp : 'Informacion No Registrada'}</Text></Text>
                <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.driver.company ? props.driver.company : 'Informacion No Registrada'}</Text></Text>
                <Text style={styles.RobotoBoldText__medium}>NSS: <Text style={styles.RobotoRegularText__medium}>{props.driver.security_social_number ? props.driver.security_social_number : 'Informacion No Registrada'}</Text></Text>
                <Text style={styles.RobotoBoldText__medium}>Fecha Entrada:
                  <Text style={styles.RobotoRegularText__medium}>
                    {props.enterDate ? formatDate(props.enterDate) : 'Información No Registrada'}
                  </Text>
                </Text>
                <Text style={styles.RobotoBoldText__medium}>Fecha Salida:
                  <Text style={styles.RobotoRegularText__medium}>
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
                  <Text style={styles.RobotoBoldText__medium}>Número de Tráiler que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceTrailer.length : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.plate : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.company : 'Informacion No Registrada'}</Text></Text>
                  <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.vin : 'Informacion No Registrada'}</Text></Text>
>>>>>>> develop_paloma
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                <Text style={styles.RobotoBoldText__small}>ID de Seguimiento: <Text style={styles.RobotoRegularText__small}>{props.id}</Text></Text>
              </View>
            </View>
<<<<<<< HEAD
          </View>
        </View>
        <View style={[styles.page, styles.bodyContainer]}>
          {/* <View style={styles.line} />  Aquí se agrega la línea horizontal */}
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {driverPhoto.length > 0
                  ? (
                    <>
                      {console.log('driverphoto:', driverPhoto)}
                      {console.log('driveridentification:', driverIdentification)}
                      <Image src={driverPhoto !== undefined ? driverPhoto?.[0]?.url : ''} style={styles.imageDriver} />
                      <Image src={driverIdentification !== undefined ? driverIdentification?.[0]?.url : ''} style={styles.imageDriver} />
                    </>

=======
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
                          <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{trailer.number ? trailer.number : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Tipo de Tráiler: <Text style={styles.RobotoRegularText__medium}>{trailer.TrailerType?.name ? trailer.TrailerType.name : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Sello: <Text style={styles.RobotoRegularText__medium}>{trailer.seal ? trailer.seal : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{trailer.plate ? trailer.plate : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{trailer.company ? trailer.company : 'Informacion No Registrada'}</Text></Text>
                          <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{trailer.vin ? trailer.vin : 'Informacion No Registrada'}</Text></Text>
                        </View>
                      </View>
>>>>>>> develop_paloma
                    )
                  : (<Image src={notImage} style={styles.imageDriver} />)
              }
              </View>
              <View style={{ width: '50%', alignItems: 'center', alignContent: 'center', marginTop: '-130px' }}>
                <View >
                  <View style={{ marginBottom: '8px', color: '#a4161a', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.RobotoBoldTitle__large}>CONDUCTOR</Text>
                  </View>
                  <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Nombre: <Text style={styles.RobotoRegularText__medium}>{props.driver.Person.name ? props.driver.Person.name : 'Informacion No Registrada'}</Text></Text>
                  <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Licencia: <Text style={styles.RobotoRegularText__medium}>{props.driver.Person.license ? props.driver.Person.license : 'Informacion No Registrada'}</Text></Text>
                  {/* <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Correo: <Text style={styles.RobotoRegularText__medium}>{props.driver.Person.email ? props.driver.Person.email : 'Informacion No Registrada'}</Text></Text> */}
                  {/* <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Teléfono: <Text style={styles.RobotoRegularText__medium}>{props.driver.Person.numberphone ? props.driver.Person.numberphone : 'Informacion No Registrada'}</Text></Text> */}
                  <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Curp: <Text style={styles.RobotoRegularText__medium}>{props.driver.Person.curp ? props.driver.Person.curp : 'Informacion No Registrada'}</Text></Text>
                  {/* <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.driver.Person. ? props.driver.company : 'Informacion No Registrada'}</Text></Text> */}
                  {/* <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>NSS: <Text style={styles.RobotoRegularText__medium}>{props.driver.Person.security_social_number ? props.driver.Person.security_social_number : 'Informacion No Registrada'}</Text></Text> */}
                  <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Fecha Entrada: <Text style={[styles.RobotoRegularText__medium, { lineHeight: 1.7 }]}>{props.enterDate ? formatDate(props.enterDate) : 'Información No Registrada'}</Text></Text>
                  <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Fecha Salida: <Text style={[styles.RobotoRegularText__medium, { lineHeight: 1.7 }]}>{props.exitDate ? formatDate(props.exitDate) : 'Aún sin salida'}</Text></Text>
                </View>
              </View>
            </View>
          </View>
<<<<<<< HEAD
          {/* <View style={styles.line} />  Aquí se agrega la línea horizontal */}
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
            <View style={{ width: '50%' }}>
              <View style={{ textAlign: 'left' }}>
                <View style={styles.subTitle}>
                  <Text style={styles.RobotoBoldTitle__large}>ENTRADA</Text>
                </View>
                <View style={{ color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={styles.RobotoBoldText__small}>Fecha De Entrada:  </Text>
                  <Text style={styles.RobotoRegularText__small}>
                    {props.enterDate?.toString()}
                  </Text>
                </View>
              </View>
              <View> {/** Vehicles Container */}
                <View style={{ textAlign: 'left', marginBottom: '5px', marginTop: '15px' }}><Text style={styles.RobotoBoldTitle__medium}>VEHÍCULO</Text></View>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <View >
                    <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.unitNumber : 'Informacion No Registrada'}</Text></Text>
                    <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Tipo de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.VehicleType?.name : 'Informacion No Registrada'}</Text></Text>
                    <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Numero de Tráiler que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceTrailer.length : 'Informacion No Registrada'}</Text></Text>
                    <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Placas: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.plate : 'Informacion No Registrada'}</Text></Text>
                    <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle?.Company?.name : 'Informacion No Registrada'}</Text></Text>
                    <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>VIN: <Text style={styles.RobotoRegularText__medium}>{props.entranceVehicle ? props.entranceVehicle.vin : 'Informacion No Registrada'}</Text></Text>
                  </View>
                  {/* <View style={styles.dashed_line} />  Aquí se agrega la línea horizontal */}
                </View>
              </View>
              <View> {/** Trailers Container */}
                {props.entranceTrailer.length > 0 ? <View style={{ display: 'flex', width: '100%', textAlign: 'left', marginBottom: '5px' }}><Text style={styles.RobotoBoldTitle__medium}>REMOLQUES</Text></View> : ''}
                <View style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  {props.entranceTrailer.length > 0
                && (
                  <>
                    {props.entranceTrailer.map((trailer, index) => {
                      return (
                        <View key={index} >
                          <View style={{ marginBottom: '10px' }}>
                            <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{trailer.number ? trailer.number : 'Informacion No Registrada'}</Text></Text>
                            <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Tipo de Trailer: <Text style={styles.RobotoRegularText__medium}>{trailer.TrailerType?.name ? trailer.TrailerType.name : 'Informacion No Registrada'}</Text></Text>
                            <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Sello: <Text style={styles.RobotoRegularText__medium}>{trailer.seal ? trailer.seal : 'Informacion No Registrada'}</Text></Text>
                            <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Placas: <Text style={styles.RobotoRegularText__medium}>{trailer.plate ? trailer.plate : 'Informacion No Registrada'}</Text></Text>
                            <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>Compañía: <Text style={styles.RobotoRegularText__medium}>{trailer.company ? trailer.company : 'Informacion No Registrada'}</Text></Text>
                            <Text style={[styles.RobotoBoldText__medium, { lineHeight: 1.7 }]}>VIN: <Text style={styles.RobotoRegularText__medium}>{trailer.vin ? trailer.vin : 'Informacion No Registrada'}</Text></Text>
=======
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
                  <Text style={styles.RobotoBoldText__medium}>Número de Tráiler que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle ? props.exitTrailer.length : 'Informacion No Registrada'}</Text></Text>
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
                            <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{trailer.number ? trailer.number : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Tipo de Tráiler: <Text style={styles.RobotoRegularText__medium}>{trailer.TrailerType?.name ? trailer.TrailerType.name : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Sello: <Text style={styles.RobotoRegularText__medium}>{trailer.seal ? trailer.seal : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{trailer.plate ? trailer.plate : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{trailer.company ? trailer.company : 'Informacion No Registrada'}</Text></Text>
                            <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{trailer.vin ? trailer.vin : 'Informacion No Registrada'}</Text></Text>
>>>>>>> develop_paloma
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
            {/* <View style={styles.verticalLine} />  Aquí se agrega la línea vertical */}
            <View style={{ width: '50%' }}>
              <View style={{ textAlign: 'left' }}>
                <View style={styles.subTitle}>
                  <Text style={styles.RobotoBoldTitle__large}>SALIDA</Text>
                </View>
                <View style={{ color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={styles.RobotoBoldText__small}>Fecha De Salida:  </Text>
                  <Text style={styles.RobotoRegularText__small}>
                    {props.exitDate?.toString() ? props.exitDate?.toString() : <Text style={styles.RobotoRegularText__small}>Sin Salida</Text>}
                  </Text>
                </View>
              </View>
              <View> {/** Exit Vehicles Container */}
                {((props.exitVehicle)) ? <View style={{ textAlign: 'left', marginBottom: '5px', marginTop: '15px' }}><Text style={styles.RobotoBoldTitle__medium}>VEHÍCULO</Text></View> : ''}
                {props.exitVehicle
              && (
              <>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignContent: 'flex-end', alignItems: 'flex-start' }}>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={styles.RobotoBoldText__medium}>Número de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.unitNumber ? props.exitVehicle.unitNumber : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Tipo de Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.VehicleType?.name ? props.exitVehicle.VehicleType?.name : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Numero de Tráiler que Portaba la Unidad: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle ? props.exitTrailer.length : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Placas: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.plate ? props.exitVehicle.plate : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>Compañía: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.company ? props.exitVehicle.company : 'Informacion No Registrada'}</Text></Text>
                    <Text style={styles.RobotoBoldText__medium}>VIN: <Text style={styles.RobotoRegularText__medium}>{props.exitVehicle.vin ? props.exitVehicle.vin : 'Informacion No Registrada'}</Text></Text>
                  </View>
                </View>

                {/* <View style={styles.dashed_line} />  Aquí se agrega la línea horizontal */}
              </>
              )
                  // : (<Text style={styles.RobotoBoldText__medium}>Sin vehiculo de salida</Text>)
              }
              </View>
              <View> {/** Exit Trailers Container */}
                {((props.exitTrailer) && (props.exitTrailer.length > 0)) ? <View style={{ display: 'flex', width: '100%', textAlign: 'left', marginBottom: '5px' }}><Text style={styles.RobotoBoldTitle__medium}>REMOLQUES</Text></View> : ''}
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
          {/* <View style={styles.dashed_line} />  Aquí se agrega la línea horizontal */}
        </View>
        <View style={[styles.page, styles.footerContainer]}>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-12px' }}>
            <Text style={styles.RobotoBoldTitle__center}>FIRMAS</Text>
            <View style={{ width: '40%', borderRadius: '1px', marginBottom: '2px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5px' }}>
              <Text style={[styles.RobotoBoldTitle__medium2, { marginRight: '100px' }]}>VEHÍCULO</Text>
              <Text style={styles.RobotoBoldTitle__medium2}>REMOLQUES</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap', marginTop: '8px', marginBottom: '-10px' }}>
            {props?.entranceVehicle?.Checklist?.map(che => che?.File?.map((file, index) => {
              return (
                che.id === file.checklistId
                  ? (
                    <>
                      {console.log('mysignature:', file.url)}
                      <Image
                        style={{ width: '20%', display: 'flex' }}
                        src={file.url}
                      />
                    </>
                    )
                  : (
                    <>a</>
                    )
              )
            }))}
          </View>
        </View>
      </Page>
      <Page size="LETTER" style={styles.page}>
<<<<<<< HEAD
        <View style={[styles.page, styles.headerContainer]}>
          <View style={{ position: 'relative' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image src={logo} style={styles.logo} />
                <View style={{ alignItems: 'center', marginLeft: '8px' }}>
                  <Text style={styles.RobotoBoldTitle__XLarge}>REGISTEGIC</Text>
=======
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
>>>>>>> develop_paloma
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                <Text style={styles.RobotoBoldText__small}>ID de Seguimiento: <Text style={styles.RobotoRegularText__small}>{props.id}</Text></Text>
              </View>
            </View>
          </View>
        </View>
        {/* <Image src={backgroundImage} style={styles.backgroundImage} /> */}
        <View style={[styles.page, styles.bodyContainer]}>
          {/* <View style={styles.line} />  Aquí se agrega la línea horizontal */}
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ marginBottom: '5px', color: '#a4161a' }}>
              <Text style={styles.RobotoBoldTitle__large}>CHECKLIST</Text>
            </View>
          </View>
          {/* <Text style={styles.RobotoBoldTitle__medium}>Vehículo</Text> */}
          <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingTop: '8px', marginBottom: '-15px' }}>
            {props?.entranceVehicle?.Checklist?.map((che, cheIndex) => (
              che?.Responses?.map((res, resIndex) => (
                <View key={`${cheIndex}-${resIndex}`} style={styles.checklistStyle}>
                  <Text style={styles.RobotoBoldTitle__large}>{res.Question?.name}</Text>
                  <Text style={styles.RobotoBoldTitle__medium2}>{res.response}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginLeft: '7px' }}>
                    {/* Iterar sobre los archivos dentro de cada respuesta */}
                    {res.File?.map((file, fileIndex) => (
                      <Image key={`${cheIndex}-${resIndex}-${fileIndex}`} src={file.url} style={styles.image} />
                    ))}
                  </View>
                </View>
              ))
            ))}
          </View>

        </View>

      </Page>
    </Document>
  )
}
