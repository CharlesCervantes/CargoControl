import { updateStatus } from '../../../modules/Visitor'
import { updateStatus as updateStatusPerson } from '../../../modules/Person'
import type { Visitor } from '@prisma/client'

export const UpdateVisitorStatusHelper = async(Visitors: Array<Visitor>) => {
  for (const v of Visitors) {
    const update = await updateStatus(v.id, true)
    console.log('Visitante actualizado')
    console.log(update.personId, update.isExit)
    if (v.personId) {
      const updatePerson = await updateStatusPerson(v.personId, false)
      console.log('Persona actualizada')
      console.log(updatePerson)
    }
  }
}
