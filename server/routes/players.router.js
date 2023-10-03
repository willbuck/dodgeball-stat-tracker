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
    team.team_name AS team_name,
    game.team1_score AS team1_score,
    game.team2_score AS team2_score,
    game.team1_id AS team1_id,
    game.team2_id AS team2_id,
    players.firstname AS firstname,
    players.lastname AS lastname,
    players.jersey_number AS jersey_number,
    game.court AS court,
    players.id AS player_id
    FROM game
    JOIN players
    ON game.team1_id = players.team_id OR game.team2_id = players.team_id
    JOIN team
    ON players.team_id = team.id
    WHERE game.id = $1;
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