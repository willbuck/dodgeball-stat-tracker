import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SearchTournament() {
  const history = useHistory()
  
  const tournaments = useSelector((store) => store.tournamentsReducer);

  return (
    <Autocomplete
      options={tournaments}
      getOptionLabel={(option) => option.tournament_name}
      onChange={(event, tournament) => history.push(`/games/${tournament.id}`)}
      renderInput={(params) => <TextField {...params} label="Past Tournaments" />}
    ></Autocomplete>
  );
}
