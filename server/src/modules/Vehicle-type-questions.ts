import { prismaClient } from '../prisma/client'

export interface idArray {
  id: string
}
export interface test {
  id: string
  connect: Array<idArray>
  disconnect: Array<idArray>
}

export async function update(data: test) {
  const result = await prismaClient.vehicleType.update({
    where: { id: data.id },
    data: {
      Question: {
        connect: data.connect,
        disconnect: data.disconnect,
      },
    },
  })
  return result
}
