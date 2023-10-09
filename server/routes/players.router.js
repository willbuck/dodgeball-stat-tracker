const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

  let querytext = `
    SELECT
      players.id AS player_id,
      players.firstname,
      players.lastname,
      players.jersey_number,
      players.phone_number,
      players.can_referee,
      players.captain,
      team.id AS team_id,
      tournament.id AS tournament_id,
      tournament.url,
      participants.tournament_url AS participants_tourn_url
    FROM
      players
      JOIN team
        ON players.team_id = team.id
      FULL JOIN participants
        ON team.id = participants.team_id
      LEFT JOIN tournament
        ON participants.tournament_url = tournament.url
    ;
    `

  pool.query(querytext)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((error) => {
      res.sendStatus(500)
    });
}
);

module.exports = router;