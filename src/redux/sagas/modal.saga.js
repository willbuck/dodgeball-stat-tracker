import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* modalTeam(action) {
    try {
        const tournament = yield axios.get(`/api/admin/modal/${action.payload}`);
        console.log("payload to be sent", tournament.data)
        yield put({
            type: 'SET_MODAL',
            payload: tournament.data
        });

    } catch (error) {
        console.log('get all error', error);
    }
}

function* modalSaga() {
    yield takeLatest('FETCH_MTEAM', modalTeam);
}

export default modalSaga;