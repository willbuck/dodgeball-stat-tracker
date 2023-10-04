import React, { useState } from 'react'
import { Container, TextField, Typography, Stack, Grid } from '@mui/material'

export default function CreateTeams() {

  const [ teamName, setTeamName ] = useState('')

  return (
    <Container>
    <Stack spacing={2}>
    <Typography variant='h4'>{teamName}</Typography>
    <TextField label="Team Name"></TextField>
    <Typography variant='h5'>Add Player</Typography>
    <Grid container>
      <TextField label="First Name"></TextField>
      <TextField label="Last Name"></TextField>
    </Grid>
    </Stack>
    
    </Container>
  )
}