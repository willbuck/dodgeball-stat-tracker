const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.delete('/', (req,res) => {
    const playerId = req.body.id;
    console.log('HEY:', playerId);

    const queryText = `DELETE FROM players
    WHERE id = $1;`;

    const queryParams = [playerId];

    pool.query(queryText,queryParams)
        .then((result)  => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('ERROR with the DELETE api/deletePlayerForm', error);
        })
});

module.exports = router;