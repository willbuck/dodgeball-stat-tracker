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
            const tournamentData = response.data;
            res.send(tournamentData)
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
    fetchTournament();
});

//! Get index of tournaments

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
                game_name: "dodgeball",
                description: req.body.description,
                tournament_type: "single elimination", // alternative is "round robin"
                signup_cap: null, // max teams
                start_at: null,
            });
            
            // Tournament URL so we can add newly created tournament to our database
            const newTournamentData = response.data.tournament;

            res.send(newTournamentData)
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
router.get('/tournament/participants', (req, res) => {
    const apiKey = process.env.CHALLONGE_API_KEY;

    const tournamentURL = 'wrkfqk65';
    const endpointURL = `https://api.challonge.com/v1/tournaments/${tournamentURL}/participants.json`;

    const fetchParticipants = async () => {
        try {
            const response = await axios.get(endpointURL, {
                params: {
                    api_key: apiKey
                }
            })
            console.log('fetchParticipants response:', response.data)
            res.send(response.data)
        } catch (error) {
            console.log('error in fetchParticipants:', error)
        }
    }
    fetchParticipants()

})

// Add participant to tournament
router.post('/tournament/participants', (req, res) => {

    const apiKey = process.env.CHALLONGE_API_KEY;
    const {participants, newTournamentID} = req.body;
    console.log('in challonge add participants:', participants, newTournamentID);

    const participantsToSend = participants.map( participant => {
        return {
            "name": participant.teamName, 
            "misc": participant.teamID
    }
    });
    console.log('participantsToSend:', participantsToSend)

    const endpointURL = `https://api.challonge.com/v1/tournaments/${newTournamentID}/participants/bulk_add.json`;
    
    const createParticipant = async () => {
        try {
            let response = await axios.post(endpointURL, {
                api_key: apiKey,
                participants: participantsToSend,
            });
            console.log('response from Challonge:', response.data);
            res.sendStatus(200);
        } catch (error) {
            console.error('error in challonge participants post:', error)
            res.sendStatus(500)
        }
    }
    createParticipant();
});

// Update participant

// Delete participant

//! Get match list for tournament

//! Get individual match
router.get('/match', (req, res) => {
    const apiKey = process.env.CHALLONGE_API_KEY;

    const testTournamentID = `wrkfqk65`

    const endpointURL = `https://api.challonge.com/v1/tournaments/${testTournamentID}/matches.json`

    const getMatches = async () => {
        try {
            const response = await axios.get(endpointURL, {
                params: {
                    api_key: apiKey
                }
            })
            console.log('getMatches response:', response.data)
            res.send(response.data)
        } catch (error) {
            console.log('error in getMatches:', error)
        }
    }
    getMatches()
})

// Update match

module.exports = router;