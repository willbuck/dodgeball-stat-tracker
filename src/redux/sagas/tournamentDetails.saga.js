import { takeLatest, put } from "redux-saga/effects";
import axios from 'axios';

//This saga is to get all the games in the specific tournament 
// detailsTournaments = the fetch games from specific tournament
function* fetchTournamentsDetails(){
    console.log('brossski');

    // need to fix the  id part of the router🙃
    const detailsTournaments = yield axios.get('/api/tournamentDetails/1');
    console.log('detailsTournaments:', detailsTournaments.data);

    //Storing the data in a global store
    yield put({
        type:'TOURNAMENT_DETAILS',
        payload: detailsTournaments.data
    })


}

function* tournamentsDetailsSaga(){
    yield takeLatest('GET_TOURNAMENT_DETAILS', fetchTournamentsDetails)
}

export default tournamentsDetailsSaga;