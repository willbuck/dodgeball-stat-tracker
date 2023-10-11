import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import tournamentSaga from './tournaments.saga';
import teamsSaga from './teams.saga'
import playersSaga from './players.saga';
import gamesSaga from './games.saga';
import addPlayerSaga from './addPlayer.saga';


import fetchLeaderboardSaga from './leaderboard.saga';
import teamLeaderboardSaga from './teamLeaderboard.sagas';
import searchTeamLeaderboardSaga from './searchTeamLeaderboard.saga';
import updatePlayerSaga from './updatePlayeer.saga';




// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    tournamentSaga(),
    gamesSaga(),
    fetchLeaderboardSaga(),
    teamLeaderboardSaga(),
    searchTeamLeaderboardSaga(),
    
    teamsSaga(),
    playersSaga(),
    addPlayerSaga(),
    updatePlayerSaga(),
  ]);
}
