// Modificada
export interface IVisitorType {
  id?: string
  created_at?: Date
  updated_at?: Date
  name: string
  description?: string
  organizationId: string
  Visitor?: Array<IVisitor>
  Organization?: IOrganization
  status: boolean
}

export interface IPerson {
  id?: string
  created_at?: Date
  updated_at?: Date
  name: string
  lastname?: string
  curp?: string
  security_social_number?: string
  numberphone?: string
  email?: string
  identification_url?: string
  picture_url?: string
  isInside: boolean
  organizationId: string
  license?: string
  Organization?: IOrganization
  Driver?: IDriver
  Visitor?: IVisitor
  File?: Array<IFile>
  identificationFiles?: string
}

export interface IOrganization {
  id?: string
  created_at?: Date
  update_at?: Date
  name: string
  Checklist?: Array<IChecklist>
  Companies?: Array<ICompanies>
  Driver?: Array<IDriver>
  EntranceUnits?: Array<IEntranceUnits>
  ExitUnits?: Array<IExitUnits>
  File?: Array<IFile>
  Incident?: Array<IIncident>
  Locations?: Array<ILocation>
  QrVisitor?: Array<IQrVisitor>
  Question?: Array<IQuestion>
  Response?: Array<IResponse>
  Trailer?: Array<ITrailer>
  TrailerType?: Array<ITrailerType>
  User?: Array<IUser>
  Vehicle?: Array<IVehicle>
  VehicleType?: Array<IVehicleType>
  VehicleVisitor?: Array<IVehicleVisitor>
  Visitor?: Array<IVisitor>
  VisitorEntrance?: Array<IVisitorEntrance>
  VisitorExit?: Array<IVisitorExit>
  VisitorType?: Array<IVisitorType>
  Person?: Array<IPerson>
  Company?: Array<ICompany>
}

export interface ICompanies {
  id?: string
  name: string
  location: string
  dateTime?: Date
  dateTime_updated_at?: Date
  status: boolean
  organizationId: string
  Organization?: IOrganization
}

export interface IEntranceUnits {
  id?: string
  driverId?: string
  vehicleId?: string
  dateTime_updated_at?: Date
  dateTime?: Date
  organizationId: string
  Checklist?: Array<IChecklist>
  Driver?: IDriver
  Organization?: IOrganization
  Vehicle?: IVehicle
  ExitUnits?: Array<IExitUnits>
  Trailer?: Array<ITrailer>
  locationId: string
  Location?: ILocation
  TrailerLoad?: Array<ITrailerLoad>
  Visitor?: IVisitor
  visitorId?: string
}

export interface ITrailerType {
  id?: string
  created_at?: Date
  updated_at?: Date
  name: string
  status: boolean
  organizationId: string
  Trailer?: Array<ITrailer>
  Organization?: IOrganization
  Question?: Array<IQuestion>
}

export interface IRole {
  id?: string
  created_at?: Date
  update_at?: Date
  name: string
  User?: Array<IUser>
}

// No en server
// export interface EnterEntity {
//   id: string
//   date: string
//   driver: DriverEntity
//   visitors: Array<VisitorsEntity>
//   vehicle: VehicleEntity
//   tow: Array<TowEntity>
// }

// No en Server
// export interface DriverEntity {
//   id: string
//   name: string
//   license: string
//   curp: string
//   company: string
// }

// No en Server
// export interface TrailerEntity {
//   id?: string
//   number: string
//   seal?: string
//   plate?: string
//   vin?: string
//   trailerTypeId?: string
//   TrailerType?: VehicleEntity
// }

// No en Server
// export interface DriverFormValues {
//   name: string
//   license: string
//   curp: string
//   driver: string
// }

// No en Server
// export interface VisitorsEntity {
//   id: string
//   typeOfVisit: string
//   name: string
//   identification_url: string
//   picture_url: string
//   subject: string
//   company: string
//   badge: string
//   curp: string
//   social_security_number: string
// }

// No en Server
// export interface VisitorFormValues {
//   name: string
//   curp: string
//   visitor: string
// }

// No en Server
// export interface VehicleEntity {
//   id: string
//   plate: string
//   vehicleTypeId: string
//   unitNumber?: string
//   vin?: string
//   company: string
//   vehicleType?: VehicleTypeEntity

// }

export interface VehicleTypeEntity {
  id: string
  name: string
  Questions: Array<IQuestion> | []
}

// No en Server
// export interface VehicleFormValues {
//   vehicleType: IVehicleTypes
//   plates: string
//   vehicle: string
//   brand: string // Agrega esta línea
//   model: string // Agrega esta línea
// }

// No en server
// export interface VehicleVisitorEntity {
//   id: string
//   plates: string
//   brand: string
//   model: string
//   color: string
//   vehicle?: string
// }

// No en server
// export interface TowEntity {
//   id: string
//   plates: string
//   typeOfTow: TowTypeEntity
//   typeOfLoad: string
//   vin: string
//   company: string
//   entrance: string
//   checklist: Array<QuestionsEntity> | []
// }

export interface TowTypeEntity {
  id: string
  name: string
  Question: Array<QuestionsEntity> | []
}

// No en server
// export interface TowFormValues {
//   typeOfTow: string
//   plates: string
//   tow: string
// }

// No en server
export interface QuestionsEntity {
  id?: string
  name: string
  type?: string | null
}

export interface IncidentReport {
  id: string
  subject: string
  location: string
  report: string
  date: string
  Driver?: Array<IDriver>
  Visitor?: Array<IVisitor>
  Vehicle?: Array<IVehicle>
  Trailer?: Array<ITrailer>
}

// No en server
// export interface SearchRecords {
//   id: string
//   driver: DriverEntity | {}
//   visitors: Array<VisitorsEntity> | []
//   vehicle: VehicleEntity | {}
//   tow: Array<TowEntity> | []
// }

// No en server
// export interface DriverTable {
//   name: string
// }

// No en server
// export interface VisitorTable {
//   name: string
// }

// No en server
// export interface VehicleTable {
//   plates: string
//   vehicleType: string
// }

// No en server
// export interface TowTable {
//   plates: string
//   typeOfTow: string
// }

// No en server
// export interface UserEntity {
//   id: string
//   name: string | null
//   lastname: string | null
//   username: string
//   email: string | null
//   numberphone: string | null
//   roleId: string | null
//   password: string | null
// }

// export interface ColumnsForUnitRecordTable {
//   id: string | null
//   editButton?: any
//   driver: DriverEntity
//   Visitor: Array<VisitorsEntity>
//   enterDate: string | null
//   exitDate: string | null
//   vehicle: VehicleEntity
//   Trailer: Array<TowEntity>
//   exitVehicle: VehicleEntity
//   tow: string | null
//   dateTime: string
//   deleteButton?: any
//   viewTrailersButton?: any
//   viewVisitorsButton?: any
// // }

// No en server
// export interface ColumnsForUnitRecordTable {
//   entranceId: string
//   entranceDriver: IDriver | {}
//   entranceTrailer: Array<ITrailer> | []
//   entranceVehicle: IVehicle | {}
//   entranceDate: string

//   exitData: [
//     {
//       exitId: string
//       exitDriver: IDriver | {}
//       exitTrailer: Array<ITrailer> | []
//       exitVehicle: IVehicle | {}
//       exitDate: string
//     },
//   ]

//   editButton?: any
//   createPDFButton?: any
//   viewTrailersButton?: any
// }

// No en server
// export interface ColumnsForIncidentsTable {
//   // Information Columns
//   id: string
//   location: string
//   report: string
//   subject: string
//   Driver: Array<IDriver>
//   Visitor: Array<IVisitor>
//   Trailer: Array<ITrailer>
//   Vehicle: Array<IVehicle>

//   // Table Buttons
//   editButton?: any
// }

// nuyevas interfaces
// ya estaba bien
export interface IIdArray {
  id: string
}
// actualizada
export interface IDriver {
  identification: any
  id?: string
  created_at?: Date
  updated_at?: Date
  companyId?: string
  personId?: string
  Person?: IPerson
  organizationId: string
  Organization?: IOrganization
  EntranceUnits?: Array<IEntranceUnits>
  ExitUnits?: Array<IExitUnits>
  Files?: Array<IFile>
  Incident?: Array<IIncident>
  Company?: ICompany
}
// actualizada
export interface IQuestion {
  id: string
  created_at?: Date
  updated_at?: Date
  name: string
  type: string
  status: boolean
  organizationId: string
  Organization?: IOrganization
  Response?: Array<IResponse>
  TrailerType?: Array<ITrailerType>
  VehicleType?: Array<IVehicleType>
}
// actualizada
export interface IVehicleType {
  id?: string
  name: string
  created_at?: Date
  updated_at?: Date
  status: boolean
  organizationId: string
  Vehicle?: Array<IVehicle>
  Organization?: IOrganization
  Question?: Array<IQuestion>
}

// ya estaba bien
export interface IUpdateQuestions {
  id: string
  questions: {
    connect: Array<{ id: string }>
    disconnect: Array<{ id: string }>
  }
}

// actualizada
export interface IUser {
  id?: string
  created_at?: Date
  updated_at?: Date
  username: string
  password: string
  name: string
  email: string
  roleId: string
  numberphone?: string
  lastname: string
  pictureId?: string
  organizationId?: string
  picture?: IFile // Picture -> picture
  Organization?: IOrganization
  Role?: IRole
  status?: boolean
  token?: string
}

export interface IVehicle {
  id?: string
  created_at?: Date
  updated_at?: Date
  plate: string
  companyId: string
  unitNumber: string
  vehicleTypeId: string
  vin?: string
  seal?: string
  isInside: boolean
  organizationId: string
  Checklist?: Array<IChecklist>
  EntranceUnits?: Array<IEntranceUnits>
  ExitUnits?: Array<IExitUnits>
  Organization?: IOrganization
  VehicleType?: IVehicleType
  Incident?: Array<IIncident>
  Company?: ICompany
  frontendChecklistSave?: IChecklist
  locationId?: string
  Location?: ILocation
}

// agregar el tipo de dato etrada
// Actualizada
export interface IVisitor {
  id?: string
  created_at?: Date
  updated_at?: Date
  subject: string
  badge?: string
  companyId?: string
  visitorTypeId: string
  organizationId: string
  personId: string
  Person?: IPerson
  isExit?: boolean
  Organization?: IOrganization
  VisitorType?: IVisitorType
  File?: Array<IFile>
  Incident?: Array<IIncident>
  QrVisitor?: Array<IQrVisitor>
  VisitorEntrances?: Array<IVisitorEntrance>
  VisitorExit?: Array<IVisitorExit>
  Company?: ICompany
  curp?: string
}

// Actualizada
export interface ITrailer {
  id?: string
  created_at?: Date
  updated_at?: Date
  number?: string
  seal?: string
  plate?: string
  vin?: string
  trailerTypeId: string
  companyId: string
  isInside: boolean
  organizationId: string
  Checklist?: Array<IChecklist>
  Organization?: IOrganization
  TrailerType?: ITrailerType
  EntranceUnits?: Array<IEntranceUnits>
  ExitUnits?: Array<IExitUnits>
  Incident?: Array<IIncident>
  Company?: ICompany
  frontendChecklistSave?: IChecklist
  TrailerLoad?: Array<ITrailerLoad>
  locationId?: string
  Location?: ILocation
  tempResponse?: Array<IResponse>
}

export interface ITrailerLoad {
  id?: string
  trailerId?: string
  Trialer?: ITrailer
  entranceId?: string
  cargo?: string
  EntranceUnit?: IEntranceUnits
}

// No esta en server
export interface IEntrance {
  id?: string
  driverId?: string
  vehicleId?: string
  dateTime?: Date
  dateTime_updated_at?: Date
  Trailer: Array<ITrailer>
  Driver?: IDriver
  Vehicle?: IVehicle
  ExitUnits?: IExitUnits
}

// Actualizada
export interface IIncident {
  id?: string
  datetime?: Date
  datetime_update_at?: Date
  locationId: string
  report: string
  subject: string
  organizationId: string
  Organization?: IOrganization
  Driver?: Array<IDriver>
  Trailer?: Array<ITrailer>
  Vehicle?: Array<IVehicle>
  Visitor?: Array<IVisitor>
  VehicleVisitor?: Array<IVehicleVisitor>
  Location?: ILocation
  Files?: Array<IFile>
}

// Actualizada antes tenia array de trailers
export interface IExitUnits {
  id?: string
  dateTime?: Date
  dateTime_updated_at?: Date
  driverId?: string
  vehicleId?: string
  entranceUnitId: string
  organizationId: string
  Checklist?: Array<IChecklist>
  Driver?: IDriver
  EntranceUnits?: IEntranceUnits
  Organization?: IOrganization
  Vehicle?: IVehicle
  Trailer?: Array<ITrailer>
  locationId: string
  Location?: ILocation
  Visitor?: IVisitor
  visitorId?: string
}

// Actualizada
export interface IVehicleVisitor {
  id: string
  created_at?: Date
  updated_at?: Date
  plates: string
  brand: string
  model: string
  color: string
  isInside: boolean
  organizationId: string
  QrVisitor?: Array<IQrVisitor>
  Organization?: IOrganization
  VisitorEntrance?: Array<IVisitorEntrance>
  VisitorExit?: Array<IVisitorExit>
}

// Actualizada
export interface IVisitorEntrance {
  id?: string
  dateTime_updated_at?: Date
  dateTime?: Date
  vehicleVisitorId?: string
  organizationId: string
  Organization?: IOrganization
  VehicleVisitor?: IVehicleVisitor
  VisitorExit?: Array<IVisitorExit>
  Visitors: Array<IVisitor>
  locationId: string
  Location?: ILocation
  VisitorId?: string
  VehicleVisitorArray: Array<IVisitor>
}

// Actualizada
export interface IVisitorExit {
  id?: string
  dateTime_updated_at?: Date
  dateTime?: Date
  idEntrance?: string
  idVehicleVisitor?: string
  organizationId: string
  VisitorEntrance?: IVisitorEntrance
  VehicleVisitor?: IVehicleVisitor
  Organization?: IOrganization
  Visitors: Array<IVisitor>
  locationId: string
  Location?: ILocation
  VehicleVisitorArray: Array<IVisitor>
}

// No esta en server
export interface IReport {
  entranceUnit: IEntrance
  exitUnit: IExitUnits
}

// No esta en server
export interface IArrImages {
  id?: number
  base64: any
  name: string
}

// Actualizada antes tenia array d visitors
export interface IFile {
  base64?: any // esta propiedad es exclusiva del frontend
  id?: string
  dateTime?: Date
  dateTime_updated_at?: Date
  name: string
  size: number
  type: string
  url: string
  checklistId?: string
  driverId?: string
  responseId?: string
  organizationId: string
  Checklist?: IChecklist
  Driver?: IDriver
  Organization?: IOrganization
  Response?: IResponse
  User?: IUser
  Visitors?: IVisitor
  Person?: IPerson
  personId?: string
  Company?: ICompany
  companyId?: string
  incidentId?: string
  Incident?: IIncident
}
/// ////////////Interfaces creadas para no afectar lo ya creado/////////////////////////////

// Actualizada
export interface IQrVisitor {
  id?: string
  dateTime?: Date
  dateTime_updated_at?: Date
  start?: string
  end?: string
  numVisitors: number
  vehicleId?: string
  email: string
  subject: string
  companyId?: string
  badge?: string
  organizationId: string
  Organization?: IOrganization
  VehicleVisitor?: IVehicleVisitor
  Visitors?: IVisitor
  Company?: ICompany
}

// No esta en server
export interface EntranceUnits {

  entranceUnit:
  {
    id: string
    dateTime: Date
    dateTime_updated_at: Date
    driverId: string
    vehicleId: string
    Driver: Driver // Las bd regresa las incidencias en este driver
    Trailer: Array<ITrailer>
    Vehicle: IVehicle
    ExitUnits: [
      {
        id: string
        driverId: string
        vehicleId: string
        entranceUnitId: string
        Driver: Driver // La bd no regresa las incidencias en este driver
        Vehicle: IVehicle
        Trailer: Array<ITrailer>
        dateTime: Date
        dateTime_updated_at: Date
      },
    ]
  }

  exitUnit: {
    id: string
    entranceUnitId: string
    dateTime: Date
    dateTime_updated_at: Date
    driverId: string
    vehicleId: string
    Driver: Driver // Las bd regresa las incidencias en este driver
    Trailer: Array<ITrailer>
    Vehicle: IVehicle
  }
}

// No esta en server
export interface VisitantsTable { // Observar si esta estructura funciona para VisitorEntrance
  id: string
  dateTime_updated_at: string
  dateTime: string
  vehicleVisitorId: string
  isEnter?: string
  VehicleVisitor: IVehicleVisitor
  Visitors: Array<IVisitor>
  VisitorExit: [
    {
      id: string
      dateTime_updated_at: string
      dateTime: string
      vehicleVisitorId: string
      VehicleVisitor: IVehicleVisitor
      Visitors: Array<IVisitor>
    },
  ]

}

// Actualizada
export interface Incident {
  id?: string
  datetime?: Date
  datetime_update_at?: Date
  locationId: string
  report: string
  subject: string
  organizationId: string
  Organization?: IOrganization
  Driver?: Array<IDriver>
  Trailer?: Array<ITrailer>
  Vehicle?: Array<IVehicle>
  Visitor?: Array<IVisitor>
  Location?: ILocation
}

// No esta en server
export interface Driver {
  id?: string
  name?: string
  license?: string
  company?: string
  curp?: string
  isInside?: boolean
  Incident?: Array<IIncident>
  Files?: Array<IFile>
  Person: IPerson
  security_social_number?: string
  numberphone?: string
  email?: string
}

export interface ColumnsForEditOrCreateQuestionsTable {
  // Information Columns
  questions: IQuestion

  // Table Buttons
  editButton?: any
  deleteButton?: any
}

// Actualizada
export interface ILocation {
  id?: string
  name: string
  capacity: number
  dateTime?: Date
  dateTime_updated_at?: Date
  status: boolean
  organizationId: string
  Organization?: IOrganization
  Incident?: Array<IIncident>
  EntranceUnits?: Array<IEntranceUnits>
  ExitUnits?: Array<IExitUnits>
  VisitorEntrance?: Array<IVisitorEntrance>
  VisitorExit?: Array<IVisitorExit>
  Trailer?: Array<ITrailer>
}

// Actualizada
export interface ICompany {
  id?: string
  created_at?: Date
  updated_at?: Date
  name: string
  address?: string
  numberphone?: string
  email?: string
  organizationId?: string
  Organization?: IOrganization
  File?: Array<IFile>
  QrVisitor?: Array<IQrVisitor>
  Visitor?: Array<IVisitor>
  Vehicle?: Array<IVehicle>
  Trailer?: Array<ITrailer>
  Driver?: Array<IDriver>
}

export interface ILogin {
  email: string
  password: string
}

// No esta en server
export interface SelectItem {
  value: string
  label: string
}

// Actualizada
export interface IChecklist {
  id?: string
  datetime?: Date
  dtetime_update_at?: Date
  entraceUnitId?: string
  exitUnitId?: string
  vehicleId?: string
  trailerId?: string
  isSigned: boolean
  identification: string
  organizationId: string
  EntraceUnit?: IEntranceUnits
  ExitUnit?: IExitUnits
  Organization?: IOrganization
  Trailer?: ITrailer
  Vehicle?: IVehicle
  File?: Array<IFile>
  Responses?: Array<IResponse>
}
export interface IResponse {
  id?: string
  datetime?: Date
  dtetime_update_at?: Date
  checklistId?: string
  questionId?: string
  response: string
  unitId?: string
  identification: string
  organizationId: string
  File?: Array<IFile>
  Checklist?: IChecklist
  Organization?: IOrganization
  Question?: IQuestion
}
export interface ITotalData {
  id?: string
  driver?: IDriver
  entranceVehicle?: IVehicle
  entranceTrailer?: Array<ITrailer>
  exitVehicle?: IVehicle
  exitTrailer?: Array<ITrailer>
}
