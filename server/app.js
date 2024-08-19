// server/app.js

const express = require('express')
const app = express()
const routes = require('./routes')

// Usa el archivo de rutas
app.use('/api', routes)

// Otros middlewares y configuración del servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})
