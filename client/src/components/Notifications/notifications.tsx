import { showNotification } from '@mantine/notifications'
import iconReport from '@iconify-icons/ph/clipboard-text'
import iconTrash from '@iconify-icons/ph/trash'
import { Icon } from '@iconify/react'
import iconCheck from '@iconify-icons/ph/check'
import iconError from '@iconify-icons/ph/x-bold'
import iconWarning from '@iconify-icons/ph/seal-warning'

export function successDriver() {
  showNotification({
    title: 'Conductor Creado correctamente!',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}
export function notSuccessDriver() {
  showNotification({
    title: 'Conductor no ha podido ser creado!',
    icon: <Icon icon={iconReport} />,
    color: 'teal',
    message: 'Revisar datos necesarios',
  })
}

export function successNotification() {
  showNotification({
    title: 'Guardado Correctamente!',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function errorNotification() {
  showNotification({
    title: 'Error al guardar',
    icon: <Icon icon={iconError} />,
    color: 'red',
    message: undefined,
  })
}

export function noUserFound() {
  showNotification({
    title: 'Usuario no encontrado',
    icon: <Icon icon={iconError} />,
    color: 'red',
    message: undefined,
  })
}

export function userFound(element?: string) {
  showNotification({
    title: `Bienvenido ${element}`,
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function existingElement() {
  showNotification({
    title: 'Ya existe un elemento con este nombre',
    icon: <Icon icon={iconWarning} />,
    color: 'yellow',
    message: undefined,
  })
}

export function noMatches() {
  showNotification({
    title: 'No Hay Registros Para Tu Busqueda',
    icon: <Icon icon={iconWarning} />,
    color: 'yellow',
    message: undefined,
  })
}

export function filterApplied() {
  showNotification({
    title: 'Filtros Aplicados!',
    icon: <Icon icon={iconCheck} />,
    color: 'green',
    message: undefined,
  })
}

export function noValidValues() {
  showNotification({
    title: 'Debes especificar si deseas buscar en entradas o salidas',
    icon: <Icon icon={iconError} />,
    color: 'red',
    message: 'Si no seleccionas se busca en trailers o vehiculos de entrada o salida por defecto',
  })
}

export function successUpdateQuestion() {
  showNotification({
    title: 'Pregunta actualizada correctamente',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function successDeleteQuestion() {
  showNotification({
    title: 'Pregunta eliminada correctamente',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function itemSuccessfullyRemoved(element?: string) {
  showNotification({
    title: `${element} Eliminado con Exito`,
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function itemNotDeletedSuccessfully(element?: string) {
  showNotification({
    title: `${element} Eliminado con Exito`,
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function addCompanySuccess() {
  showNotification({
    title: 'Compañia creada con exito',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function updateCompanySuccess() {
  showNotification({
    title: 'Compañia actualizada correctamente',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function deleteCompanySuccess() {
  showNotification({
    title: 'Compañia eliminada correctamente',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function addLocationSuccess() {
  showNotification({
    title: 'Compañia creada con exito',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}
export function updateLocationSuccess() {
  showNotification({
    title: 'Localizacion actualizada correctamente',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}
export function deleteLocationSuccess() {
  showNotification({
    title: 'Location eliminada correctamente',
    icon: <Icon icon={iconCheck} />,
    color: 'teal',
    message: undefined,
  })
}

export function errorGettingData(data: string) {
  showNotification({
    title: `Error Obteniendo ${data}`,
    icon: <Icon icon={iconError} />,
    color: 'red',
    message: undefined,
  })
}
