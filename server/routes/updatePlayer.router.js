const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/', (req,res) => {

    const id = req.body.playerId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const jerseyNumber =  req.body.jerseyNumber;
    const phoneNumber = req.body.phoneNumber;
    const canReferee = req.body.canReferee;
    const isCaptain = req.body.isCaptain;
    
    const queryText  = `
    UPDATE players 
    SET 
        firstname = $1,
        lastname = $2,
        jersey_number = $3,
        phone_number = $4,
        can_referee = $5,
        captain = $6
    WHERE id = $7;`;

    const queryParams = [firstName, lastName, jerseyNumber,
    phoneNumber,canReferee,isCaptain,id];

    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error with the PUT /api/updatePlayers', error);
        })
})

module.exports = router;