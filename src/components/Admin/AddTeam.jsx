import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Container, TextField, Typography, Stack, Button } from '@mui/material'

export default function AddTeam() {
  const dispatch = useDispatch();

  const [teamName, setTeamName] = useState('Unnamed Team')
  const [teamColor, setTeamColor] = useState('Unnamed Color')


  const handleSubmit = (event) => {
    event.preventDefault()

    // TODO: add jersey color
    const teamData = { teamName, teamColor }
    console.log("adding team", teamData)
    dispatch({ type: 'ADD_TEAM', payload: teamData })
  }

  // mapping a list of teams in the DB
  // create a teams store - fetch all teams from DB
  // useEffect fetch all teams from teams
  // create menu map teams array
  // send selected teams and bundle up a participants array

  return (
    <Container component='form' onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h4">{teamName}</Typography>

        <TextField
          required
          label="Team Name"
          placeholder="Team Name"
          onChange={(event) => setTeamName(event.target.value)}
        ></TextField>

<TextField
          label="Team Color"
          placeholder="Team Color"
          onChange={(event) => setTeamColor(event.target.value)}
        ></TextField>

        <Button
          type="submit"
          variant="contained"
        >Submit</Button>
      </Stack>
    </Container>
  );
}