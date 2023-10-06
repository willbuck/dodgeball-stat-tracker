import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, useLocation, useParams } from 'react-router-dom';

// This component is for the Tournament details page
// It talks to the database to get all the games
// in a specific tournment

function TournamentDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Getting tournament ID from 
  // react-router url params and  
  // changing data type back to number
  const {id, tournamentID = Number(id)} = useParams();

  // Updating store with all players in database
  //! This dispatch should be renamed to 'FETCH_PLAYERS'
  useEffect(() => {
    dispatch({
      type: 'FETCH_TEAMS'
    })
  }, [])

  // Getting games from store
  const allGames = useSelector((store) => store.tournamentDetailsReducer);

  // Creating array for games in current tournament
  const tournamentGames = [];
  for (let game of allGames) {
    if(game.tournament_id === tournamentID) {
      tournamentGames.push(game);
    }
  }
  
  // Handler function for selected game
  const handleGameClick = (game) => {

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
  const handleSearchbarClick = (newValue) => {
    setSelectedGame(newValue);
  };

  return (
    <>
      {/* Search for a specific game */}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-2-demo"
          options={allGames}
          getOptionLabel={(option) =>
            `${option.team1_name} VS ${option.team2_name} ${option.game_id}`
          }
          onChange={(event, newValue) => {
            handleSearchbarClick(newValue);
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
          {tournamentGames.map((details, index) => (
            <div key={index} onClick={() => { handleGameClick(details) }}>
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
