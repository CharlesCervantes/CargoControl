
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Button, Checkbox, Divider, Group, Input, Modal, Select, Title } from '@mantine/core' // Asegúrate de importar estas dependencias del lugar correcto
import { filterApplied, noMatches, noValidValues } from '../../../components/Notifications/notifications'
import {
  entranceAndExitTrailer,
  entranceAndExitVehicle,
  entranceAndExitVehicleAndEntranceAndExitTrailer,
  entranceAndExitVehicleAndEntranceTrailers,
  entranceAndExitVehicleAndExitTrailers,
  entranceOrExitTrailer,
  entranceOrExitTrailerAndEntranceAndExitVehicle,
  entranceOrExitTrailerAndEntranceVehicle,
  entranceOrExitTrailerAndExitVehicle,
  entranceOrExitVehicle,
  entranceOrExitVehicleAndEntranceAndExitTrailer,
  entranceOrExitVehicleAndEntranceOrExitTrailer,
  entranceOrExitVehicleAndEntranceTrailer,
  entranceOrExitVehiclerAndExitTrailer,
  entranceTrailers,
  entranceVehicle,
  entranceVehicleAndEntranceAndExitTrailers,
  entranceVehicleAndEntranceTrailers,
  entranceVehicleAndExitTrailers,
  exitTrailers,
  exitVehicle,
  exitVehicleAndEntranceAndExitTrailers,
  exitVehicleAndEntranceTrailers,
  exitVehicleAndExitTrailers,
} from './FilterOperations'
import type { EntranceUnits, VehicleTypeEntity } from '../../../interfaces'

export function AdvancedSearch(props: { trailerTypes: Array<VehicleTypeEntity>, vehicleTypes: Array<VehicleTypeEntity>, data: Array<EntranceUnits>, filterData: any }) {
  // Modal
  const [opened, { open, close }] = useDisclosure(false)

  // Checkbox
  const [vehicleValue, setVehicleValue] = useState<Array<string>>([])
  const [trailerValue, setTrailerValue] = useState<Array<string>>([])

  // Filtered Data
  const [newData, setNewData] = useState<Array<EntranceUnits>>([])

  // Notifications
  const [applyFilter, setApplyFilter] = useState(false)

  // Vehicles
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleUnitNumber, setVehicleUnitNumber] = useState('')
  const [vehicleCompany, setVehicleCompany] = useState('')
  const [vehiclePlates, setVehiclePlates] = useState('')
  const [vehicleVin, setVehicleVin] = useState('')

  // Trailers
  const [trailerType, setTrailerType] = useState('')
  const [trailerNumber, setTrailerNumber] = useState('')
  const [trailerCompany, setTrailerCompany] = useState('')
  const [trailerSeal, setTrailerSeal] = useState('')
  const [trailerPlates, setTrailerPlates] = useState('')
  const [trailerVin, setTrailerVin] = useState('')

  useEffect(() => {
    props.filterData(newData)
  }, [newData])

  useEffect(() => {
    if (applyFilter) {
      // Esto se ejecutará solo cuando applyFilter sea true
      if (newData.length === 0)
        noMatches()
      else
        filterApplied()

      // Resetear applyFilter a false después de utilizarlo
      setApplyFilter(false)
      resetValues()
    }
  }, [newData, applyFilter]) // Añade applyFilter como una dependencia

  const handleCheckboxChange = (value) => {
    if (value.includes('both')) {
      // Si se selecciona "En Entradas o Salidas", deseleccionar y deshabilitar los otros checkboxes
      setVehicleValue(['both'])
    } else {
      // Si se selecciona cualquier otro checkbox, actualizar el valor del estado normalmente
      setVehicleValue(value)
    }
  }

  const handleTrailerCheckboxChange = (value) => {
    if (value.includes('both')) {
      // Si se selecciona "En Entradas o Salidas", deseleccionar y deshabilitar los otros checkboxes
      setTrailerValue(['both'])
    } else {
      // Si se selecciona cualquier otro checkbox, actualizar el valor del estado normalmente
      setTrailerValue(value)
    }
  }
  function filteredData() {
    console.log('vehicleValue:', vehicleValue, 'trailerValue:', trailerValue)
    if (vehicleValue.length > 0 && trailerValue.length === 0) { // si no se selecciona nada en trailers
      console.log('condicion 1')
      if (vehicleValue.length === 1 && vehicleValue[0] === 'vehicleEntrance') { // seleccionamos solo entradas
        // setNewData(entranceVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin))
        setNewData(entranceOrExitTrailerAndEntranceVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
      } else {
        if (vehicleValue.length === 1 && vehicleValue[0] === 'vehicleExit') { // seleccionamos solo salidas
          // setNewData(exitVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin))
          setNewData(entranceOrExitTrailerAndExitVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
        } else {
          if (vehicleValue.length === 1 && vehicleValue[0] === 'both') { // seleccionamos entradas o salidas
            // setNewData(entranceOrExitVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin))
            setNewData(entranceOrExitVehicleAndEntranceOrExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
          } else {
            if (vehicleValue.length === 2 && (vehicleValue.map(v => v !== 'both'))) // seleccionamos entradas y salidas
              // setNewData(entranceAndExitVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin))
              setNewData(entranceOrExitTrailerAndEntranceAndExitVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
          }
        }
      }
    } else {
      if (vehicleValue.length === 0 && trailerValue.length > 0) { // si no se selecciona nada en vehiculos
        if (trailerValue.length === 1 && trailerValue[0] === 'trailerEntrance') { // seleccionamos solo entradas
          // setNewData(entranceTrailers(props.data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
          setNewData(entranceOrExitVehicleAndEntranceTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
        } else {
          if (trailerValue.length === 1 && trailerValue[0] === 'trailerExit') { // Seleccionamos solo salidas
            // setNewData(exitTrailers(props.data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
            setNewData(entranceOrExitVehiclerAndExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
          } else {
            if (trailerValue.length === 1 && trailerValue[0] === 'both') { // Seleccionamos entradas o salidas
              // setNewData(entranceOrExitTrailer(props.data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
              setNewData(entranceOrExitVehicleAndEntranceOrExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
            } else {
              if (trailerValue.length === 2 && (trailerValue.map(t => t !== 'both'))) // Seleccionamos entradas y salidas
                // setNewData(entranceAndExitTrailer(props.data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                setNewData(entranceOrExitVehicleAndEntranceAndExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
            }
          }
        }
      } else {
        if (vehicleValue.length > 0 && trailerValue.length > 0) { // si se selecciona algo en vehiculos y trailers
          console.log('condicion 2')
          if ((vehicleValue.length === 1 && trailerValue.length === 1) && ((trailerValue[0] === 'trailerEntrance') && vehicleValue[0] === 'vehicleEntrance')) { // seleccionamos entradas de vehiculo y entradas de trailer
            setNewData(entranceVehicleAndEntranceTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
          } else {
            if ((vehicleValue.length === 1 && trailerValue.length === 1) && ((trailerValue[0] === 'trailerExit') && vehicleValue[0] === 'vehicleEntrance')) { // seleccionamos entradas de vehiculo y salidas de trailer
              setNewData(entranceVehicleAndExitTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
            } else {
              if ((vehicleValue.length === 1 && trailerValue.length === 1) && ((trailerValue[0] === 'both') && vehicleValue[0] === 'vehicleEntrance')) { // seleccionamos entradas de vehiculo y entradas o salidas de trailer
                setNewData(entranceOrExitTrailerAndEntranceVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
              } else {
                if ((vehicleValue.length === 1 && trailerValue.length === 2) && ((trailerValue.map(t => t !== 'both')) && vehicleValue[0] === 'vehicleEntrance')) { // seleccionamos entradas de vehiculo y entradas y salidas de trailer
                  setNewData(entranceVehicleAndEntranceAndExitTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                } else {
                  if ((vehicleValue.length === 1 && trailerValue.length === 1) && ((trailerValue[0] === 'trailerEntrance') && vehicleValue[0] === 'vehicleExit')) { // seleccionamos salidas de vehiculo y entradas de trailer
                    setNewData(exitVehicleAndEntranceTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                  } else {
                    if ((vehicleValue.length === 1 && trailerValue.length === 1) && ((trailerValue[0] === 'trailerExit') && vehicleValue[0] === 'vehicleExit')) { // seleccionamos salidas de vehiculo y salidas de trailer
                      setNewData(exitVehicleAndExitTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                    } else {
                      if ((vehicleValue.length === 1 && trailerValue.length === 1) && ((trailerValue[0] === 'both') && vehicleValue[0] === 'vehicleExit')) { // seleccionamos salidas de vehiculo y entradas o salidas de trailer
                        setNewData(entranceOrExitTrailerAndExitVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                      } else {
                        if ((vehicleValue.length === 1 && trailerValue.length === 2) && ((trailerValue.map(t => t !== 'both')) && vehicleValue[0] === 'vehicleExit')) { // seleccionamos salidas de vehiculo y entradas y salidas de trailer
                          setNewData(exitVehicleAndEntranceAndExitTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                        } else {
                          if ((vehicleValue.length === 2 && trailerValue.length === 1) && ((vehicleValue.map(v => v !== 'both')) && trailerValue[0] === 'trailerEntrance')) { // seleccionamos entradas y salidas de vehiculo y entradas de trailer
                            setNewData(entranceAndExitVehicleAndEntranceTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                          } else {
                            if ((vehicleValue.length === 2 && trailerValue.length === 1) && ((vehicleValue.map(v => v !== 'both')) && trailerValue[0] === 'trailerEntrance')) { // seleccionamos entradas y salidas de vehiculo y salidas de trailer
                              setNewData(entranceAndExitVehicleAndExitTrailers(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                            } else {
                              if ((vehicleValue.length === 2 && trailerValue.length === 2) && ((vehicleValue.map(v => v !== 'both')) && (trailerValue.map(t => t !== 'both')))) { // seleccionamos entrada y salida de vehiculo y entrada y salida de trailer
                                setNewData(entranceAndExitVehicleAndEntranceAndExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                              } else {
                                if ((vehicleValue.length === 1 && trailerValue.length === 2) && ((vehicleValue[0] === 'both') && (trailerValue.map(t => t !== 'both')))) { // seleccionamos entrada o salida de vehiculo y entradada y salida de trailer
                                  setNewData(entranceOrExitVehicleAndEntranceAndExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                                } else {
                                  if ((vehicleValue.length === 2 && trailerValue.length === 1) && ((trailerValue[0] === 'both') && (vehicleValue.map(v => v !== 'both')))) { // seleccionamos entrada o salida de trailer y entrada y salida de vehiculo
                                    setNewData(entranceOrExitTrailerAndEntranceAndExitVehicle(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                                  } else {
                                    if ((vehicleValue.length === 1 && trailerValue.length === 1) && ((trailerValue[0] === 'both') && (vehicleValue[0] === 'both'))) { // seleccionamos entradas o salidas de vehiculos y entradas o salidas de trailer
                                      setNewData(entranceOrExitVehicleAndEntranceOrExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if ((vehicleValue.length === 0) && (trailerValue.length === 0)) {
            console.log('condicion 3')
            setNewData(entranceOrExitVehicleAndEntranceOrExitTrailer(props.data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin))
            noValidValues()
          }
        }
      }
    }
    setApplyFilter(true)
  }

  function resetValues() {
    // Reset Vehicles
    setVehicleType('')
    setVehicleUnitNumber('')
    setVehicleCompany('')
    setVehiclePlates('')
    setVehicleVin('')

    // Reset Trailers
    setTrailerType('')
    setTrailerNumber('')
    setTrailerCompany('')
    setTrailerSeal('')
    setTrailerPlates('')
    setTrailerVin('')

    // Reset States
    setVehicleValue([])
    setTrailerValue([])
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close()
          resetValues()
        }}
        title="Agregar Filtros"
        centered
      >
        {/* Vehiculos */}
        <Input.Wrapper maw={320} mx="auto">
          <Title order={2} align="end">Vehículo</Title>
        </Input.Wrapper>
        <Input.Wrapper maw={320} mx="auto">
          <Select
            label="Tipo de Vehículo"
            placeholder="Selecciona el Tipo de Vehículo"
            searchable
            nothingFound="Sin opciones"
            data={[...props.vehicleTypes.map(t => t.name)]}
            onSelect={(ev) => { setVehicleType(ev.currentTarget.value) }}
            // onClickCapture={(ev) => { setVehicleType(ev.currentTarget.value) }}
            // onClick={(ev) => { setVehicleType(ev.currentTarget.value) }}
            // onFocus={(ev) => { setVehicleType(ev.currentTarget.value) }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Número de Unidad" maw={320} mx="auto">
          <Input onChange={ev => setVehicleUnitNumber(ev.target.value)} placeholder="127371" />
        </Input.Wrapper>
        <Input.Wrapper label="Compañía" maw={320} mx="auto">
          <Input onChange={ev => setVehicleCompany(ev.target.value)} placeholder="Mazda" />
        </Input.Wrapper>
        <Input.Wrapper label="Placas" maw={320} mx="auto">
          <Input onChange={ev => setVehiclePlates(ev.target.value)} placeholder="123-ABC" />
        </Input.Wrapper>
        <Input.Wrapper label="VIN" maw={320} mx="auto" style={{ marginBottom: '1rem' }}>
          <Input onChange={ev => setVehicleVin(ev.target.value)} placeholder="723146" />
        </Input.Wrapper>
        <Input.Wrapper maw={320} mx="auto" style={{ marginBottom: '1rem' }}>
          <Checkbox.Group
            value={vehicleValue}
            onChange={handleCheckboxChange}
            label="Selecciona si deseas buscar en entradas o salidas"
            description="se buscará especificamente en la opción que selecciones"
            withAsterisk
          >
            <Group mt="xs">
              <Checkbox
                value="vehicleEntrance"
                label="Entradas"
                disabled={vehicleValue.includes('both')}
                checked={vehicleValue.includes('vehicleEntrance')}
              />
              <Checkbox
                value="vehicleExit"
                label="Salidas"
                disabled={vehicleValue.includes('both')}
                checked={vehicleValue.includes('vehicleExit')}
              />
              <Checkbox value="both" label="En Entradas o Salidas" />
            </Group>
          </Checkbox.Group>
        </Input.Wrapper>
        <Divider my="sm" />

        {/* Trailers */}
        <Input.Wrapper maw={320} mx="auto" style={{ marginTop: '1rem' }}>
          <Title order={2} align="start">Tráiler</Title>
        </Input.Wrapper>
        <Input.Wrapper maw={320} mx="auto">
          <Select
            label="Tipo de Tráiler"
            style={{ textAlign: 'end' }}
            placeholder="Selecciona el Tipo de Tráiler"
            onSelect={(ev) => { setTrailerType(ev.currentTarget.value) }}
            searchable
            nothingFound="Sin opciones"
            data={[...props.trailerTypes.map(t => t.name)]}
          />
        </Input.Wrapper>
        <Input.Wrapper style={{ textAlign: 'end' }} label="Numero" maw={320} mx="auto">
          <Input onChange={ev => setTrailerNumber(ev.target.value)} placeholder="127371" />
        </Input.Wrapper>
        <Input.Wrapper style={{ textAlign: 'end' }} label="Compañia" maw={320} mx="auto">
          <Input onChange={ev => setTrailerCompany(ev.target.value)} placeholder="Mazda" />
        </Input.Wrapper>
        <Input.Wrapper style={{ textAlign: 'end' }} label="Sello" maw={320} mx="auto">
          <Input onChange={ev => setTrailerSeal(ev.target.value)} placeholder="123-ABC" />
        </Input.Wrapper>
        <Input.Wrapper style={{ textAlign: 'end' }} label="Placas" maw={320} mx="auto">
          <Input onChange={ev => setTrailerPlates(ev.target.value)} placeholder="723146" />
        </Input.Wrapper>
        <Input.Wrapper style={{ textAlign: 'end' }} label="VIN" maw={320} mx="auto">
          <Input onChange={ev => setTrailerVin(ev.target.value)} placeholder="723146" />
        </Input.Wrapper>
        <Input.Wrapper maw={320} mx="auto" style={{ marginBottom: '1rem' }}>
          <Checkbox.Group
            value={trailerValue}
            onChange={handleTrailerCheckboxChange}
            label="Selecciona si deseas buscar en entradas o salidas"
            description="se buscará específicamente en la opción que selecciones"
            withAsterisk
          >
            <Group mt="xs">
              <Checkbox
                value="trailerEntrance"
                label="Entradas"
                disabled={trailerValue.includes('both')}
                checked={trailerValue.includes('trailerEntrance')}
              />
              <Checkbox
                value="trailerExit"
                label="Salidas"
                disabled={trailerValue.includes('both')}
                checked={trailerValue.includes('trailerExit')}
              />
              <Checkbox value="both" label="En Entradas o Salidas" />
            </Group>
          </Checkbox.Group>
        </Input.Wrapper>
        <div style={{ marginTop: '1rem', display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Button
            onClick={() => {
              filteredData()
              close()
            }}
            size="md"
          >Buscar
          </Button>
        </div>
      </Modal>
      <Group position="center">
        <Button onClick={open}>Busqueda Filtrada</Button>
        <Button
          onClick={() => {
            props.filterData([])
            setNewData([])
          }
          }
          color={newData.length > 0 ? 'red' : 'cyan'}
          disabled={newData.length <= 0}
        >
          Eliminar Filtro
        </Button>
      </Group>
    </>
  )
}
