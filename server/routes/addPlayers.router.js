const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const jerseyNumber = req.body.jerseyNumber;
  const teamId = req.body.selectedTeamId;
  const phoneNumber = req.body.phoneNumber;
  const canReferee = req.body.canReferee;
  const isCaptain = req.body.isCaptain;

  const queryText = `
    INSERT INTO players (firstname, lastname, 
    jersey_number, team_id, phone_number, 
    can_referee, captain)
    VALUES($1, $2, $3, $4, $5, $6, $7);
    `

  const queryParams = [
    firstName,
    lastName,
    jerseyNumber,
    teamId,
    phoneNumber,
    canReferee,
    isCaptain,
  ];

  pool
    .query(queryText, queryParams)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
