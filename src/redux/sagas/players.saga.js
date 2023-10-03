import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* fetchPlayers(action) {
    try {
        console.log("in GET players")
        console.log("get players action payload", action.payload)
        const players = yield axios.get(`/api/gameview/${action.payload}`);
        console.log('get all:', players.data);

        yield put({
            type: 'SET_PLAYERS',
            payload: players.data
        });

    } catch (error) {
        console.log('get all error', error);
    }

}

function* playersSaga() {
    yield takeEvery('FETCH_TEAMS', fetchPlayers);
}

export default playersSaga;