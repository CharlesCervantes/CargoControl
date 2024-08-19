import { Loader } from '@mantine/core'
import { trailerTypeStore } from '../../../../../../zustand/TrailerTypeStore'
import { Item } from '../item/Item'

export function TrailerTypeList() {
  // Zustand state
  const { trailerTypes } = trailerTypeStore()

  if (!Array.isArray(trailerTypes))
    return <div><Loader /></div>

  return (
    <div>
      {trailerTypes.map(item => (
        <Item data={item} type="trailer" key={item.id} />
      ))}
    </div>
  )
}

export default TrailerTypeList
