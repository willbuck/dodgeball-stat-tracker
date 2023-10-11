import { takeLatest, put} from "redux-saga/effects";
import axios from 'axios';

function* updatePlayer(action){
    console.log('HEYYYYY ASIYAAA:', action.payload);
    yield axios.put('/api/updatePlayer', action.payload);
    yield put({
        type:'FETCH_PLAYERS'
    });
}

function* updatePlayerSaga(){
    yield takeLatest('UPDATE_PLAYER', updatePlayer)
}

export default updatePlayerSaga;