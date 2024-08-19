export interface IIdArray {
  id: string
}
export interface IUpdateQuestions {
  id?: string
  questions: {
    connect: Array<{ id: string }>
    disconnect: Array<{ id: string }>
  }
}

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
  status?: boolean
}

export interface IPerson {
  id?: string
  created_at?: Date | null
  updated_at?: Date | null
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

export interface IDriver {
  id?: string
  created_at?: Date
  updated_at?: Date
  companyId?: string
  personId: string
  Person?: IPerson
  organizationId: string
  Organization?: IOrganization
  EntranceUnits?: Array<IEntranceUnits>
  ExitUnits?: Array<IExitUnits>
  Files?: Array<IFile>
  Incident?: Array<IIncident>
  Company?: ICompany
}

export interface IEntranceUnits {
  id?: string
  driverId?: string // driver -> driverId
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
  TrailerLoad?: Array<ITrialerLoad>
}

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
  File?: Array<IFile>
}
export interface IQuestion {
  id?: string
  created_at?: Date | null
  updated_at?: Date | null
  name: string
  type: string | null
  status: boolean | null
  organizationId: string
  Organization?: IOrganization
  Response?: Array<IResponse>
  TrailerType?: Array<ITrailerType>
  VehicleType?: Array<IVehicleType>
}

export interface ITrailer {
  id?: string
  created_at?: Date
  updated_at?: Date
  number: string
  seal?: string
  plate?: string
  vin?: string
  trailerTypeId: string | null
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
  TrailerLoad?: Array<ITrialerLoad>
  locationId?: string
  Location?: ILocation
}

export interface ITrialerLoad {
  id?: string
  trailerId?: string
  Trialer?: ITrailer
  entranceId?: string
  cargo?: string
  EntranceUnit?: IEntranceUnits
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
  lastname?: string
  pictureId?: string // picture -> pictureId
  organizationId: string
  Picture?: IFile
  Organization?: IOrganization
  Role?: IRole
  token?: string | null
  status?: boolean
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
  locationId?: string
  Location?: ILocation
}

export interface IVehicleVisitor {
  id?: string
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
  Incident?: Array<IIncident>
}
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

export interface IVisitor {
  id?: string
  created_at?: Date
  updated_at?: Date
  subject: string
  badge?: string
  companyId?: string
  visitorTypeId: string
  organizationId: string
  personId?: string
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
}

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
  userId?: string
}

export interface IVisitorType {
  id?: string
  created_at?: Date
  updated_at?: Date
  name: string
  description?: string
  organizationId: string
  Visitor?: Array<IVisitor>
  status: boolean
  Organization?: IOrganization
}

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
}

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
}

export interface IFile {
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

export interface IRole {
  id?: string
  created_at?: Date
  update_at?: Date
  name: string
  User?: Array<IUser>
}

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
  checklistId: string
  questionId: string
  response: string
  identification: string
  organizationId: string
  File?: Array<IFile>
  Checklist?: IChecklist
  Organization?: IOrganization
  Question?: IQuestion
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
