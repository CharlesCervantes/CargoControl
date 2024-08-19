import type { EntranceUnits } from '../../../interfaces'

export function entranceVehicle(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
) {
  console.log('buscando solo vehiculos de entrada')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin)
  // Info With Filter Vehicles
  const filterVehicleType = vehicleType !== '' ? data.filter(vehicle => vehicle?.entranceUnit?.Vehicle?.VehicleType?.name === vehicleType) : data
  const filterVehicleUnitNumber = vehicleUnitNumber !== '' ? filterVehicleType.filter(vehicle => vehicle?.entranceUnit?.Vehicle?.unitNumber === vehicleUnitNumber) : filterVehicleType
  const filterVehicleCompany = vehicleCompany !== '' ? filterVehicleUnitNumber.filter(vehicle => vehicle?.entranceUnit?.Vehicle?.company === vehicleCompany) : filterVehicleUnitNumber
  const filterVehiclePlates = vehiclePlates !== '' ? filterVehicleCompany.filter(vehicle => vehicle?.entranceUnit?.Vehicle?.plate === vehiclePlates) : filterVehicleCompany
  const filterVehicleVin = vehicleVin !== '' ? filterVehiclePlates.filter(vehicle => vehicle?.entranceUnit?.Vehicle?.vin === vehicleVin) : filterVehiclePlates

  return filterVehicleVin
} // modificado

export function entranceTrailers(
  data: Array<EntranceUnits>,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando solo trailers de entrada')
  console.log(
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)

  // Info With Filter Trailers
  const filterTrailerType = trailerType !== '' ? data.filter(trailer => trailer?.entranceUnit?.Trailer.find(t => t.TrailerType?.name === trailerType)).filter(Boolean) : data
  const filterTrailerNumber = trailerNumber !== '' ? filterTrailerType.filter(trailer => trailer?.entranceUnit?.Trailer.find(t => t?.number === trailerNumber)).filter(Boolean) : filterTrailerType
  const filterTrailerCompany = trailerCompany !== '' ? filterTrailerNumber.filter(trailer => trailer?.entranceUnit?.Trailer.find(t => t?.company === trailerCompany)).filter(Boolean) : filterTrailerNumber
  const filterTrailerSeal = trailerSeal !== '' ? filterTrailerCompany.filter(trailer => trailer?.entranceUnit?.Trailer.find(t => t?.seal === trailerSeal)).filter(Boolean) : filterTrailerCompany
  const filterTrailerPlates = trailerPlates !== '' ? filterTrailerSeal.filter(trailer => trailer?.entranceUnit?.Trailer.find(t => t?.plate === trailerPlates)).filter(Boolean) : filterTrailerSeal
  const filterTrailerVin = trailerVin !== '' ? filterTrailerPlates.filter(trailer => trailer?.entranceUnit?.Trailer.find(t => t?.vin === trailerVin)).filter(Boolean) : filterTrailerPlates

  return filterTrailerVin
} // modificado

export function exitVehicle(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
) {
  console.log('buscando solo vehiculos de salida')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
  )
  // Info With Filter Exit Vehicles
  const filterExitVehicleType = vehicleType !== '' ? data.filter(vehicle => vehicle?.exitUnit?.Vehicle?.VehicleType?.name === vehicleType) : data
  const filterExitVehicleUnitNumber = vehicleUnitNumber !== '' ? filterExitVehicleType.filter(vehicle => vehicle?.exitUnit?.Vehicle?.unitNumber === vehicleUnitNumber) : filterExitVehicleType
  const filterExitVehicleCompany = vehicleCompany !== '' ? filterExitVehicleUnitNumber.filter(vehicle => vehicle?.exitUnit?.Vehicle?.company === vehicleCompany) : filterExitVehicleUnitNumber
  const filterExitVehiclePlates = vehiclePlates !== '' ? filterExitVehicleCompany.filter(vehicle => vehicle?.exitUnit?.Vehicle?.plate === vehiclePlates) : filterExitVehicleCompany
  const filterExitVehicleVin = vehicleVin !== '' ? filterExitVehiclePlates.filter(vehicle => vehicle?.exitUnit?.Vehicle?.vin === vehicleVin) : filterExitVehiclePlates

  return filterExitVehicleVin
} // modificado

export function exitTrailers(
  data: Array<EntranceUnits>,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando solo trailers de salida')
  console.log(
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)
  // Info With Filter Exit Vehicles

  // Info With Filter Exit Trailers
  const filterExitTrailerType = trailerType !== '' ? data.filter(trailer => trailer?.exitUnit.Trailer.find(t => t?.TrailerType?.name === trailerType)).filter(Boolean) : data
  const filterExitTrailerNumber = trailerNumber !== '' ? filterExitTrailerType.filter(trailer => trailer?.exitUnit?.Trailer.find(t => t?.number === trailerNumber)).filter(Boolean) : filterExitTrailerType
  const filterExitTrailerCompany = trailerCompany !== '' ? filterExitTrailerNumber.filter(trailer => trailer?.exitUnit?.Trailer.find(t => t?.company === trailerCompany)).filter(Boolean) : filterExitTrailerNumber
  const filterExitTrailerSeal = trailerSeal !== '' ? filterExitTrailerCompany.filter(trailer => trailer?.exitUnit?.Trailer.find(t => t?.seal === trailerSeal)).filter(Boolean) : filterExitTrailerCompany
  const filterExitTrailerPlates = trailerPlates !== '' ? filterExitTrailerSeal.filter(trailer => trailer?.exitUnit?.Trailer.find(t => t?.plate === trailerPlates)).filter(Boolean) : filterExitTrailerSeal
  const filterExitTrailerVin = trailerVin !== '' ? filterExitTrailerPlates.filter(trailer => trailer?.exitUnit?.Trailer.find(t => t?.vin === trailerVin)).filter(Boolean) : filterExitTrailerPlates

  return filterExitTrailerVin
} // modificcado

export function entranceAndExitVehicle(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string) {
  console.log('Buscando solo vehiculos de entrada y salida')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
  )
  // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(filterVehicleVin, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)
  return filterExitVehicleVin
} // modificado

export function entranceAndExitTrailer(
  data: Array<EntranceUnits>,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('Buscando solo trailers de entrada y salida')
  console.log(
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)
  // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterTrailerVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
} // modificado

export function entranceVehicleAndEntranceTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando solo entradas')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)
  // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(filterVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterTrailerVin
} // modificado

export function exitVehicleAndExitTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando solo salidas')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)
  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterExitVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
}// modificado

export function entranceVehicleAndExitTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando vehiculos de entrada y trailers de salida')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
} // modificado

export function exitVehicleAndEntranceTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando vehiculos de salida y trailers de entrada')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(filterExitVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterTrailerVin
} // modificado

export function entranceAndExitVehicleAndEntranceTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando vehiculos de entrada y salida y trailers de entrada')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(filterVehicleVin, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(filterExitVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterTrailerVin
} // modificado

export function entranceAndExitVehicleAndExitTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando vehiculos de entrada y salida y trailers de entrada')

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(filterVehicleVin, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterExitVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
} // modificado

export function entranceVehicleAndEntranceAndExitTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando vehiculos de entrada y trailers de entrada y salida')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(filterVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterTrailerVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
} // modificado

export function exitVehicleAndEntranceAndExitTrailers(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando vehiculos de salida y trailers de entrada y salida')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(filterExitVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterTrailerVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
} // modificado

export function entranceAndExitVehicleAndEntranceAndExitTrailer(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('Buscando vehiculos y trailers de entrada y salida')
  console.log(vehicleType,
    vehicleUnitNumber,
    vehicleCompany,
    vehiclePlates,
    vehicleVin,
    trailerType,
    trailerNumber,
    trailerCompany,
    trailerSeal,
    trailerPlates,
    trailerVin)
  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(filterVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(filterTrailerVin, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterExitVehicleVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
} // modificado

// Or
export function entranceOrExitVehicle(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
) {
  console.log('Buscando vehiculos de entrada o salida')

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  const entranceOrExitVehicles = [
    ...filterVehicleVin,
    ...filterExitVehicleVin,
  ]

  const uniqueVehicles = entranceOrExitVehicles.reduce((unique, vehicle) => {
    const foundVehicle = unique.find(v => v.entranceUnit.id === vehicle.entranceUnit.id)
    if (!foundVehicle)
      unique.push(vehicle)

    return unique
  }, [])
  console.log('uniqueVehicles:', uniqueVehicles)
  return uniqueVehicles
} // modificado (observar funcionamiento)

export function entranceOrExitTrailer(
  data: Array<EntranceUnits>,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('Buscando trailers de entrada o salida')

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  const entranceOrExitTrailers = [
    ...filterTrailerVin,
    ...filterExitTrailerVin,
  ]

  const uniqueTrailers = entranceOrExitTrailers.reduce((unique, trailer) => {
    const foundTrailer = unique.find(t => t.entranceUnit.id === trailer.entranceUnit.id)
    if (!foundTrailer)
      unique.push(trailer)

    return unique
  }, [])
  console.log('uniqueTrailers:', uniqueTrailers)
  return uniqueTrailers
} // modificado (observar funcionamiento)

export function entranceOrExitVehicleAndEntranceTrailer(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string) {
  console.log('Buscando vehiculos de entrada o salida y trailers de entrada')

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  const entranceOrExitVehicles = [
    ...filterVehicleVin,
    ...filterExitVehicleVin,
  ]

  const uniqueVehicles = entranceOrExitVehicles.reduce((unique, vehicle) => {
    const foundVehicle = unique.find(v => v.entranceUnit.id === vehicle.entranceUnit.id)
    if (!foundVehicle)
      unique.push(vehicle)

    return unique
  }, [])

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(uniqueVehicles, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterTrailerVin
}// modificado (observar funcionamiento)

export function entranceOrExitVehiclerAndExitTrailer(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string) {
  console.log('Buscando entradas o salidas de vehiculos y salidas de trailers')

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  const entranceOrExitVehicles = [
    ...filterVehicleVin,
    ...filterExitVehicleVin,
  ]

  const uniqueVehicles = entranceOrExitVehicles.reduce((unique, vehicle) => {
    const foundVehicle = unique.find(v => v.entranceUnit.is === vehicle.entranceUnit.id)
    if (!foundVehicle)
      unique.push(vehicle)

    return unique
  }, [])

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(uniqueVehicles, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
} // modificado (observar funcionamiento)

export function entranceOrExitVehicleAndEntranceAndExitTrailer(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('Buscando entradas o salidas de vehiculos y entradas y salidas de trailers')
  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  const entranceOrExitVehicles = [
    ...filterVehicleVin,
    ...filterExitVehicleVin,
  ]

  const uniqueVehicles = entranceOrExitVehicles.reduce((unique, vehicle) => {
    const foundVehicle = unique.find(v => v.entranceUnit.id === vehicle.entranceUnit.id)
    if (!foundVehicle)
      unique.push(vehicle)

    return unique
  }, [])

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(uniqueVehicles, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(filterTrailerVin, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  return filterExitTrailerVin
}// modificado (observar comportamiento)

export function entranceOrExitVehicleAndEntranceOrExitTrailer(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('buscando vehiculos de entrada o salida y traileres de entrada o salida')
  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(data, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  const entranceOrExitVehicles = [
    ...filterVehicleVin,
    ...filterExitVehicleVin,
  ]

  const uniqueVehicles = entranceOrExitVehicles.reduce((unique, vehicle) => {
    const foundVehicle = unique.find(v => v.entranceUnit.id === vehicle.entranceUnit.id)
    if (!foundVehicle)
      unique.push(vehicle)

    return unique
  }, [])

  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(uniqueVehicles, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(uniqueVehicles, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  const entranceOrExitTrailers = [
    ...filterTrailerVin,
    ...filterExitTrailerVin,
  ]

  const uniqueTrailers = entranceOrExitTrailers.reduce((unique, trailer) => {
    const foundTrailer = unique.find(t => t.entranceUnit.id === trailer.entranceUnit.id)
    if (!foundTrailer)
      unique.push(trailer)

    return unique
  }, [])

  return uniqueTrailers
} // modificado (observar funcionamiento)

export function entranceOrExitTrailerAndEntranceVehicle(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('Buscando entradas o salidas de trailers y entradas de vehiculos')
  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  const entranceOrExitTrailers = [
    ...filterTrailerVin,
    ...filterExitTrailerVin,
  ]

  const uniqueTrailers = entranceOrExitTrailers.reduce((unique, trailer) => {
    const foundTrailer = unique.find(t => t.entranceUnit.id === trailer.entranceUnit.id)
    if (!foundTrailer)
      unique.push(trailer)

    return unique
  }, [])
  console.log('uniqueTrailers:', uniqueTrailers)

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(uniqueTrailers, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  return filterVehicleVin
} // modificado (observar funcionamiento)

export function entranceOrExitTrailerAndExitVehicle(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('Buscando entradas o salidas de trailers y salidas de vehiculos')
  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  const entranceOrExitTrailers = [
    ...filterTrailerVin,
    ...filterExitTrailerVin,
  ]

  const uniqueTrailers = entranceOrExitTrailers.reduce((unique, trailer) => {
    const foundTrailer = unique.find(t => t.entranceUnit.id === trailer.entranceUnit.id)
    if (!foundTrailer)
      unique.push(trailer)

    return unique
  }, [])

  // // Info With Filter Vehicles
  const filterExitVehicleVin = exitVehicle(uniqueTrailers, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)
  return filterExitVehicleVin
} // modificado (observar funcionamiento)

export function entranceOrExitTrailerAndEntranceAndExitVehicle(
  data: Array<EntranceUnits>,
  vehicleType: string,
  vehicleUnitNumber: string,
  vehicleCompany: string,
  vehiclePlates: string,
  vehicleVin: string,
  trailerType: string,
  trailerNumber: string,
  trailerCompany: string,
  trailerSeal: string,
  trailerPlates: string,
  trailerVin: string,
) {
  console.log('Buscando entradas o salidas de trailers y entradas y salidas de vehiculos')
  // // Info With Filter Trailers
  const filterTrailerVin = entranceTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  // // Info With Filter Exit Trailers
  const filterExitTrailerVin = exitTrailers(data, trailerType, trailerNumber, trailerCompany, trailerSeal, trailerPlates, trailerVin)

  const entranceOrExitTrailers = [
    ...filterTrailerVin,
    ...filterExitTrailerVin,
  ]

  const uniqueTrailers = entranceOrExitTrailers.reduce((unique, trailer) => {
    const foundTrailer = unique.find(t => t.entranceUnit.id === trailer.entranceUnit.id)
    if (!foundTrailer)
      unique.push(trailer)

    return unique
  }, [])

  // // Info With Filter Vehicles
  const filterVehicleVin = entranceVehicle(uniqueTrailers, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  // // Info With Filter Exit Vehicles
  const filterExitVehicleVin = exitVehicle(filterVehicleVin, vehicleType, vehicleUnitNumber, vehicleCompany, vehiclePlates, vehicleVin)

  return filterExitVehicleVin
}// modificado (observar comportamiento)
