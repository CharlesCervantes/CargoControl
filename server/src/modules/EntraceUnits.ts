/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import type { IEntranceUnits } from '../interfaces'

const prismaClient = new PrismaClient()

export const create = async(data: IEntranceUnits) => {
  // console.log("Entrando a la función create con los siguientes datos:")
  // console.log(data):

  const newEntrance = await prismaClient.entranceUnits.create({
    data: {
      driverId: data.Driver?.id,
      locationId: data.locationId,
      organizationId: data.organizationId,
      Trailer: {
        connect: data.Trailer?.map(trailer => ({ id: trailer.id })),
      },
      vehicleId: data.Vehicle?.id,
    },
  })

  // console.log(' ')
  // console.log('entrada guardada:')
  // console.log(newEntrance)

  // Vehicle Cheklist
  if (data.Vehicle?.Checklist && data.Vehicle.Checklist?.length > 0) {
    for (let i = 0; i < data.Vehicle.Checklist.length; i++) {
      const item = data.Vehicle.Checklist[i]

      const newCheklist = await prismaClient.checklist.create({
        data: {
          isSign: true,
          identification: item.identification,
          organizationId: data.organizationId,
          entraceUnitId: newEntrance.id,
          vehicleId: newEntrance.vehicleId,
        },
      })

      // console.log(' ')
      // console.log('Cheklisd del vehiculo')
      // console.log(newCheklist)

      if (item.Responses && item.Responses.length > 0) {
        for (let j = 0; j < item.Responses.length; j++) {
          const resp = item.Responses[j]

          const newResposne = await prismaClient.response.create({
            data: {
              identification: resp.identification,
              response: resp.response,
              checklistId: newCheklist.id,
              organizationId: data.organizationId,
              questionId: resp.questionId,
            },
          })

          // console.log(' ')
          // console.log('Respeusrta cheklist Vehicle guardada en db')
          // console.log(newResposne)
        }
      }
    }
  }

  if (data.Trailer && data.Trailer.length > 0) {
    for (let i = 0; i < data.Trailer.length; i++) {
      const trailer = data.Trailer[i]

      if (trailer.Checklist && trailer.Checklist.length > 0) {
        for (let j = 0; j < trailer.Checklist.length; j++) {
          const CheklistT = trailer.Checklist[j]

          const newCheklistT = await prismaClient.checklist.create({
            data: {
              isSign: true,
              entraceUnitId: newEntrance.id,
              organizationId: data.organizationId,
              identification: CheklistT.identification,
              trailerId: trailer.id,
            },
          })

          console.log('')
          console.log('Cheklist del trailer: ', trailer.number)
          console.log(newCheklistT)

          if (CheklistT.Responses && CheklistT.Responses.length > 0) {
            for (let k = 0; k < CheklistT.Responses.length; k++) {
              const resp = CheklistT.Responses[k]
              // console.log('')
              // console.log('Revision de Respuestas de trailer')
              // console.log(resp)

              const newResponse = await prismaClient.response.create({
                data: {
                  identification: resp.identification,
                  response: resp.response,
                  checklistId: newCheklistT.id,
                  organizationId: data.organizationId,
                  questionId: resp.questionId,
                },
              })

              console.log('')
              console.log('Respuesta del checklist del trailer guardada en db')
              console.log(newResponse)
            }
          }
        }
      }
    }
  }

  return newEntrance
}

export const list = async() => {
  const result = await prismaClient.entranceUnits.findMany({
    include: {
      Driver: true,
      Trailer: {
        include: { TrailerType: true },
      },
      Vehicle: {
        include: {
          VehicleType: true,
        },
      },

    },
  })
  return result
}

export const getById = async(id: string) => {
  const result = await prismaClient.entranceUnits.findFirst({
    where: {
      id,
    },
    include: {
      Driver: true,
      ExitUnits: true,
      Trailer: true,
      Vehicle: true,
    },
  })

  return result
}

// v2
export const report = async(organizationId: string, pageSize: number, pageIndex: number) => {
  const skipAmout = (pageIndex - 1) * pageSize
  const entranceUnits = await prismaClient.entranceUnits.findMany({
    take: pageSize,
    skip: skipAmout,
    where: {
      organizationId,

    },
    include: {
      Driver: {
        include: {
          Files: true,
          Incident: {
            include: {
              Driver: true,
              Trailer: true,
              Vehicle: true,
              Visitor: true,
            },
          },
          Person: {
            include: {
              File: true,
            },
          },
        },
      },
      Trailer: {
        include: {
          Incident: {
            include: {
              Driver: true,
              Trailer: true,
              Vehicle: true,
              Visitor: true,
            },
          },
          TrailerType: true,
        },
      },
      Vehicle: {
        include: {
          Checklist: {
            include: {
              Responses: {
                include: {
                  File: true,
                  Question: true,
                },
              },
            },
          },
          VehicleType: true,
          Incident: {
            include: {
              Driver: true,
              Trailer: true,
              Vehicle: true,
              Visitor: true,
            },
          },
          Company: true,
        },
      },
      ExitUnits: {
        include: {
          Driver: true,
          Trailer: {
            include: {
              Checklist: {
                include: {
                  File: true,
                },
              },
              Incident: {
                include: {
                  Driver: true,
                  Trailer: true,
                  Vehicle: true,
                  Visitor: true,
                },
              },
              TrailerType: true,
            },
          },
          Vehicle: {
            include: {
              VehicleType: true,
              Incident: {
                include: {
                  Driver: true,
                  Trailer: true,
                  Vehicle: true,
                  Visitor: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const entranceUnitsWithChecklists = await Promise.all(
    entranceUnits.map(async(entranceUnit) => {
      const vehicleChecklist = await prismaClient.checklist.findMany({
        where: { entraceUnitId: entranceUnit.id },
        include: {
          File: true,
          Responses: {
            include: {
              Question: true,
              File: true,
            },
          },
        },
      })

      const trailerChecklist = await prismaClient.checklist.findMany({
        where: { entraceUnitId: entranceUnit.id },
        include: {
          File: true,
          Responses: {
            include: {
              Question: true,
              File: true,
            },
          },
        },
      })

      return {
        ...entranceUnit,
        Vehicle: {
          ...entranceUnit.Vehicle,
          Checklist: vehicleChecklist,
        },
        Trailer: entranceUnit.Trailer.map((trailer, index) => ({
          ...trailer,
          Checklist: trailerChecklist[index],
        })),
      }
    }),
  )

  const result = await Promise.all(
    entranceUnitsWithChecklists.map(async(entranceUnit) => {
      const exitUnit = await prismaClient.exitUnits.findFirst({
        where: { entranceUnitId: entranceUnit.id },
        include: {
          Driver: true,
          Trailer: true,
          Vehicle: true,
        },
      })

      return {
        entranceUnit,
        exitUnit,
      }
    }),
  )

  const count = await prismaClient.entranceUnits.count({
    where: { organizationId },
  })

  return { result, count }
}

export const getLastUnitEntranceByDriverId = async(driverId: string) => {
  const result = await prismaClient.entranceUnits.findFirst({
    where: {
      driverId,
    },
    orderBy: {
      dateTime: 'desc',
    },
  })

  return result
}
