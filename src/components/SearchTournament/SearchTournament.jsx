import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchTournament() {

    const tournaments = useSelector((store) => store.tournamentReducer);
    const [selectedTournament, setSelectedTournament] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_TOURNAMENTS" });
      }, [dispatch]);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      <Autocomplete
  freeSolo
  id="free-solo-2-demo"
  disableClearable
  options={top100Films.map((option) => option.title)}
  onChange={(event, newValue) => {
    setSelectedTournament(newValue);
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search input"
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