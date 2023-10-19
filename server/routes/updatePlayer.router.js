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
    const teamId = req.body.team_id;
    
    const queryText  = `
    UPDATE players 
    SET 
        firstname = $1,
        lastname = $2,
        jersey_number = $3,
        phone_number = $4,
        can_referee = $5,
        captain = $6,
        team_id = $7
    WHERE id = $8;`;

    const queryParams = [firstName, lastName, jerseyNumber,
    phoneNumber,canReferee,isCaptain,teamId,id];

    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;