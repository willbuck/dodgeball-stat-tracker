const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req,res) => {
    console.log('heyyyy')
    console.log('Params:', req.params.id)

    const queryText = `-- to get all the games inside a specific tournament 
    SELECT * FROM game
    WHERE tournament_id = $1;`

    const queryParams = [req.params.id];

    pool.query(queryText, queryParams)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            res.sendStatus(500);
        })
})



module.exports = router;