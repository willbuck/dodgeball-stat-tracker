const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// --All the teams in a given tournament
router.get('/:id', (req,res) => {
    const tournamentId = req.params.id
    console.log('params:', req.params)
    
    const queryText = `SELECT * FROM participants
    WHERE tournament_url = $1;`

    const queryParams = [tournamentId]

    pool.query(queryText, queryParams)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error:', error)
            res.sendStatus(500);
            
        })
})

module.exports = router;
