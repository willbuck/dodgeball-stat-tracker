const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET - ALL teams in DB
router.get('/', (req, res) => {

  let queryText = `SELECT * FROM "team" ORDER BY "id" ASC`
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
  const {
    teamName
  } = req.body

  const {
    teamColor
  } = req.body

  const queryValues = [ teamName, teamColor ]

  const queryText = `
  INSERT INTO "team" (
    "team_name",
    "jersey_color"
  )
  VALUES ($1, $2)
  `;

  pool.query(queryText, queryValues)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  console.log(`Connected to server, deleting Team ID: ${(req.params.id)}`)
  const teamID = req.params.id
  const queryText = `
  DELETE FROM "team" WHERE id=$1;
  `
  pool.query(queryText, [ teamID ])
  .then(() => res.sendStatus(201))
  .catch((error) => {
    res.sendStatus(500);
  });  
})

module.exports = router