const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log("in GET")
    console.log(req.isAuthenticated())
    console.log(req.user)
    console.log(req.body)

    let querytext = `
    SELECT
    players.id AS player_id,
    players.firstname AS firstname,
    players.lastname AS lastname,
    players.jersey_number,
    team.team_name,
    team.id AS team_id,
    game.team1_id,
    game.team2_id,
    game.team1_score,
    game.team2_score,
    game.court,
    game.id,
    user_id,
    COUNT(statistics.stat) FILTER (WHERE statistics.stat = 'kill') AS "kills",
    COUNT(statistics.stat) FILTER (WHERE statistics.stat = 'catch') AS "catches",
    COUNT(statistics.stat) FILTER (WHERE statistics.stat = 'out') AS "outs"
  FROM
    game
  JOIN
    team ON game.team1_id = team.id OR game.team2_id = team.id
  JOIN
    players ON team.id = players.team_id
  LEFT JOIN
    statistics ON game.id = statistics.game_id AND players.id = statistics.player_id
  WHERE
    game.id = $1
  GROUP BY
     players.jersey_number,
    team.team_name,
    team.id,
    game.team1_id,
    game.team2_id,
    game.team1_score,
    game.team2_score,
    game.court,
    firstname,
    lastname,
    players.id,
    game.id,
    user_id;
    `

    const queryParams = [req.params.id];

    pool.query(querytext, queryParams)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            res.sendStatus(500)
        });
}
);

module.exports = router;