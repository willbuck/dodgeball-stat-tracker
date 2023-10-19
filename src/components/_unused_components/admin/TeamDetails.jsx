import { useState } from 'react'
import { Stack, TextField, Typography } from '@mui/material'

export default function TeamDetails() {

  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ jerseyNumber, setJerseyNumber ] = useState('')

return (
  <Stack spacing={2}>
    <Typography variant="h5">Add Player</Typography>
    
    <TextField
      required
      label="First Name"
      placeholder="First Name"
      onChange={(event) => setFirstName(event.target.value)}
    ></TextField>

    <TextField
      required
      label="Last Name"
      placeholder="Last Name"
      onChange={(event) => setLastName(event.target.value)}
    ></TextField>

    {/* TODO: setup 2 character limit, number only  */}
    <TextField
      required
      label="Jersey Number"
      placeholder="00"
      onChange={(event) => setJerseyNumber(event.target.value)}
    ></TextField>
  </Stack>
);

}