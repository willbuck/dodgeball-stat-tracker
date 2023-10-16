import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchTournament from "./SearchTournament";
import nationals from './nationals.jpeg'

// MUI
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia'
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function TournamentList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tournaments = useSelector((store) => store.tournamentsReducer);
  const upcomingTournament = useSelector((store) => store.tournamentsReducer[0]);

  const handleClick = (id) => {
    console.log(id);
    history.push(`/games/${id}`);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_TOURNAMENTS" });
  }, []);

  return (
    <Container sx={{marginBottom: '15px'}}>
      <Stack sx={{marginBottom: '15px'}}>
        <Typography variant="h4">Upcoming</Typography>
      </Stack>
      <Card
        sx={{
          margin: "5px",
        }}
      >
        <CardMedia
        component="img"
        image={nationals}
        >
        </CardMedia>
        <CardContent>
          {upcomingTournament && (
            <>
              <Typography variant="h5">
                {upcomingTournament.tournament_name}
              </Typography>
              <Typography variant='h6'>{upcomingTournament.location}</Typography>
              <Typography variant="body1">September 1-4</Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleClick(upcomingTournament.id)}
          >
            Details
          </Button>
        </CardActions>
      </Card>
      <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
      <SearchTournament />
      <Grid container spacing={0}>
        {tournaments.map((tournament) => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>
            <Card
              sx={{
                padding: "2px",
                margin: "5px",
              }}
              onClick={() => handleClick(tournament.id)}
            >
              <CardContent>
                <Typography variant="body1">
                  {tournament.tournament_name}{" "}
                </Typography>
                <Typography variant="body2">{tournament.location}</Typography>

                <Typography variant="body2"></Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
