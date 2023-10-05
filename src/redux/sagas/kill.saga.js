import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* createKill(action) {
    console.log("Kill: ", action.payload)
    try {
        console.log("game id?", action.payload.id)
        const newKill = yield axios.post(`/api/kill/`, action.payload);
        //console.log('get all:', newKill.data);

        //yield put({ type: 'FETCH_PLAYERS'});
    } catch (error) {
        console.log('Kill error', error);
    }
}

function* KillSaga() {  
    yield takeLatest('POST_KILL', createKill)
}

export default KillSaga;