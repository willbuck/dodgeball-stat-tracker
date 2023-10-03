const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("in tournament GET", req.body)

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
  console.log('in tournament POST', req.body);

  const { 
    name, 
    organizer, 
    location, 
    startDate, 
    ballType, 
    courts, 
    description, 
    url } = req.body
    
    const queryValues = [name, organizer, location, ballType, description, startDate, courts, url]

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
  .then( response => {
    console.log('pool query success')
    res.sendStatus(200)
  })
  .catch( error => {
    console.log('error in create tournament pool query', error)
    res.sendStatus(500)
  })
  
  
})

module.exports = router;