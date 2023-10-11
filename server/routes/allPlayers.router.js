const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET - ALL players in DB
router.get('/', (req, res) => {

  let queryText = `SELECT * FROM "players" ORDER BY "lastname" ASC;`
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      res.sendStatus(500)
    });
});

module.exports = router;