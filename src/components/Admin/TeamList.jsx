import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Card, Typography, Grid, Container } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

export default function TeamList() {

  const dispatch = useDispatch()
  const allTeams = useSelector((store) => store.teamsReducer)

  useEffect(() => {
    dispatch({ type: "FETCH_TEAM_LIST" });
  }, []);

    const handleDelete = (id) => {
      dispatch({ type: "DELETE_TEAM", payload: id });
    }
  
  

  return (
    <Container>
      <Grid container spacing={3}>
        {allTeams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            {/* Can add a badge that matches jersey color */}
            {/*  */}
            <Card sx={{ padding: '20px', margin: '10px', border: '1px solid grey' }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  {team.team_name}
                </Typography>
                <Button 
                  onClick={() => handleDelete(team.id)}
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

