import { Loader } from '@mantine/core'
import { Item } from '../item/Item'
import { vehicleTypeStore } from '../../../../../../zustand/VehicleTypeStore'

export function ListComponent() {
  const { vehicleTypes } = vehicleTypeStore()

  if (!Array.isArray(vehicleTypes))
    return <div><Loader /></div>

  return (
    <div>
      {vehicleTypes.map(item => (
        <Item data={item} type="vehicle" key={item.id} />
      ))}
    </div>
  )
}

export default Item
