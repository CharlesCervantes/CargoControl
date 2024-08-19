// server/routes.js

const express = require('express')
const { getTrailers } = require('./controllers/trailerController')
const { getChecklists } = require('./controllers/checklistController') // Añadir esta línea
const router = express.Router()

router.get('/trailers', getTrailers)
router.get('/checklists', getChecklists) // Añadir esta línea

module.exports = router
