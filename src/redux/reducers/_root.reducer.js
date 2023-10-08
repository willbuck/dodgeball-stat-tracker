import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import tournamentsReducer from './tournaments.reducer';
import gamesReducer from './games.reducer';
import selectedTournamentReducer from './selectedtournament.reducer';
import playersReducer from './players.reducer';
import teamsReducer from './teams.reducer'

const rootReducer = combineReducers({
  errors,
  user,
  tournamentsReducer,
  gamesReducer,
  selectedTournamentReducer,
  playersReducer,
  teamsReducer,
});

export default rootReducer;
