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
import Divider from '@mui/material/Divider';


export default function TournamentList() {
  const history = useHistory()
  const tournaments = useSelector((store) => store.tournamentsReducer);

  const handleClick = (id) => {
    console.log(id)
    history.push(`/games/${id}`)
  }

  const upcomingTournaments = tournaments.filter(tournament => !tournament.tournament_start_date || new Date(tournament.tournament_start_date) > new Date());
  const pastTournaments = tournaments.filter(tournament => tournament.tournament_start_date && new Date(tournament.tournament_start_date) <= new Date());


  return (
    <Container sx={{ marginBottom: 15 }}>
      <SearchTournament />

      {/* Upcoming Tournaments */}
      <Divider sx={{ marginTop: 8 }} />
      <Typography variant="h5" sx={{ marginLeft: 2 }}>
        Upcoming Tournaments
      </Typography>

      <Grid container spacing={3}>

        {/* Conditionally Render None if none upcoming */}
        {
          upcomingTournaments.length === 0 ? (
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ marginLeft: 2 }}>
                None
              </Typography>
            </Grid>


          ) : (upcomingTournaments.map((tournament) => (
            <Grid item xs={12} sm={6} md={4} key={tournament.id}>
              <Card
                sx={{
                  padding: '20px',
                  margin: '10px',
                  border: '1px solid grey',
                }}
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
          )))}
      </Grid>

      {/* Past Tournaments */}
      <Divider sx={{ marginTop: 8 }} />
      <Typography variant="h5" sx={{ marginLeft: 2 }}>
        Past Tournaments
      </Typography>

      <Grid container spacing={3}>
        {/* Conditionally Render None if none past */}
        {
          pastTournaments.length === 0 ? (
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ marginLeft: 2 }}>
                None
              </Typography>
            </Grid>
          ) : (
            pastTournaments.map((tournament) => (
              <Grid item xs={12} sm={6} md={4} key={tournament.id}>
                <Card
                  sx={{
                    padding: '20px',
                    margin: '10px',
                    border: '1px solid grey',
                  }}
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
            )))}
      </Grid>
    </Container>
  );
}