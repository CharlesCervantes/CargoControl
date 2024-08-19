// server/controllers/checklistController.js

const db = require('../db')

const getChecklists = async(req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Checklist"')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = { getChecklists }
