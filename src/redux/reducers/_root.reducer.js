import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import tournamentsReducer from './tournaments.reducer';
import gamesReducer from './games.reducer';
import selectedTournamentReducer from './selectedtournament.reducer';
import leaderboardReducer from './leaderboard.reducer';
import teamLeaderboardReducer from './teamLeaderboard.reducer';
import searchTeamLeaderboardReducer from './searchTeamLeaderboard.reducer';
import playersReducer from './players.reducer';
import teamsReducer from './teams.reducer'
import manageUsersReducer from './manageUsers.reducer';
import stats from './stats.reducer';
import teamModal from './teamsModal.reducer'

const rootReducer = combineReducers({
  errors,
  user,
  tournamentsReducer,
  gamesReducer,
  selectedTournamentReducer,
  stats,
  leaderboardReducer,
  teamLeaderboardReducer,
  searchTeamLeaderboardReducer,
  playersReducer,
  teamsReducer,
  manageUsersReducer,
  teamModal,
});

export default rootReducer;
