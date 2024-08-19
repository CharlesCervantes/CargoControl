// server/controllers/trailerController.js

const db = require('../db')

const getTrailers = async(req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Trailer"')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = { getTrailers }
