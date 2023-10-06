import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, useLocation } from 'react-router-dom';

// This component is for the Tournament details page
//  It talks to the database to get all the games
// in a specific tournment
function TournamentDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Updating store with all players in database
  //! This dispatch should be renamed to 'FETCH_PLAYERS'
  useEffect(() => {
    dispatch({
      type: 'FETCH_TEAMS'
    })
  }, [])

  const tournamentDetail = useSelector((store) => store.tournamentDetailsReducer);
  const players = useSelector((store) => store.playersReducer);

  // Helper function to set team rosters before navigating to GameDetail component
    // This could probably live here or in GameDetail component, not sure which makes more sense
  const setRosters = (game) => {
    const teamsObject = {
      team1: {
        id: game.team1_id,
        name: game.team1_name,
        color: game.team1_jersey_color,
        players: []
      },

      team2: {
        id: game.team2_id,
        name: game.team2_name,
        color: game.team2_jersey_color,
        players: []
      },
    }

    // Looping over players to find players in this game
    for (let player of players) {
      if (player.team_id === game.team1_id) {
        player.kills = 0;
        player.outs = 0;
        player.catches = 0;
        teamsObject.team1.players.push(player);
      } else if (player.team_id === game.team2_id) {
        player.kills = 0;
        player.outs = 0;
        player.catches = 0;
        teamsObject.team2.players.push(player);
      }
    }
    return teamsObject
  }

  // Handler function for selected game
  const handleGame = (game) => {
    game.teams = setRosters(game);
    console.log('game object after adding teams:', game)

    // using location object to add state to next page in history
    const location = {
      pathname: `/gameview/${game.game_id}`,
      state: game
    }

    // Navigating to next page using location object
    history.push(location)
  }

  const [selectedGame, setSelectedGame] = useState(null);

  // This functions handles the selected game
  const handleClick = (newValue) => {
    setSelectedGame(newValue);
  };

  return (
    <>
      {/* Search for a specific game */}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-2-demo"
          options={tournamentDetail}
          getOptionLabel={(option) =>
            `${option.team1_name} VS ${option.team2_name} ${option.game_id}`
          }
          onChange={(event, newValue) => {
            handleClick(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search For A Game"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>

      {/* If a game was selected I want the selected
      game to show more details */}

      {selectedGame ? (
        // Display selected game details
        <div>
          <h2>Selected Game:</h2>
          <p>Team 1: {selectedGame.team1_name}</p>
          <p>Team 2: {selectedGame.team2_name}</p>
          <p>Game ID: {selectedGame.game_id}</p>
          <p>Start Time: {selectedGame.start_time}</p>
          <p>End Time: {selectedGame.end_time}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        // Render tournament details when selectedGame is empty
        <>
          {/* The list of all the games in that tournament */}
          {tournamentDetail.map((details, index) => (
            <div key={index} onClick={() => { handleGame(details) }}>
              <h2>
                Game {index + 1}: {details.team1_name} VS {details.team2_name}
                Time {details.start_time} - {details.end_time}
              </h2>
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default TournamentDetails;
