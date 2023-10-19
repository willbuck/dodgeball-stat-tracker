// Hooks
import { useHistory } from "react-router-dom";

// Style components
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SearchGames(props) {
  const { games } = props
  const history = useHistory()

  return (
    <Autocomplete
      options={games}
      getOptionLabel={(option) =>
        `${option.team1_name} VS ${option.team2_name}`
      }
      onChange={(event, game) => history.push(`/games/${game.id}`)}
      renderInput={(params) => <TextField {...params} label="Games" />}
    />
  );
}