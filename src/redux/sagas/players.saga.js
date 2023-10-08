import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllPlayers(action) {
  try {
    console.log(`Getting all players currently in DB.`)
    const players = yield axios.get(`/api/players/`)
    yield put({
      type: 'SET_ALL_PLAYERS',
      payload: players.data
    })
  } catch (error) {
    console.log(`Cannot connect to server, ${error}`)
  }
}


function* fetchPlayers(action) {
    try {
        const players = yield axios.get(`/api/gameview`);

        yield put({
            type: 'SET_PLAYERS',
            payload: players.data
        });

    } catch (error) {
        console.log('get all error', error);
    }
}

function* playersSaga() {
  // players?
    yield takeEvery('FETCH_TEAMS', fetchPlayers);
    yield takeLatest('FETCH_ALL_PLAYERS', fetchAllPlayers)
}

export default playersSaga;