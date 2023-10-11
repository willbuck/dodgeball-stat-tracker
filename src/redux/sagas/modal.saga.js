import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* modalTeam() {
    try {
        const players = yield axios.get(`api/players`);

        yield put({
            type: 'SET_MODAL',
            payload: players.data
        });

    } catch (error) {
        console.log('get all error', error);
    }
}

function* modalSaga() {
    yield takeLatest('FETCH_MTEAM', modalTeam);
}

export default modalSaga;