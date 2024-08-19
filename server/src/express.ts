// import https from 'https'
// import fs from 'fs'
// import path from 'path'
// import { createServer } from 'http'
// import express from 'express'
// import morgan from 'morgan'
// import cors from 'cors'
// import selfsigned from 'selfsigned'
// import { env } from './env'
// import type { Server as HttpServer } from 'http'

// // Ruta para guardar los certificados
// const certPath = path.resolve(__dirname, '../cert.pem')
// const keyPath = path.resolve(__dirname, '../key.pem')

// const certExists = fs.existsSync(certPath)
// const keyExists = fs.existsSync(keyPath)

// let options = {}

// if (certExists && keyExists) {
//   options = {
//     key: fs.readFileSync(keyPath),
//     cert: fs.readFileSync(certPath),
//   }
// } else {
//   const attrs = [{ name: 'commonName', value: env.HOST, shortName: 'MX' }] // Especificar el tipo de atributo
//   const pems = selfsigned.generate(attrs, { days: 365 })
//   fs.writeFileSync(certPath, pems.cert)
//   fs.writeFileSync(keyPath, pems.private)
//   options = {
//     key: pems.private,
//     cert: pems.cert,
//   }
// }

// export const expressServer = () => {
//   const app = express()
//   app.use(express.json())
//   app.use(express.urlencoded({ extended: true }))
//   // app.use(express.static('public'))
//   app.use(cors())
//   app.use(morgan('dev'))

//   // Rutas
//   app.use('/role', roleRoutes)
//   app.use('/auth', authRoutes)
//   app.use('/user', userRoutes)
//   app.use('/vehicle-types', vehicleTypeRoutes)
//   app.use('/trailer-types', trailerTypesRoutes)
//   app.use('/entrance-units', entraceRoutes)
//   app.use('/question', questionRoutes)
//   app.use('/driver', driverRoutes)
//   app.use('/incident', incidentRoutes)
//   app.use('/exit-units', exitUnitsRoutes)
//   app.use('/image-uploader', imageUploaderRoutes)
//   app.use('/visitor', visitorRoutes)
//   app.use('/vehicle', vehicleRoutes)
//   app.use('/trailer', trailerRoutes)
//   app.use('/visitor-type', visitorTypeRoutes)
//   app.use('/vehicle-visitor', vehicleVisitorRoutes)
//   app.use('/visitor-entrance', visitorEntranceRoutes)
//   app.use('/visitor-exit', visitorExitRoutes)
//   app.use('/locations', locationRoutes)
//   app.use('/company', companyRoutes)
//   app.use('/response', responseRoutes)
//   app.use('/qrVisitor', qrVisitorRoutes)
//   app.use('/network', networkRoutes)
//   app.use('/testing', testtingRoutes)
//   app.use('/Organization', organizationRoutes)
//   app.use('/image', imageRoutes)

//   const server = https.createServer(options, app)

//   server.listen(env.PORT, env.HOST, () => {
//     console.info('🚀 Express server running on:', `https://${env.HOST}:${env.PORT}`)
//   })
// }

import { createServer } from 'http'
import { type Server as HttpServer } from 'http'
import morgan from 'morgan'
import cors from 'cors'
import express, { type Application, type NextFunction, type Request, type Response } from 'express'
import imageRoutes from './http/routes/image'
import organizationRoutes from './http/routes/Organization'
import testtingRoutes from './http/routes/testing'
import networkRoutes from './http/routes/network'
import qrVisitorRoutes from './http/routes/qrVisitor'
import responseRoutes from './http/routes/response'
import companyRoutes from './http/routes/company'
import locationRoutes from './http/routes/locations'
import visitorExitRoutes from './http/routes/visitor-exit'
import visitorEntranceRoutes from './http/routes/visitor-entrance'
import vehicleVisitorRoutes from './http/routes/vehicle-visitor'
import visitorTypeRoutes from './http/routes/visitor-type'
import trailerRoutes from './http/routes/trailers'
import vehicleRoutes from './http/routes/vehicle'
import visitorRoutes from './http/routes/visitor'
import imageUploaderRoutes from './http/routes/image-uploader'
import exitUnitsRoutes from './http/routes/exitUnits'
import incidentRoutes from './http/routes/incident'
import driverRoutes from './http/routes/driver'
import questionRoutes from './http/routes/questions'
import entraceRoutes from './http/routes/entraceUnits'
import trailerTypesRoutes from './http/routes/trailer-type'
import vehicleTypeRoutes from './http/routes/vehicle-types'
import userRoutes from './http/routes/user'
import authRoutes from './http/routes/auth'
import roleRoutes from './http/routes/role'
import { env } from './env'

export const expressServer = () => {
  const app: Application = express()
  const server: HttpServer = createServer(app)

  // Middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(cors())

  // Routes
  app.use('/role', roleRoutes)
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/vehicle-types', vehicleTypeRoutes)
  app.use('/trailer-types', trailerTypesRoutes)
  app.use('/entrance-units', entraceRoutes)
  app.use('/question', questionRoutes)
  app.use('/driver', driverRoutes)
  app.use('/incident', incidentRoutes)
  app.use('/exit-units', exitUnitsRoutes)
  app.use('/image-uploader', imageUploaderRoutes)
  app.use('/visitor', visitorRoutes)
  app.use('/vehicle', vehicleRoutes)
  app.use('/trailer', trailerRoutes)
  app.use('/visitor-type', visitorTypeRoutes)
  app.use('/vehicle-visitor', vehicleVisitorRoutes)
  app.use('/visitor-entrance', visitorEntranceRoutes)
  app.use('/visitor-exit', visitorExitRoutes)
  app.use('/locations', locationRoutes)
  app.use('/company', companyRoutes)
  app.use('/response', responseRoutes)
  app.use('/qrVisitor', qrVisitorRoutes)
  app.use('/network', networkRoutes)
  app.use('/testing', testtingRoutes)
  app.use('/Organization', organizationRoutes)
  app.use('/image', imageRoutes)

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  // Registegic Server Index Route
  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ data: 'Welcome to Registegic(Server) powered by Industrial Code' })
  })
  // Start Registegic Server
  server.listen(env.PORT, async() => {
    console.log(`🚀 Server is Listening on: ${env.HOST}:${env.PORT}`)
  })
}
