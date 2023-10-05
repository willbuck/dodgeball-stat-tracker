const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  console.log("Getting all teams", req.body)

  let queryText = `SELECT * FROM "team"`
  pool.query(queryText)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((error) => {
      res.sendStatus(500)
    });
});

router.post('/', (req, res) => {
  console.log(`adding new team to DB...`)
  console.log(`new team: ${req.body.teamName}`)

  const {
    teamName
  } = req.body

  const queryValues = [ teamName ]

  const queryText = `
  INSERT INTO "team" (
    "team_name"
  )
  VALUES ($1)
  `;

  pool.query(queryText, queryValues)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`Cannot add team to DB`, error);
      res.sendStatus(500);
    });
});

module.exports = router