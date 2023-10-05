import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

//this component is for the Leaderboard page
//the leaderboard page is all the statistics
//for a given game
function Leaderboard() {
  const dispatch = useDispatch();
  const leaderboardStore = useSelector((store) => store.leaderboardReducer);
  console.log("THE leaderboard store:", leaderboardStore);
  const teamLeaderboardStore = useSelector((store)  => store.teamLeaderboardReducer);
  console.log('All teams store:', teamLeaderboardStore);
  
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleClick = (newValue) => {
    setSelectedPlayer(newValue);
  };

  //as the page loads
  //it will GET statistics from DB
  useEffect(() => {
    dispatch({
      type: "GET_STATISTICS",
    });
    //This dispatch is to GET all the teams
    //in the tournament
    dispatch({
        type:'GET_ALL_TEAMS'
    })
  }, []);

  return (
    <>
      <h1>BROSIKI</h1>
      {/* Search for a specific player leaderboard to 
         get players stat */}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-2-demo"
          options={leaderboardStore}
          getOptionLabel={(option) => `${option.firstname} ${option.lastname} `}
          onChange={(event, newValue) => {
            handleClick(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search For A Player"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>

      {/* The Search of Teams will go here */}

      {selectedPlayer ? (
        // Display selected players stat details
        <div>
          <h2>Selected Player:</h2>
          <p>
            {" "}
            Name: {selectedPlayer.firstname} {selectedPlayer.lastname}
          </p>
          <p> kill:{selectedPlayer.kills}</p>
          <p> Out: {selectedPlayer.outs}</p>
          <p> Catch: {selectedPlayer.catches}</p>
        </div>
      ) : (
        // Render all stats for each players in that tournament
        //  when no search has happened
        <>
          {/* The list of all the player in that tournament and their stats*/}
          {leaderboardStore.map((player) => {
            return (
              <h2>
                {player.firstname} {player.lastname}
                <div>
                  Kills: {player.kills} Out: {player.outs} catch:{" "}
                  {player.catches}
                </div>
              </h2>
            );
          })}
        </>
      )}
    </>
  );
}

export default Leaderboard;
