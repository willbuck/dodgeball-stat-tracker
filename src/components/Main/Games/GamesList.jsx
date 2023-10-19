// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Custom components
import SearchGames from "./SearchGames";

// Style components
import {
  Box,
  Button,
  Divider,
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

// List of all games in a given tournament
export default function GamesList() {
  // Hook variables
  const dispatch = useDispatch();
  const history = useHistory();

  // Global state
  const allGames = useSelector((store) => store.gamesReducer);
  const allTournaments = useSelector(store => store.tournamentsReducer);

  // Get tournament id from route params & format as number
  const { id, tournamentID = Number(id) } = useParams();

  // Get selected tournament object
  let selectedTournament;
  for (let tournament of allTournaments) {
    if (tournament.id === tournamentID) {
      selectedTournament = tournament;
    }
  }

  // Creating array for games in current tournament
  const tournamentGames = [];
  // loop through games & push tournament games to array
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

  const handleClickLeaderboard = () => {
    dispatch({
      type: "GET_STATISTICS",
      payload: tournamentID,
    });
    history.push(`/leaderboard/${tournamentID}`);
  };

  return (<>
    {/* Conditional to prevent app crash on reload */}
    {selectedTournament &&

      <Container>
        {/* SEARCHBAR */}
        <SearchGames games={tournamentGames} />

        {/* LEADERBOARD BUTTON */}
        <Stack sx={{ padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px",
              padding: "10px",
            }}
          >
            <Button variant='contained' fullWidth onClick={handleClickLeaderboard}>Leaderboard</Button>
          </Box>
          <Typography variant="h5">{selectedTournament.tournament_name}
          </Typography>
        </Stack>

        {/* GAME LIST */}
        {/* refactor goal: move to separate component */}
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
    }

  </>);
}