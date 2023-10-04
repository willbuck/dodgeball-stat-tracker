import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Container, TextField, Typography, Stack, Button } from '@mui/material'

export default function CreateTeams() {
  const dispatch = useDispatch();
  
  const [ teamName, setTeamName ] = useState('Unnamed Team')

  const handleSubmit = (event) => {
    event.preventDefault()
    const teamData = { teamName }

    dispatch({type: 'CREATE_TEAM', payload: teamData})
  }

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

        <Button
          type="submit"
          variant="contained"
        >Submit</Button>
      </Stack>
    </Container>
  );
}