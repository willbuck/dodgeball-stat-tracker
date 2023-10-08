import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import tournamentSaga from './tournaments.saga';
import teamsSaga from './teams.saga'
import playersSaga from './players.saga';
import gamesSaga from './games.saga';


export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    tournamentSaga(),
    gamesSaga(),
    teamsSaga(),
    playersSaga(),
  ]);
}
