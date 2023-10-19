const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log("login:", req.isAuthenticated())
    if (req.isAuthenticated()) {
        pool.query(`INSERT INTO statistics (stat, is_official, game_id, player_id, user_id)
        VALUES ('kill', true, $1, $2, $3);`, [req.body.id, req.body.player_id, req.body.user_id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500)
        })
    }
    else {
        res.sendStatus(403)
    }
});

module.exports = router;