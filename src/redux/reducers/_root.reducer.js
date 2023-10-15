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

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors,
  user,
  tournamentsReducer,
  gamesReducer,
  selectedTournamentReducer,

  leaderboardReducer,
  teamLeaderboardReducer,
  searchTeamLeaderboardReducer,
  playersReducer,
  teamsReducer,
  manageUsersReducer,
  teamModal,
 

});

export default rootReducer;
