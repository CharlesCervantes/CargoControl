import type { IArrImages, IChecklist, IDriver, IExitUnits, IResponse, ITrailer, IVehicle } from '../interfaces'

export const orderData = async(exit: IExitUnits, isExit: boolean): Promise<{ exitData: IExitUnits, imagesData: Array<IArrImages> }> => {
  const images: Array<IArrImages> = []
  console.log('1.90ExitUnits:', exit)
  const newExit: IExitUnits = {
    entranceUnitId: '',
    organizationId: '',
    locationId: '',
    Trailer: [],
  }

  if (exit.Trailer && exit.Trailer.length > 0) {
    newExit.Trailer = exit.Trailer.map((trailer) => {
      const newTrailer: ITrailer = {
        id: trailer.id,
        trailerTypeId: trailer.trailerTypeId,
        Company: trailer.Company,
        isInside: trailer.isInside,
        organizationId: '',
        companyId: '',
        vin: trailer.vin,
        TrailerType: trailer.TrailerType,
        locationId: trailer.locationId,
        Location: trailer.Location,
        number: trailer.number,
        plate: trailer.plate,
        seal: trailer.seal,
        Checklist: trailer.Checklist?.map((checklist) => {
          const newChecklist: IChecklist = {
            identification: checklist.identification,
            isSigned: checklist.isSigned,
            organizationId: '',
            Responses: checklist.Responses?.map((resp) => {
              const newResp: IResponse = {
                identification: resp.identification,
                organizationId: '',
                response: resp.response,
                questionId: resp.questionId,
              }

              resp.File?.forEach((img) => {
                const newRespIMG: IArrImages = {
                  base64: img.base64,
                  name: img.name,
                }

                images.push(newRespIMG)
              })

              return newResp // Añade el valor de retorno aquí
            }),
          }

          checklist.File?.forEach((file) => {
            const newIMG: IArrImages = {
              base64: file.base64,
              name: file.name,
            }

            images.push(newIMG)
          })

          return newChecklist // Añade el valor de retorno aquí
        }),

      }

      return newTrailer
    })
  }

  if (exit.Driver && exit.Driver.id) {
    const driverExit: IDriver = {
      id: exit.driverId,
      Company: {
        name: exit.Driver.Company?.name || '',
      },
      companyId: '',
      Person: {
        isInside: exit.Driver.Person?.isInside || isExit,
        name: exit.Driver.Person?.name || '',
        organizationId: '',
        curp: exit.Driver.Person?.curp || undefined,
        email: exit.Driver.Person?.email || undefined,
        identification_url: '',
        identificationFiles: exit.Driver.Person?.identificationFiles,
        lastname: exit.Driver.Person?.lastname,
        license: exit.Driver.Person?.license,
        numberphone: exit.Driver.Person?.numberphone,
        picture_url: '',
        security_social_number: exit.Driver.Person?.security_social_number,
      },
      organizationId: '',
      identification: '',
    }
    console.log('1.90DriverExit:', driverExit)
    newExit.Driver = driverExit
    exit.Driver.Person?.File?.forEach((file) => {
      const newFile: IArrImages = {
        base64: file.base64,
        name: file.name,
      }

      images.push(newFile)
    })
  }

  if (exit.Vehicle && exit.Vehicle.id) {
    const newVehicle: IVehicle = {
      id: exit.Vehicle.id,
      companyId: exit.Vehicle.companyId,
      isInside: exit.Vehicle.isInside,
      organizationId: '',
      plate: exit.Vehicle.plate,
      unitNumber: exit.Vehicle.unitNumber,
      vehicleTypeId: exit.Vehicle.vehicleTypeId,
      Checklist: exit.Vehicle.Checklist?.map((cheklist) => {
        const newCheklist: IChecklist = {
          identification: cheklist.identification,
          isSigned: cheklist.isSigned,
          organizationId: '',
          Responses: cheklist.Responses?.map((resp) => {
            const newResponse: IResponse = {
              identification: resp.identification,
              organizationId: '',
              response: resp.response,
              questionId: resp.questionId,
            }

            resp.File?.forEach((resp) => {
              const newFile: IArrImages = {
                base64: resp.base64,
                name: resp.name,
              }

              images.push(newFile)
            })

            return newResponse
          }),

        }

        cheklist.File?.forEach((resp) => {
          const newFile: IArrImages = {
            base64: resp.base64,
            name: resp.name,
          }

          images.push(newFile)
        })

        return newCheklist
      }),
      Company: {
        name: exit.Vehicle.Company?.name || '',
      },
      Location: exit.Vehicle.Location,
      locationId: exit.Vehicle.locationId,
      seal: exit.Vehicle.seal,
      VehicleType: exit.Vehicle.VehicleType,
      vin: exit.Vehicle.vin,
    }

    newExit.Vehicle = newVehicle
  }

  if (exit.locationId)
    newExit.locationId = exit.locationId

  return {
    exitData: newExit,
    imagesData: images,
  }
}
