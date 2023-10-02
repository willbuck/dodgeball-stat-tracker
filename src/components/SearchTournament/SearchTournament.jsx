import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';

export default function SearchTournament() {

    const tournaments = useSelector((store) => store.tournamentReducer);
    const [selectedTournament, setSelectedTournament] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_TOURNAMENTS" });
      }, [dispatch]);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete sx={{ width: 300 }}
  id="free-solo-2-demo"
  disableClearable
  options={tournaments.map((option) => option.tournament_name)}
  onChange={(event, newValue) => {
    setSelectedTournament(newValue);
  }}
  renderInput={(params) => (
    <TextField sx={{ width: 300 }}
      {...params}
      label="Search For A Tournament"
      InputProps={{
        ...params.InputProps,
        type: 'search',
      }}
    />
  )}
/>

    </Stack>
    
  );
}