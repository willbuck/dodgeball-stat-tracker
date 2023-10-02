const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Get tournament
router.get('/tournament', (req, res) => {
    const apiKey = 'qV7jr0n7GMbAB3kmSZt243vWb01Ak8rdHlfAVRdL';
    const tournamentURL = '9bugadqo'
    const endpointURL = `https://api.challonge.com/v1/tournaments/${tournamentURL}.json`;

    const fetchData = async () => {
        try {
            let response = await axios.get(endpointURL, { 
                params: { 
                    api_key: apiKey 
                } 
            });
            console.log('response:', response.data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
});

// Create tournament
router.post('/tournament', (req, res) => {
    
    const apiKey = process.env.CHALLONGE_API_KEY;
    const endpointURL = `https://api.challonge.com/v1/tournaments.json`;
    
    const name = "test_tournament"
    const createTournament = async () => {
        try {
            let response = await axios.post(endpointURL, { 
                
                    api_key: apiKey,
                    name: name
                
            });
            console.log('response:', response);
            res.sendStatus(200)
        } catch (error) {
            console.error('error in tournament post:', error)
            res.sendStatus(500)
        }
    }

    createTournament();
    
    
});

module.exports = router;
