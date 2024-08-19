import React, { useEffect, useState } from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import logo from '../../assets/Logo1.png'
import Mallana from '../../assets/fonts/Mallana/Mallanna-Regular.ttf'
import RobotoBold from '../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from '../../assets/fonts/Roboto/Roboto-Regular.ttf'
import RobotoLight from '../../assets/fonts/Roboto/Roboto-Light.ttf'
import { getTrailerById, getVehicleById } from '../../fetch/getInfoById'
import { PdfTable } from './PdfTable'
import type { IDriver, ITrailer, IVehicle, Trailer, Vehicle } from 'src/interfaces'

// Use this component to create a pdf template
Font.register({ family: 'Mallana', src: Mallana, fontWeight: 700 })
Font.register({ family: 'RobotoBold', src: RobotoBold })
Font.register({ family: 'RobotoRegular', src: RobotoRegular })

const styles = StyleSheet.create({
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
  },
  boldElement: {
    fontFamily: 'RobotoBold',
    fontSize: 8,
  },
  regularElement: {
    fontFamily: 'RobotoRegular',
    fontSize: 8,
  },
  title: {
    fontFamily: 'RobotoBold',
    fontSize: 12,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
  sectionOne: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 8,
    fontFamily: 'RobotoBold',
    marginTop: 15,
  },
  propsContainer: {
    width: '50%',
  },
  propsContainerSC: {
    width: '50%',
    paddingLeft: 20,

  },
  propsContent: {
    fontFamily: 'RobotoRegular',

  },
  line: {
    marginTop: 10,
    width: '100%',
    height: 0.5,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  sectionTwo: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    marginTop: 15,
  },
  sectionThree: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  leftSection: {
    width: '60%',
    height: '100%',
    // backgroundColor: 'blue',
  },
  rigthSection: {
    width: '40%',
    height: '100%',
    // backgroundColor: 'green',
  },
  twoColumns: {
    width: '100%',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
  },
  questions: {
    marginLeft: 15,
    fontSize: 8,
    fontFamily: 'RobotoRegular',
  },
  response: {
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'RobotoRegular',
  },
  sectionFour: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
    height: 125,
  },
  leftSection50: {
    width: '50%',
  },
  rightSection50: {
    width: '50%',

  },

  sectionFive: {
    width: '100%',
    textAlign: 'center',

    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 90,
    paddingRight: 90,
  },

  legend: {
    fontSize: 10,
    fontFamily: 'RobotoRegular',
  },
  signature: {
    marginTop: 50,
    backgroundColor: 'black',
    height: 1,
    width: 140,
    justifyContent: 'center',
  },
})

export function TemplatePDF(props: {
  id: string
  driver: IDriver
  entranceVehicle: Vehicle
  entranceTrailer: Array<Trailer>
  exitVehicle: Vehicle
  exitTrailer: Array<Trailer>
  enterDate: Date
  exitDate: Date
}) {
  console.log('ID', props.id)
  console.log('DRIVER:', props.driver)
  console.log('ENTRANCEVehicle:', props.entranceVehicle)
  console.log('EXITVEHICLE:', props.exitVehicle)
  console.log('ENTRANCETRAILER:', props.entranceTrailer)
  // console.log('ENTRANCETRAILER_LENGHT:', props.entranceTrailer.length)
  console.log('EXITTRAILER:', props.exitTrailer)
  // console.log('EXITTRAILER_LENGHT:', props.exitTrailer.length)
  console.log('ENTERDATE:', props.enterDate)
  console.log('EXITDATE:', props.exitDate)

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
          <Image src={logo} style={styles.logo} />
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>RESUMEN DE ENTRADA</Text>
        </View>
        <View style={styles.sectionOne}>
          <View style={styles.propsContainer}>
            <Text>ID: <Text style={styles.propsContent}>{props.id}</Text></Text>
            <Text>{'\n'}</Text>
            <Text>Conductor <Text style={styles.propsContent} /></Text>
            {props.driver !== null
              ? <>
                <Text>Nombre: <Text style={styles.propsContent}>{props.driver?.name}</Text></Text>
                <Text>Licencia: <Text style={styles.propsContent}>{props.driver?.license}</Text></Text>
                <Text>Curp: <Text style={styles.propsContent}>{props.driver?.curp}</Text></Text>
                <Text>Compañía: <Text style={styles.propsContent}>{props.driver?.company}</Text></Text>
              </>
              : props.driver === null && <Text>SIN CONDUCTOR</Text>
            }
            <Text>{'\n'}</Text>
            <Text>Unidad de Entrada <Text style={styles.propsContent} /></Text>
            {props.entranceVehicle !== null
              ? <>
                <Text>Numero de Unidad: <Text style={styles.propsContent}>{props.entranceVehicle?.unitNumber}</Text></Text>
                <Text>Tipo de Unidad: <Text style={styles.propsContent}>{props.entranceVehicle?.VehicleType?.name}</Text></Text>
                <Text>Numero de Trailers que Portaba la Unidad: <Text style={styles.propsContent}>{props.entranceTrailer?.length || 0}</Text></Text>

                <Text>Placas: <Text style={styles.propsContent}>{props.entranceVehicle?.plate}</Text></Text>
                <Text>Compañía: <Text style={styles.propsContent}>{props.entranceVehicle?.company}</Text></Text>
                <Text>Vin: <Text style={styles.propsContent}>{props.entranceVehicle?.vin}</Text></Text>
              </>
              : props.entranceVehicle === null && <Text>SIN VEHÍCULO DE ENTRADA</Text>
            }
            <Text>{'\n'}</Text>
            <Text>Unidad de Salida <Text style={styles.propsContent} /></Text>
            {props.exitVehicle !== undefined
              ? <>
                <Text>Numero de Unidad: <Text style={styles.propsContent}>{props.exitVehicle?.unitNumber}</Text></Text>
                <Text>Tipo de Unidad: <Text style={styles.propsContent}>{props.exitVehicle?.VehicleType?.name}</Text></Text>
                <Text>Número de Trailers que Portaba la Unidad:<Text style={styles.propsContent}>{props.exitTrailer?.length || 0}</Text></Text>
                <Text>Placas: <Text style={styles.propsContent}>{props.exitVehicle?.plate}</Text></Text>
                <Text>Compañía: <Text style={styles.propsContent}>{props.exitVehicle?.company}</Text></Text>
                <Text>Vin: <Text style={styles.propsContent}>{props.exitVehicle?.vin}</Text></Text>
                </>
              : props.exitVehicle === undefined && <Text>SIN VEHÍCULO DE SALIDA</Text>
            }
            <Text>{'\n'}</Text>
            <Text>Fecha de Entrada: <Text style={styles.propsContent}>{props.enterDate?.toString()}</Text></Text>
            <Text>Fecha de Salida: <Text style={styles.propsContent}>{props.exitDate ? props.exitDate.toString() : 'AÚN SIN SALIR'}</Text></Text>

            {/* <Text>Estatus Caja: <Text style={styles.propsContent}>NA</Text></Text>
            <Text>Tipo de Caja: <Text style={styles.propsContent} /></Text>
            <Text>Revisa: <Text style={styles.propsContent}>NA</Text></Text> */}
          </View>
          <View style={styles.propsContainerSC}>
            <Text>Trailers de Entrada:</Text>
            {props.entranceTrailer && props.entranceTrailer.length > 0
              ? props.entranceTrailer.map((trailer) => {
                return (
                  <View key={trailer.id}>
                    <Text>{'\n'}</Text>
                    <Text style={styles.boldElement}>Placas: <Text style={styles.regularElement}>{trailer?.plate}</Text></Text>
                    <Text style={styles.boldElement}>Sello: <Text style={styles.regularElement}>{trailer?.seal}</Text></Text>
                    <Text style={styles.boldElement}>Compañia: <Text style={styles.regularElement}>{trailer?.company}</Text></Text>
                    <Text style={styles.boldElement}>Tipo de Caja: <Text style={styles.regularElement}>{trailer?.TrailerType?.name}</Text></Text>
                    <Text style={styles.boldElement}>Vin: <Text style={styles.regularElement}>{trailer?.vin}</Text></Text>
                  </View>
                )
              })
              : <Text>SIN TRAILERS DE ENTRADA</Text>}
          </View>
          <View style={styles.propsContainerSC}>
            <Text>Trailers de Salida:</Text>
            {props.exitTrailer && props.exitTrailer.length > 0
              ? props.exitTrailer.map((trailer) => {
                return (
                  <View key={trailer.id}>
                    <Text>{'\n'}</Text>
                    <Text style={styles.boldElement}>Placas: <Text style={styles.regularElement}>{trailer?.plate}</Text></Text>
                    <Text style={styles.boldElement}>Sello: <Text style={styles.regularElement}>{trailer?.seal}</Text></Text>
                    <Text style={styles.boldElement}>Compañía: <Text style={styles.regularElement}>{trailer?.company}</Text></Text>
                    <Text style={styles.boldElement}>Tipo de Caja: <Text style={styles.regularElement}>{trailer?.TrailerType?.name}</Text></Text>
                    <Text style={styles.boldElement}>Vin: <Text style={styles.regularElement}>{trailer?.vin}</Text></Text>
                  </View>
                )
              })
              : <Text>SIN TRAILERS DE SALIDA</Text>
            }
          </View>

        </View>
        <View style={styles.line} />
        {/* <View style={styles.center}>
          <Text style={styles.title}>DAÑOS O DESPERFECTOS</Text>
        </View>
        <View style={styles.sectionTwo}> * Render Images Here</View> */}
        <View style={styles.sectionThree}>
          <View style={styles.leftSection}>
            <Text style={styles.title}>CONDICIONES DE LLANTAS</Text>
            {/* <PdfTable id={props.driver} /> */}
          </View>
          <View style={styles.rigthSection}>
            <Text style={styles.title}>PREGUNTAS</Text>
            <View style={styles.twoColumns}>
              <View style={styles.leftSection}>
                <Text style={styles.questions}>QUESTION</Text>
                <Text style={styles.questions}>QUESTION2</Text>
                <Text style={styles.questions}>QUESTION3</Text>
              </View>
              <View style={styles.rigthSection}>
                <Text style={styles.response}>SI</Text>
                <Text style={styles.response}>SI</Text>
                <Text style={styles.response}>NO</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.sectionFour}>
          <View style={styles.leftSection50}>
            <Text style={styles.title}>CONDICIONES GENERALES</Text>
          </View>
          <View style={styles.rightSection50}>
            <Text style={styles.title}>PUNTOS CTPAT</Text>
          </View>
        </View>
        <View style={styles.sectionFive}>
          <Text style={styles.title}>FIRMA DEL OPERADOR</Text>
          <Text style={styles.legend}>Yo certifico que en mi presencia se realizó la inspección arriba descrita y
            avalo que las condiciones señaladas son correctas y verdaderas.
            Autorizo mi licencia sea digitalizada como evidencia del presente formulario.
          </Text>
          <View style={styles.signature} />
        </View>
      </Page>
    </Document>
  )
}
