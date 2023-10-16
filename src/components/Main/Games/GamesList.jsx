import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

import SearchGames from '../Games/SearchGames'

// This component is for the Tournament details page
// It talks to the database to get all the games
// in a specific tournment

function TournamentDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Getting tournament ID from
  // react-router url params and
  // changing data type back to number
  const { id, tournamentID = Number(id) } = useParams();

  // Getting games from store
  const allGames = useSelector((store) => store.gamesReducer);

  // Creating array for games in current tournament
  const tournamentGames = [];
  for (let game of allGames) {
    if (game.tournament_id === tournamentID) {
      tournamentGames.push(game);
    }
  }

  // Handler function for selected game
  const handleGameClick = (game) => {
    // using location object to add state to next page in history
    const location = {
      pathname: `/gameview/${game.game_id}`,
      state: game,
    };

    // Navigating to next page using location object
    history.push(location);
  };

  const [selectedGame, setSelectedGame] = useState(null);

  // This functions handles the selected game
  const handleSearchbarClick = (newValue) => {
    setSelectedGame(newValue);
  };

  const handleClickLeaderboard = () => {
    console.log("In here", tournamentID);
    dispatch({
      type: "GET_STATISTICS",
      payload: tournamentID,
    });
    history.push(`/leaderboard/${tournamentID}`);
  };

  return (
    <Container>
      <Box sx={{margin: '10px'}}>
        <SearchGames />
      </Box>
      <Stack spacing={1}>
        {tournamentGames.map((details, index) => (
          <Card
            key={index}
            onClick={() => {
              handleGameClick(details);
            }}
          >
            {/* Team 1 */}
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">{details.team1_name}</Typography>
              <Divider />
              <Typography variant="h6">{details.team1_score}</Typography>
            </CardContent>

            <Divider />
            {/* Team 2 */}
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">{details.team2_name}</Typography>
              <Typography variant="h6">{details.team2_score}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
export default TournamentDetails;
