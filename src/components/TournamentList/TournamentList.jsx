import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function TournamentList() {

  const history = useHistory();
  const tournaments = useSelector((store) => store.tournamentReducer);

  const handleClick = (id) => {
    history.push(`/tournamentDetails/${id}`)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box className="scroll-container"

        sx={{
          width: 255,
          height: 500,
          overflowY: "auto",
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Grid container sx={{ minWidth: 200, display: 'flex', justifyContent: 'center' }}
          xs={12}
          columnGap={6}
          rowGap={2}>
          {tournaments.map((tournament) => {
            return (
              <Card
                onClick={() => { handleClick(tournament.id) }}
                key={tournament.id}
                sx={{ minWidth: 200, maxWidth: 250, display: 'flex', justifyContent: 'center' }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {tournament.date}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {tournament.tournament_name} - Location: {tournament.location}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Grid>
      </Box>
    </Box>
  );
}

// <CardActions>
//               <Button size='small'>Learn More</Button>
//             </CardActions>