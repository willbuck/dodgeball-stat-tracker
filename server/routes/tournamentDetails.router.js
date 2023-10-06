const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {

    const queryText = `
    SELECT
        game.id AS game_id,
        game.team1_id AS team1_id,
        t1.team_name AS team1_name,
        t1.jersey_color AS team1_jersey_color,
        game.team2_id AS team2_id,
        t2.team_name AS team2_name,
        t2.jersey_color AS team2_jersey_color,
        game.start_time,
        game.end_time,
        game.date,
        game.court,
        game.team1_score,
        game.team2_score,
        game.game_status,
        game.ball_type,
        game.tournament_id
    FROM
        game 
    JOIN
        team t1 ON game.team1_id = t1.id
    JOIN
        team t2 ON game.team2_id = t2.id
    WHERE
        game.tournament_id = $1;
    `

    const queryParams = [req.params.id];

    pool.query(queryText, queryParams)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error with the GET_TournamentDetails', error);
        })
})

module.exports = router;