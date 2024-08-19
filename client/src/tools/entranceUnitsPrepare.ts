import type { IArrImages, IChecklist, IDriver, IEntranceUnits, IResponse, ITrailer, IVehicle } from '../interfaces'

export const orderData = async(entrance: IEntranceUnits, isEntrance: boolean): Promise<{ entranceData: IEntranceUnits, imagesData: Array<IArrImages> }> => {
  const images: Array<IArrImages> = []
  console.log('1.90EntranceUnits:', entrance)
  const newEntrance: IEntranceUnits = {
    organizationId: '',
    locationId: '',
    Trailer: [],
  }

  if (entrance.Trailer && entrance.Trailer.length > 0) {
    newEntrance.Trailer = entrance.Trailer.map((trailer) => {
      const newTrailer: ITrailer = {
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

  if (entrance.Driver && entrance.Driver.id) {
    const driverEntrance: IDriver = {
      Company: {
        name: entrance.Driver.Company?.name || '',
      },
      companyId: '',
      Person: {
        isInside: entrance.Driver.Person?.isInside || isEntrance,
        name: entrance.Driver.Person?.name || '',
        organizationId: '',
        curp: entrance.Driver.Person?.curp || undefined,
        email: entrance.Driver.Person?.email || undefined,
        identification_url: '',
        identificationFiles: entrance.Driver.Person?.identificationFiles,
        lastname: entrance.Driver.Person?.lastname,
        license: entrance.Driver.Person?.license,
        numberphone: entrance.Driver.Person?.numberphone,
        picture_url: '',
        security_social_number: entrance.Driver.Person?.security_social_number,
      },
      organizationId: '',
      identification: '',
    }
    console.log('1.90DriverEntrance:', driverEntrance)
    newEntrance.Driver = driverEntrance
    entrance.Driver.Person?.File?.forEach((file) => {
      const newFile: IArrImages = {
        base64: file.base64,
        name: file.name,
      }

      images.push(newFile)
    })
  }

  if (entrance.Vehicle && entrance.Vehicle.id) {
    const newVehicle: IVehicle = {
      companyId: entrance.Vehicle.companyId,
      isInside: entrance.Vehicle.isInside,
      organizationId: '',
      plate: entrance.Vehicle.plate,
      unitNumber: entrance.Vehicle.unitNumber,
      vehicleTypeId: entrance.Vehicle.vehicleTypeId,
      Checklist: entrance.Vehicle.Checklist?.map((cheklist) => {
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
        name: entrance.Vehicle.Company?.name || '',
      },
      Location: entrance.Vehicle.Location,
      locationId: entrance.Vehicle.locationId,
      seal: entrance.Vehicle.seal,
      VehicleType: entrance.Vehicle.VehicleType,
      vin: entrance.Vehicle.vin,
    }

    newEntrance.Vehicle = newVehicle
  }

  if (entrance.locationId)
    newEntrance.locationId = entrance.locationId

  return {
    entranceData: newEntrance,
    imagesData: images,
  }
}
