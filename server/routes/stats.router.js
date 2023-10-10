const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `
    SELECT 
        "statistics"."id" AS "id",
        "game_id",
        "player_id",
        "kills",
        "outs",
        "catches",
        "is_official",
        "user_id",
        "uuid",
        "players"."team_id" AS "team_id"
    FROM 
        "statistics"
        JOIN "players"
            ON "statistics"."player_id" = "players"."id"
    ;
    `

    pool.query(queryText)
    .then( response => {
        res.send(response.rows);
    })
    .catch( error => {
        console.log('error in stats router GET:', error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    const statSession = req.body;
    
})

module.exports = router