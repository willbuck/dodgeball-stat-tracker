const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET - ALL players in DB
router.get('/', (req, res) => {
  console.log("Getting all players", req.body)

  let queryText = `SELECT * FROM "players" ORDER BY "lastname" ASC;`
  pool.query(queryText)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((error) => {
      res.sendStatus(500)
    });
});

// POST - Adding new team to DB
router.post('/', (req, res) => {
  console.log(`adding new player to DB...`)

  const {
    player
  } = req.body

  const queryValues = [ placeholder ]

  const queryText = `
  INSERT INTO "players" (
    "lastname",
    "firstname",
    whatever else
  )
  VALUES ($ whatever)
  `;

  pool.query(queryText, queryValues)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`Cannot add player to DB`, error);
      res.sendStatus(500);
    });
});

module.exports = router;