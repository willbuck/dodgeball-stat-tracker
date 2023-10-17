import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import findIDMatch from '../../utilities/findIDMatch';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from "@mui/material";

//this component is for the Leaderboard page
//the leaderboard page is all the statistics
//for a given game
function Leaderboard() {
  const params = useParams();

  const dispatch = useDispatch();
  const leaderboardStore = useSelector((store) => store.leaderboardReducer);
  const tournaments = useSelector(store => store.tournamentsReducer);

  const [leaderboard, setLeaderboard] = useState(leaderboardStore);
  const [sortStat, setSortStat] = useState('kills');

  const [currentTournament] = findIDMatch(tournaments, Number(params.id), "id")

  const sortLeaderboard = (stat) => {
    const leaderboardCopy = leaderboardStore.slice();

      leaderboardCopy.sort((a, b) => {

        if (Number(a[stat])> Number(b[stat])) {
          return -1;
        } else if (Number(a[stat]) < Number(b[stat])) {
          return 1;
        }
        return 0
      })
    setLeaderboard(leaderboardCopy);
  }

  // reorder leaderboard whenever the sort stat is updated
  useEffect(() => {
    sortLeaderboard(sortStat);
  }, [sortStat])

  const teamLeaderboardStore = useSelector((store) => store.teamLeaderboardReducer);
 
  const searchTeamLeaderboardStore = useSelector(
    (store) => store.searchTeamLeaderboardReducer
  );

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleClickPlayer = (newValue) => {
    setSelectedPlayer(newValue);
  };

  //as the page loads
  //it will GET statistics from DB
  useEffect(() => {
    dispatch({ type: "GET_ALL_TEAMS"}, [dispatch]);
    
    // check if selectedTeam is not Null
    // Run the effect whenever selectedTeam changes
    if (selectedTeam) {
      dispatch({
        type: "SEARCH_TEAM_STAT",
        payload: selectedTeam,
      });
    }
  }, [selectedTeam]);

  return (
    <Box>
      <h1>Leaderboard</h1>
      <h1>Maple Grove Invitational</h1>
          {/* The list of all the player in that tournament and their stats*/}
          <TableContainer >
            <Table>
            <TableHead>
              <TableRow >
                <TableCell >Player</TableCell>
                <TableCell>Team</TableCell>
                <TableCell onClick={() => setSortStat('kills')}>Kills</TableCell>
                <TableCell onClick={() => setSortStat('catches')}>Catches</TableCell>
                <TableCell onClick={() => setSortStat('outs')}>Outs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {leaderboard.map((player) => {
            return (
              <TableRow>
                <TableCell>{player.firstname} {player.lastname}</TableCell>
                <TableCell>{player.team_name}</TableCell>
                <TableCell>{player.kills}</TableCell>
                <TableCell>{player.catches}</TableCell>
                <TableCell>{player.outs}</TableCell>
              </TableRow>  
            );
          })}
          </TableBody>
          </Table>
          </TableContainer>
        </Box>
      )}

export default Leaderboard;
