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

function* updateGames(action) {
    console.log('payload:', action.payload);

    try {

        // Post updated game score
        yield axios.put('api/games', action.payload)

        // Fetch games from database?
        // We're already rendering and persisting the update using client-side logic, so not sure what this would really be for

    } catch (error) {

    }
}
    

function* gamesSaga(){
    yield takeLatest('FETCH_GAMES', fetchGames);
    yield takeLatest('UPDATE_GAMES', updateGames);
}

export default gamesSaga;