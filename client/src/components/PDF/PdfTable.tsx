import React from 'react'
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import RobotoBold from '../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from '../../assets/fonts/Roboto/Roboto-Regular.ttf'

Font.register({ family: 'RobotoBold', src: RobotoBold })
Font.register({ family: 'RobotoRegular', src: RobotoRegular })

const styles = StyleSheet.create({
  table: {
    width: '100%',
    marginLeft: 0,
    marginTop: 3,
  },
  tableRowMain: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,

  },
  tableColMain: {
    width: '100%',
    borderStyle: 'solid',
    textAlign: 'left',
    marginBottom: 0,
    paddingBottom: 0,
    margin: 0,
    padding: 0,
  },
  tableCellMain: {
    margin: 'auto',
    fontSize: 7,
    fontFamily: 'RobotoBold',
    marginBottom: 0,
    paddingBottom: 0,
    padding: 0,
  },
})

const stylesTableContent = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,

  },
  tableCol: {
    width: '100%',
    borderStyle: 'solid',
    textAlign: 'left',
    marginBottom: 0,
    paddingBottom: 0,
    margin: 0,
    padding: 0,
  },
  tableCell: {
    margin: 'auto',
    fontSize: 7,
    fontFamily: 'RobotoRegular',
    marginBottom: 0,
    paddingBottom: 0,
    padding: 0,
  },
})

// Use this component to render a table in pdf-react componet
export function PdfTable(props: { id: string }) {
  return (
    <View style={styles.table}>
      <View style={styles.tableRowMain}>
        <View style={styles.tableColMain}>
          <Text style={styles.tableCellMain}>Posicion</Text>
        </View>
        <View style={styles.tableColMain}>
          <Text style={styles.tableCellMain}>Marca</Text>
        </View>
        <View style={styles.tableColMain}>
          <Text style={styles.tableCellMain}>No. Serie</Text>
        </View>
        <View style={styles.tableColMain}>
          <Text style={styles.tableCellMain}>Prof</Text>
        </View>
        <View style={styles.tableColMain}>
          <Text style={styles.tableCellMain}>Condiciones</Text>
        </View>
        <View style={styles.tableColMain}>
          <Text style={styles.tableCellMain}>Observaciones</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      <View style={stylesTableContent.tableRow}>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
        <View style={stylesTableContent.tableCol}>
          <Text style={stylesTableContent.tableCell}>{props.id}</Text>
        </View>
      </View>
      {/* Agrega más filas aquí */}
    </View>
  )
}
