import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory } from 'react-router-dom';

// This component is for the Tournament details page
//  It talks to the database to get all the games
// in a specific tournment
function TournamentDetails() {
  const dispatch = useDispatch();

  // Testing Challonge games get
  axios.get('/api/challonge/tournament/participants')
  .then( response => {
    console.log('response from Challonge:', response);
  })
  .catch( error => {
    console.log('error:', error)
  })


  const tournamentDetail = useSelector(
    (store) => store.tournamentDetailsReducer
  );
  const history = useHistory();

  const handleGame = (id) => {
    console.log('GAvin:', id)
    dispatch({
      type: 'FETCH_TEAMS',
      payload: id
    })
    history.push(`/gameview/${id}`)
  }

  const [selectedGame, setSelectedGame] = useState(null);
  console.log("the game selcected is:", selectedGame);

  // This functions handles the selected game
  const handleClick = (newValue) => {
    console.log("In here clicked:", newValue);
    setSelectedGame(newValue);
  };


  console.log("The storreee:", tournamentDetail);

  return (
    <>
      {/* Search for a specific game */}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-2-demo"
          options = {tournamentDetail}
          getOptionLabel = { (option) =>
            `${option.team1_name} VS ${option.team2_name} ${option.game_id}`
          }
          onChange = {(event, newValue) => {
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
            <div key={index} onClick={() => { handleGame(details.game_id) }}>
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
