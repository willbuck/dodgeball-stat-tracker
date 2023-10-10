import { takeLatest, put } from "redux-saga/effects";
import axios from 'axios';

//This saga is to get all the games in the specific tournament 
// detailsTournaments = the fetch games from specific tournament
function* fetchGames(action){
    const gamesResponse = yield axios.get(`/api/games/${action.payload}`);

    // Storing the data in a global store
    yield put({
        type:'SET_GAMES',
        payload: gamesResponse.data
    })
}

function* gamesSaga(){
    yield takeLatest('FETCH_GAMES', fetchGames)
}

export default gamesSaga;