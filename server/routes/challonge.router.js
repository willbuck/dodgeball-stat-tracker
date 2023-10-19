const express = require("express");
const router = express.Router();
const axios = require("axios");

// Router handles all the requests made to the Challonge API
// * Note: Challonge refers to teams as participants

// Get specific tournament from Challonge
router.get("/tournament", (req, res) => {
  const apiKey = process.env.CHALLONGE_API_KEY;

  //! The tournamentURL string should be taken from
  const tournamentURL = "lztss79e";
  const endpointURL = `https://api.challonge.com/v1/tournaments/${tournamentURL}.json`;

  const fetchTournament = async () => {
    try {
      let response = await axios.get(endpointURL, {
        params: {
          api_key: apiKey,
          include_participants: true,
          include_matches: true,
        },
      });
      const tournamentData = response.data;
      res.send(tournamentData);
    } catch (error) {
      res.sendStatus(500);
    }
  };
  fetchTournament();
});

// Create a new tournament
router.post("/tournament", (req, res) => {
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

      res.send(newTournamentData);
    } catch (error) {
      res.sendStatus(500);
    }
  };
  createTournament();
});

// Get participant list for a tournament
router.get("/tournament/participants", (req, res) => {
  const apiKey = process.env.CHALLONGE_API_KEY;

  const tournamentURL = "wrkfqk65";
  const endpointURL = `https://api.challonge.com/v1/tournaments/${tournamentURL}/participants.json`;

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(endpointURL, {
        params: {
          api_key: apiKey,
        },
      });
      console.log("fetchParticipants response:", response.data);
      res.send(response.data);
    } catch (error) {
      res.sendStatus(500)
    }
  };
  fetchParticipants();
});

// Add participant to tournament
router.post("/tournament/participants", (req, res) => {
  const apiKey = process.env.CHALLONGE_API_KEY;
  const { participants, newTournamentURL } = req.body;

  const participantsToSend = participants.map((participant) => {
    return {
      name: participant.team_name,
      misc: participant.jersey_color,
    };
  });

  const endpointURL = `https://api.challonge.com/v1/tournaments/${newTournamentURL}/participants/bulk_add.json`;

  const createParticipant = async () => {
    try {
      let response = await axios.post(endpointURL, {
        api_key: apiKey,
        participants: participantsToSend,
      });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  };
  createParticipant();
});

// Get individual match
router.get("/match", (req, res) => {
  const apiKey = process.env.CHALLONGE_API_KEY;
  const testTournamentID = `wrkfqk65`;
  const endpointURL = `https://api.challonge.com/v1/tournaments/${testTournamentID}/matches.json`;

  const getMatches = async () => {
    try {
      const response = await axios.get(endpointURL, {
        params: {
          api_key: apiKey,
        },
      });
      res.send(response.data);
    } catch (error) {
    }
  };
  getMatches();
});

module.exports = router;
