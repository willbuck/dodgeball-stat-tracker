import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getPlayers() {
    try {
        const players = yield axios.get('/api/allPlayers');
        yield put({
            type: 'SET_PLAYERS',
            payload: players.data
        });
    } catch (error) {
        console.log('get all error', error);
    }
}

function* managePlayersSaga() {
    yield takeLatest('GET_PLAYER', getPlayers);
}
export default managePlayersSaga;