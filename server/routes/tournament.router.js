const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("in GET")
    console.log(req.isAuthenticated())
   console.log(req.user)
    console.log(req.body)
  
    let querytext = `SELECT * FROM "tournament"`
    pool.query(querytext)
    .then((response) => {
      res.send(response.rows)
    })
    .catch ((error) => {
      res.sendStatus(500)
    });
  } 
  );

module.exports = router;