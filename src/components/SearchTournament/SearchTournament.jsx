import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';

export default function SearchTournament() {

  const tournaments = useSelector((store) => store.tournamentReducer);
  const [selectedTournament, setSelectedTournament] = useState();
  const dispatch = useDispatch();

  function handleClear(){
    console.log("kjdfgshbf")
    dispatch({ type: "UNSET_SELECTED_TOURNAMENT" });
  }

  useEffect(() => {
    dispatch({ type: "FETCH_TOURNAMENTS" });
  }, []);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete sx={{ width: 300 }}
        id="free-solo-2-demo"
        //disableClearable 
        options={tournaments.map((option) => option.tournament_name)}
        onChange={(event, newValue) => {
          setSelectedTournament(newValue)
          console.log('new value and selected tournament values', newValue, selectedTournament);
          dispatch({ type: 'SET_SELECTED_TOURNAMENT', payload: newValue });
          console.log('selectedTournament', selectedTournament);
        }}
        renderInput={(params) => (
          <TextField onClick={handleClear} sx={{ width: 300 }}
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