import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SearchGames() {
  const history = useHistory()
  
  const games = useSelector((store) => store.gamesReducer);

  return (
    <Autocomplete
      options={games}
      getOptionLabel={(option) =>
        `${option.team1_name} VS ${option.team2_name}`
      }
      onChange={(event, game) => history.push(`/games/${tournament.id}`)}
      renderInput={(params) => <TextField {...params} label="Tournaments" />}
    ></Autocomplete>
  );
}