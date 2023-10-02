import { useEffect, useState} from "react";
import  {useDispatch, useSelector} from "react-redux";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

// This component is for the Tournament details page
//  It talks to the database to get all the games 
// in a sppeific tournment 
function TournamentDetails() {

    const dispatch  = useDispatch();
    const tournamentDetail = useSelector((store) => store.tournamentDetailsReducer);
    const [selectedGame, setSelectedGame] = useState([]);
    console.log('the game selcected is:', selectedGame);

    const handleClick = (newValue) => {
      console.log('In here clicked:', newValue)
    }

    useEffect(()  => {
        dispatch({type:'GET_TOURNAMENT_DETAILS'})
    }, []);

    console.log('The storreee:', tournamentDetail);

    // Search for a specific 
  return (
    <>
      <h1>BROOOOO</h1>
      <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
  id="free-solo-2-demo"
  disableClearable
  options={tournamentDetail.map((option) => {
    return (
        `${option.team1_name} VS ${option.team2_name} ${option.game_id}`
      )}
  )}
  onChange={(event, newValue) => {
    handleClick(newValue)
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search For A Game"
      InputProps={{
        ...params.InputProps,
        type: 'search',
      }}
    />
  )}
/>
    </Stack>

      {/* the list of all the games in that tournament */}
      <>{tournamentDetail.map((details, index) => {
        return(
            <>
            <h2> 
                Game {index + 1}: {details.team1_name} VS {details.team2_name}
                Time {details.start_time} - {details.end_time}
            </h2>
            </>
        )
      })}</>
    </>
  );
}
export default TournamentDetails;
