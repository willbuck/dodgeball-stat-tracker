import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPlayers() {
    try {
        const players = yield axios.get(`api/players`);

        yield put({
            type: 'SET_PLAYERS',
            payload: players.data
        });

    } catch (error) {
        console.log('get all error', error);
    }
}

function* playersSaga() {
    yield takeLatest('FETCH_PLAYERS', fetchPlayers);
}

export default playersSaga;