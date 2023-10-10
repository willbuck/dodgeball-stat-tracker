import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Card, Typography, Grid, Container, Badge } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { IconShirtFilled } from '@tabler/icons-react';

export default function ManageTeams() {

  const dispatch = useDispatch()
  const allTeams = useSelector((store) => store.teamsReducer)

  //! Should this function be async?
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TEAM", payload: id });
    dispatch({ type: 'FETCH_TEAMS' })
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {allTeams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>

            <Card sx={{ padding: '20px', margin: '10px', border: '1px solid grey' }}>
              <Badge badgeContent="" sx={{ color: team.jersey_color }}>
                <IconShirtFilled />
              </Badge>
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

