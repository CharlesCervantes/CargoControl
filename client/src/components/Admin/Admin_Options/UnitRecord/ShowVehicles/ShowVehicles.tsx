import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, Table } from '@mantine/core'
import type { IVehicle } from '../../../../../../../server/src/interfaces'
import type { Vehicle } from '../../../../../interfaces'

export function ShowVehicles(props: { vehicles: Vehicle }) {
  const [opened, { open, close }] = useDisclosure(false)
  // const v = props.vehicles || {}
  console.log('props.vehicles:', props.vehicles)
  const elements = [
    {
      id: props?.vehicles?.id,
      VehicleType: props.vehicles?.VehicleType?.name,
      company: props.vehicles?.Company?.name,
      unitNumber: props.vehicles?.unitNumber,
      plate: props.vehicles?.plate,
      vin: props.vehicles?.vin,
    },
  ]
  console.log('elementsInVehicle:', elements)
  const rows = elements.map(element => (
    <tr key={element?.id}>
      <td>{element?.VehicleType}</td>
      <td>{element?.company}</td>
      <td>{element?.unitNumber}</td>
      <td>{element?.plate}</td>
      <td>{element?.vin}</td>
    </tr>
  ))
  return (
    <>
      <Modal opened={opened} onClose={close} title="Vehicles" centered size="lg">
        {(props.vehicles === null || props.vehicles === undefined)
          ? (
            <p>No Hubo Vehículos En Esta Visita</p>
            )
          : (
            <>
              <p>Vehículo:</p>
              <Table striped>
                <thead>
                  <tr>
                    <th>Tipo de Vehículo</th>
                    <th>Compañía</th>
                    <th>Número de Unidad</th>
                    <th>Placas</th>
                    <th>VIN</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </>
            )
        }
      </Modal>

      <Group position="center">

        <Button color="cyan" disabled={(props.vehicles === undefined || props.vehicles === null)} onClick={open} size="xs">
          {(props.vehicles === undefined || props.vehicles === null) ? 0 : 1}
        </Button>
      </Group>

    </>
  )
}
