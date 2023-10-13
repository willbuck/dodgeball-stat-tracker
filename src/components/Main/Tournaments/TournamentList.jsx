import * as React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SearchTournament from './SearchTournament';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'

export default function TournamentList() {
  const history = useHistory()
  const tournaments = useSelector((store) => store.tournamentsReducer);

  const handleClick = (id) => {
    console.log(id)
    history.push(`/games/${id}`)
  }

    return (
      <Container>
        <SearchTournament />
      <Grid container spacing={3}>
        {tournaments.map((tournament) => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>
            <Card 
              sx={{ padding: '20px', margin: '10px' }}
              onClick={() => handleClick(tournament.id)}>
              <CardContent>
                <Typography variant="h5">
                  {tournament.tournament_name}
                </Typography>
                <Typography variant='body1'>
                  {tournament.location}
                </Typography>
                {/* Render the dates, if available */}
                <Typography variant='body2'>
                  {tournament.tournament_start_date ? tournament.tournament_start_date : 'Dates : TBD'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    );
  }