/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
import { Icon } from '@iconify/react'
import iconUser from '@iconify-icons/ph/user'
import { Group, Modal, Select, Table } from '@mantine/core'
import iconVisitor from '@iconify-icons/ph/person-simple-walk'
import iconTruck from '@iconify-icons/ph/truck'
import iconTow from '@iconify-icons/tabler/truck-loading'
import moment from 'moment'
import iconWarning from '@iconify-icons/ph/warning'
import { useEffect, useState } from 'react'
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'
import { useStore } from 'zustand'
import { set } from 'firebase/database'
import { getVisitors } from '../../../../fetch/Visitor/getVisitors'
import { vars } from '../../../../styles/themes.css'
import { ItemDash } from '../../../Common/Render-item/RenderItem'
import { Header } from '../../../Common/Header/Header'
import { getVisitorsInside } from '../../../../fetch/Visitor/getVisitorsInside'
import { getVehiclesInside } from '../../../../fetch/Vehicles/getVehiclesInside'
import { getDriversInside } from '../../../../fetch/Drivers/getDriversInside'
import { getTrailersInside } from '../../../../fetch/Trailers/getTrailersInside'
import { getAllLocations, getEveryLocation } from '../../../../fetch/Locations/getLocations'
import { getAllIncidents } from '../../../../fetch/Incidents/getIncidents'
import { locationStore } from '../../../../zustand/locationsStore'
import { visitorStore } from '../../../../zustand/VisitorStore'
import { analiticStore } from '../../../../zustand/analiticalStore'

import { CreateTableVisitors } from './TableVisitorsDash/createTableVisitors'
import * as styles from './Home.css'

import { visitorsTableDashboard } from './TableVisitorsDash/columnsVisitors'
import type { IDriver, IIncident, ITrailer, IVehicle, IVisitor } from '../../../../interfaces'

export function Home() {
  const {
    driversInside: dataDriver,
    vehicleInside: dataVehicle,
    trailerInside: dataTrailer,
    incidentsInside: dataIncident,
    setDriversInside,
    setVehiclesInside,
    setTrailersInside,
    setIncidentsInside,
  } = useStore(analiticStore)

  const { locations, setLocations } = useStore(locationStore)
  const { visitors: dataVisitor, setVisitors } = useStore(visitorStore)
  const [showModal, setShowModal] = useState(false)
  const [isSelectHovered, setIsSelectHovered] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null)
  const [modalTitle, setModalTitle] = useState('')
  const [filter, setFilter] = useState<'day' | 'week'>('day')
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const color = [
    [vars.colors.principal],
  ]

  const legends = {
    ca: 'Capacidad',
    da: 'En uso',
  }

  enum DataType {
    Driver,
    Visitor,
    Vehicle,
    Trailer,
    Incident,
  }

  const columns = visitorsTableDashboard()

  const openModal = (type: DataType) => {
    setSelectedItem(type)
    setShowModal(true)

    switch (type) {
      case DataType.Driver:
        setModalTitle('Conductores dentro')
        break
      case DataType.Visitor:
        setModalTitle('Visitantes dentro')
        break
      case DataType.Vehicle:
        setModalTitle('Camiones dentro')
        break
      case DataType.Trailer:
        setModalTitle('Tráilers dentro')
        break
      case DataType.Incident:
        setModalTitle('Incidentes')
        break
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setModalTitle('')
  }

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  function filterIncidents(incidents: Array<IIncident>, filter: 'day' | 'week') {
    const currentDate = new Date()
    const timePeriodInMilliseconds = filter === 'day' ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000
    const timeAgo = new Date(currentDate.getTime() - timePeriodInMilliseconds)

    const filtered = incidents.filter((incident) => {
      if (incident.datetime) {
        const incidentDateTime = typeof incident.datetime === 'string' ? new Date(incident.datetime) : incident.datetime
        return incidentDateTime >= timeAgo
      }
      return false // Si dateTime no está definido, filtrar el incidente
    })
    return filtered
  }

  useEffect(() => {
    const getData = async() => {
      try {
        const driverData = await getDriversInside()
        setDriversInside(driverData.data)

        const visitorData = await getVisitorsInside()
        setVisitors(visitorData.data)

        const vehicleData = await getVehiclesInside()
        setVehiclesInside(vehicleData.data)

        const trailerData = await getTrailersInside()
        setTrailersInside(trailerData.data)

        const locationsData = await getAllLocations()
        setLocations(locationsData.data)

        const incidentsData = await getAllIncidents()
        const filteredIncidents = filterIncidents(incidentsData.data, filter === 'week' ? 'week' : 'day')
        setIncidentsInside(filteredIncidents)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [filter])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Header title="Inicio" />
      <div className={styles.dashContainer}>
        <div className={styles.topContainer}>
          <div className={styles.topContainerDash1}>
            <ItemDash
              data={dataDriver.length}
              label="Conductores"
              icon={iconUser}
              onClick={() => openModal(DataType.Driver)}
            />
            <ItemDash
              data={dataVisitor.length}
              label="Visitantes"
              icon={iconVisitor}
              onClick={() => openModal(DataType.Visitor)}
            />
          </div>
          <div className={styles.topContainerDash}>
            <ItemDash
              data={dataVehicle.length}
              label="Camiones"
              icon={iconTruck}
              onClick={() => openModal(DataType.Vehicle)}
            />
            <ItemDash
              data={dataTrailer.length}
              label="Remolques"
              icon={iconTow}
              onClick={() => openModal(DataType.Trailer)}
            />
          </div>
          {showModal
          && <Modal
            opened={showModal}
            onClose={closeModal}
            withCloseButton={false}
            transitionProps={{ transition: 'fade', duration: 600 }}
            size="70%"
             >
            <Modal.Title className={styles.dialogTitle}>{modalTitle}</Modal.Title>
            <Modal.Body>
              {selectedItem === DataType.Driver && <DriverTable data={dataDriver} />}
              {selectedItem === DataType.Visitor && <VisitorTable data={dataVisitor} />}
              {selectedItem === DataType.Vehicle && <VehicleTable data={dataVehicle} />}
              {selectedItem === DataType.Trailer && <TrailerTable data={dataTrailer} />}
              {selectedItem === DataType.Incident && <IncidentTable data={dataIncident} />}
            </Modal.Body>
          </Modal>
         }
        </div>
        <div className={styles.downContainer}>
          <div className={styles.chartConatiner}>
            <p className={styles.titleP}>Camiones</p>
            {/* <BarChart
              width={dimensions.width * 0.5}
              height={dimensions.height * 0.5}
              data={locations.filter(f => f.status === true)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend formatter={value => legends[value] || value} />
              <Bar dataKey="da" stackId="a" fill={color} name={legends.da} />
              <Bar dataKey="capacity" stackId="a" fill="#82ca9d" name={legends.ca} />
            </BarChart> */}

            <ComposedChart
              layout="vertical"
              width={dimensions.width * 0.7}
              height={dimensions.height * 0.5}
              data={locations.filter(f => f.status === true)}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" scale="band" />
              <Tooltip />
              <Legend />
              {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
              <Bar dataKey="capacity" fill={color} name={legends.ca} />
              {/* <Line dataKey="uv" stroke="#ff7300" /> */}
            </ComposedChart>
          </div>
          <div className={styles.incidentContainer}>
            <div onClick={() => openModal(DataType.Incident)} transition={{ duration: 0.5 }} whileHover={{ scale: 1.04 }} className={styles.item}>
              <div style={{ display: 'flex', width: '100%' }}>
                <Icon className={styles.icon} icon={iconWarning} />
                <div style={{ width: '90%', paddingLeft: '15px' }} onClick={e => e.stopPropagation()}>
                  <Select
                    placeholder="Seleccione una opción"
                    data={[
                      { value: 'day', label: '1 día' },
                      { value: 'week', label: '1 semana' },
                    ]}
                    value={filter}
                    onChange={(selectedOption) => {
                      console.log('Selected Option:', selectedOption)
                      if (selectedOption === 'day' || selectedOption === 'week')
                        setFilter(selectedOption)
                      else
                        console.error('Valor no válido seleccionado:', selectedOption)
                    }}
                  />
                </div>
              </div>
              <div className={styles.itemText}>
                <p style={{ color: 'gray' }}>Incidentes</p>
                <p className={styles.pItem}>{dataIncident.length} Incidentes</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '0.8rem' }}>
          <p className={styles.titleP}>Visitas</p>
          <CreateTableVisitors columns={columns} data={dataVisitor} />
        </div>
      </div>
    </div>
  )
}

function DriverTable({ data }: { data: Array<IDriver> }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Compañía</th>
          <th>CURP</th>
        </tr>
      </thead>
      <tbody>
        {data.map(driver => (
          <tr key={driver.id}>
            <td>{driver.Person?.name} {driver.Person?.lastname}</td>
            <td>{driver.Company?.name}</td>
            <td>{driver.Person?.curp}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

function VisitorTable({ data }: { data: Array<IVisitor> }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Compañía</th>
          <th>Tipo de visita</th>
        </tr>
      </thead>
      <tbody>
        {data.map(visitor => (
          <tr key={visitor.id}>
            <td>{visitor.Person?.name}</td>
            <td>{visitor.Company?.name}</td>
            <td>{visitor.VisitorType?.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

function VehicleTable({ data }: { data: Array<IVehicle> }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Vehículo</th>
          <th>Placas</th>
          <th>Compañía</th>
        </tr>
      </thead>
      <tbody>
        {data.map(vehicle => (
          <tr key={vehicle.id}>
            <td>{vehicle.VehicleType?.name}</td>
            <td>{vehicle.plate}</td>
            <td>{vehicle.Company?.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

function TrailerTable({ data }: { data: Array<ITrailer> }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Tráiler</th>
          <th>Placas</th>
          <th>Compañía</th>
        </tr>
      </thead>
      <tbody>
        {data.map(trailer => (
          <tr key={trailer.id}>
            <td>{trailer.TrailerType?.name}</td>
            <td>{trailer.plate}</td>
            <td>{trailer.Company?.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

function IncidentTable({ data }: { data: Array<IIncident> }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Asunto</th>
          <th>Ubicación</th>
          <th>Reporte</th>
        </tr>
      </thead>
      <tbody>
        {data.map(incident => (
          <tr key={incident.id}>
            <td>{incident.datetime ? new Date(incident.datetime).toLocaleString() : 'N/A'}</td>
            <td>{incident.subject}</td>
            <td>{incident.Location?.name}</td>
            <td>{incident.report}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
