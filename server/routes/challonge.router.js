const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Get tournament
router.get('/tournament', (req, res) => {
    const apiKey = process.env.CHALLONGE_API_KEY;

    //! The tournamentURL string should be taken from 
    const tournamentURL = 'lztss79e'
    const endpointURL = `https://api.challonge.com/v1/tournaments/${tournamentURL}.json`;

    const fetchTournament = async () => {
        try {
            let response = await axios.get(endpointURL, {
                params: {
                    api_key: apiKey,
                    include_participants: true,
                    include_matches: true
                }
            });
            console.log('response:', response.data);
            const tournamentData = response.data;
            res.send(tournamentData)
        } catch (error) {
            console.error(error);
        }
    }
    fetchTournament();
});

// Get index of tournaments

// Create tournament
router.post('/tournament', (req, res) => {
    const apiKey = process.env.CHALLONGE_API_KEY;
    const endpointURL = `https://api.challonge.com/v1/tournaments.json`;



    // Function to make API request
    const createTournament = async () => {
        try {
            let response = await axios.post(endpointURL, {
                api_key: apiKey,
                name: req.body.name,
                game_name: "Dodgeball",
                description: req.body.description,
                tournament_type: "single elimination", // alternative is "round robin"
                signup_cap: null, // max teams
                start_at: null,
            });
            
            // Tournament ID so we can add newly created tournament to our database
            const tournamentURL = response.data.tournament.name;

            res.sendStatus(200)
        } catch (error) {
            console.error('error in tournament post:', error)
            res.sendStatus(500)
        }
    }
    createTournament();
});

// Start tournament
//& not sure if "start_at" will automatically start the tournament

// Finalize tournament
//& Any utility to this?

// Randomize tournament seeds

// Update tournament

// Delete tournament

// Get participant list for a tournament

// Add participant to tournament
router.post('/tournament/participant', (req, res) => {

    const apiKey = process.env.CHALLONGE_API_KEY;
    const tournamentID = 'lztss79e';

    const endpointURL = `https://api.challonge.com/v1/tournaments/${tournamentID}/participants.json`;

    const name = "test_participant"
    const createParticipant = async () => {
        try {
            let response = await axios.post(endpointURL, {
                api_key: apiKey,
                name: name,
                challonge_username: null,
                email: null,
            });
            console.log('response:', response.data.participant);
            res.sendStatus(200)
        } catch (error) {
            console.error('error in tournament post:', error)
            res.sendStatus(500)
        }
    }
    createParticipant();
});

// Update participant

// Delete participant

// Get match list for tournament

// Get individual match

// Update match

module.exports = router;