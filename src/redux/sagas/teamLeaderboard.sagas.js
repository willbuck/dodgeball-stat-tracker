import { takeLatest, put} from "redux-saga/effects";
import axios from 'axios'

function* teamLeaderboard(){
    // This variable will store the results 
    // from the axios GET, 
    // all teams from a given tournament 

    // I am hard coding the id, need to fix that 😅
    const allTeams = yield axios.get('/api/allTeams/1');

    //Storing the data in a store
    yield put({
        type:'ALL_TEAMS',
        payload: allTeams.data
    })
}

function* teamLeaderboardSaga(){
    yield takeLatest('GET_ALL_TEAMS', teamLeaderboard);
}

export default teamLeaderboardSaga;