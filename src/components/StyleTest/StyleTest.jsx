import React from 'react';
import { Box, Button, Card, Container, Grid, Paper, Stack } from '@mui/material'

export default function StyleTest() {

  return (
      <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  )
}

