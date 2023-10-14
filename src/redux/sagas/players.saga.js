import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPlayers(action) {
    try {
        const players = yield axios.get(`api/players`);
        const stats = yield axios.get('api/stats');
        const user = action.payload;

        yield console.log('players:', players);
        yield console.log('stats:', stats);
        yield console.log('user:', user);
        
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