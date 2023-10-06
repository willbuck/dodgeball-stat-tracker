import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


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
    //! dispatch name should probably be FETCH_PLAYERS
    yield takeEvery('FETCH_TEAMS', fetchPlayers);
}

export default playersSaga;