const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

  let queryText = `SELECT * FROM "tournament"`
  pool.query(queryText)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((error) => {
      res.sendStatus(500)
    });
});

router.post('/', (req, res) => {
  const {
    name,
    organizer,
    location,
    startDate,
    ballType,
    courts,
    description,
    url } = req.body
    
    const queryValues = [name, organizer, location, "foam", description, startDate, courts, url]

  const queryText = `
      INSERT INTO "tournament" (
        "tournament_name", 
        "tournament_organizer",
        "location",
        "ball_type",
        "description",
        "start_date",
        "courts",
        "url"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `

  pool.query(queryText, queryValues)
    .then(response => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.sendStatus(500)
    })
})

router.post('/participants', (req, res) => {

  // Creating queryValues by 
  const queryValues = []
  req.body.map(index => {
    queryValues.push(index.teamID);
    queryValues.push(index.tournamentURL);
  })

  const createPlaceholders = (array) => {
    const rowsNeeded = array.length / 2;

    let stringToReturn = ``

    // Looping over queryValues to add ($1, $2), etc.
    for (let i = 0; i < rowsNeeded; i++) {
      stringToReturn = stringToReturn + `($${1 + (i * 2)}, $${2 + (i * 2)}),`
    }
    // Removing last comma
    stringToReturn = stringToReturn.slice(0, -1);
    return stringToReturn;
  }
  const placeholders = createPlaceholders(queryValues)

  const queryText = `
    INSERT INTO "participants" (
      "team_id",
      "tournament_url"
    )
    VALUES ${placeholders}
    ;
  `

  pool.query(queryText, queryValues)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
    })
})


// tournament update on database
router.put('/', (req, res) => {
  const {
    name,
    organizer,
    location,
    startDate,
    ballType,
    courts,
    description,
    id } = req.body

  const queryValues = [name, organizer, location, ballType, description, startDate, courts, id]

  const queryText = `
      UPDATE "tournament" 
      SET
        "tournament_name" = $1, 
        "tournament_organizer" = $2,
        "location" = $3,
        "ball_type" = $4,
        "description" = $5,
        "start_date" = $6,
        "courts" = $7
      WHERE "id" = $8;
  `

  pool.query(queryText, queryValues)
    .then(response => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.sendStatus(500)
    })
})

module.exports = router;