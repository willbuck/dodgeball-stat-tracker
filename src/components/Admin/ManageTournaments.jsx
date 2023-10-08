import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Card, Typography, Grid, Container, Stack } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

export default function ManageTournaments() {

  const dispatch = useDispatch()
  const allTeams = useSelector((store) => store.tournamentsReducer)

  //! Should this be async?
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TOURNAMENT", payload: id });
    dispatch({ type: "FETCH_TOURNAMENTS" })
  }

  // This is the basic framework - need to check all the variables 
  return (
    <Container>
      <Grid container spacing={3}>
        {allTeams.map((tournament) => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>

            {/*  */}
            <Card sx={{ padding: '20px', margin: '10px', border: '1px solid grey' }}>
              <Box display="flex" justifyContent="space-between">
                <Stack>
                  <Typography variant="h5">
                    {/* tournament name here */}
                    {tournament.tournament_name}
                  </Typography>
                  <Typography variant='h6'>
                    {tournament.location}
                  </Typography>
                </Stack>

                <Button
                  onClick={() => handleDelete(tournament.id)}
                  color="secondary">
                  <IconTrash size={24} />
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

