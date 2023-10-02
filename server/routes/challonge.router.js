const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Get tournament
router.get('/', (req, res) => {
    const apiKey = 'qV7jr0n7GMbAB3kmSZt243vWb01Ak8rdHlfAVRdL';
    const tournamentURL = '9bugadqo'
    const endpointURL = `https://api.challonge.com/v1/tournaments/${tournamentURL}.json`;

    const fetchData = async () => {
        try {
            let response = await axios.get(endpointURL, { params: { api_key: apiKey } });
            console.log('response:', response.data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
});

// Create tournament
router.post('/', (req, res) => {
    
    const apiKey = process.env.CHALLONGE_API_KEY;
    // Tournament object
    const tournament = req.body;
    
    axios.post('https://api.challonge.com/v1/tournaments.json', tournament)
    .then( response => {
        console.log('response:', response)
    })
    .catch( error => {
        console.log('error in CREATE_TOURNAMENT', error)
    })
});

module.exports = router;
